import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FaqsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.client.fAQ.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { displayOrder: 'asc' },
      include: { service: true, industry: true },
    });
  }
}
