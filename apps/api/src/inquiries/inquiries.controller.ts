import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  BadRequestException,
} from '@nestjs/common';
import { CreateInquiryDto } from './dto/create-inquiry.dto';
import { PrismaService } from '../prisma/prisma.service';
import { randomUUID } from 'crypto';

@Controller('inquiries')
export class InquiriesController {
  constructor(private readonly prisma: PrismaService) {}

  @Post()
  async create(@Body() createInquiryDto: CreateInquiryDto) {
    // 1. Honeypot check
    if (createInquiryDto.honeypot) {
      // Safely discard suspicious submission but return success to fool bots
      return { success: true, data: { submissionId: randomUUID() } };
    }

    // 2. Validate referenced service if provided
    if (createInquiryDto.serviceId) {
      const service = await this.prisma.client.service.findUnique({
        where: { id: createInquiryDto.serviceId },
      });
      if (!service || !service.active) {
        throw new BadRequestException({
          success: false,
          error: {
            code: 'INVALID_SERVICE',
            message: 'The selected service is not available.',
          },
        });
      }
    }

    // 3. Transaction to create Lead + Inquiry
    try {
      const result = await this.prisma.client.$transaction(async (tx) => {
        // ALWAYS create a new Lead in Phase 1C to avoid deduplication leakage.
        // Merging will happen in future admin dashboard.
        const lead = await tx.lead.create({
          data: {
            name: createInquiryDto.name,
            companyName: createInquiryDto.companyName,
            email: createInquiryDto.email,
            phone: createInquiryDto.phone,
            serviceId: createInquiryDto.serviceId,
            source: 'WEBSITE',
            status: 'NEW',
            priority: 'MEDIUM',
          },
        });

        const inquiry = await tx.inquiry.create({
          data: {
            leadId: lead.id,
            serviceId: createInquiryDto.serviceId,
            subject: createInquiryDto.subject,
            message: createInquiryDto.message,
            location: createInquiryDto.location,
            timeline: createInquiryDto.timeline,
            budgetRange: createInquiryDto.budgetRange,
          },
        });

        return { lead, inquiry };
      });

      // 4. Return minimal safe response
      return {
        success: true,
        data: {
          submissionId: result.inquiry.id,
        },
      };
    } catch (error) {
      // Log internal error but do not expose to client
      console.error('Failed to create inquiry:', error);
      throw new HttpException(
        {
          success: false,
          error: {
            code: 'INTERNAL_ERROR',
            message: 'An error occurred while processing your request.',
          },
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
