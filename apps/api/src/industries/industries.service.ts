import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class IndustriesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.client.industry.findMany({
      where: { status: 'PUBLISHED' },
      include: {
        services: true,
        projects: { where: { status: 'PUBLISHED' } },
        articles: { where: { status: 'PUBLISHED' } },
        faqs: { where: { status: 'PUBLISHED' } },
      },
    });
  }

  async findOneBySlug(slug: string) {
    const industry = await this.prisma.client.industry.findFirst({
      where: { slug, status: 'PUBLISHED' },
      include: {
        services: true,
        projects: { where: { status: 'PUBLISHED' } },
        articles: { where: { status: 'PUBLISHED' } },
        faqs: { where: { status: 'PUBLISHED' } },
      },
    });

    if (!industry) {
      throw new NotFoundException({
        success: false,
        error: { code: 'INDUSTRY_NOT_FOUND', message: 'Industry not found.' },
      });
    }
    return industry;
  }
}
