import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateLeadDto } from './dto/create-lead.dto';
import { PrismaService } from '../prisma/prisma.service';
import { randomUUID } from 'crypto';

@Controller('leads')
export class LeadsController {
  constructor(private readonly prisma: PrismaService) {}

  @Post()
  async create(@Body() createLeadDto: CreateLeadDto) {
    if (createLeadDto.honeypot) {
      return { success: true, data: { submissionId: randomUUID() } };
    }

    try {
      const lead = await this.prisma.client.lead.create({
        data: {
          name: createLeadDto.name,
          companyName: createLeadDto.companyName,
          email: createLeadDto.email,
          phone: createLeadDto.phone,
          notes: createLeadDto.requirements,
          source: 'WEBSITE',
          status: 'NEW',
          priority: 'MEDIUM',
        },
      });

      return {
        success: true,
        data: {
          submissionId: lead.id,
        },
      };
    } catch (error) {
      console.error('Failed to create lead:', error);
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
