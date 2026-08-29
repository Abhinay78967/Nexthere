import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.client.project.findMany({
      where: { status: 'PUBLISHED' },
      include: { industry: true, services: true },
    });
  }

  async findOneBySlug(slug: string) {
    const project = await this.prisma.client.project.findFirst({
      where: { slug, status: 'PUBLISHED' },
      include: { industry: true, services: true },
    });
    if (!project) {
      throw new NotFoundException({
        success: false,
        error: { code: 'PROJECT_NOT_FOUND', message: 'Project not found.' },
      });
    }
    return project;
  }
}
