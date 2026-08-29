import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.client.service.findMany({
      where: { active: true },
      include: { category: true },
    });
  }

  async findOneBySlug(slug: string) {
    const service = await this.prisma.client.service.findUnique({
      where: { slug },
      include: { category: true },
    });

    if (!service) {
      throw new NotFoundException({
        success: false,
        error: {
          code: 'SERVICE_NOT_FOUND',
          message: 'The requested service could not be found.',
        },
      });
    }

    return service;
  }

  async findCategories() {
    return this.prisma.client.serviceCategory.findMany({
      include: { services: true },
    });
  }
}
