import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InsightsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.client.article.findMany({
      where: { status: 'PUBLISHED' },
      include: { industry: true },
    });
  }

  async findOneBySlug(slug: string) {
    const article = await this.prisma.client.article.findFirst({
      where: { slug, status: 'PUBLISHED' },
      include: { industry: true },
    });
    if (!article) {
      throw new NotFoundException({
        success: false,
        error: { code: 'ARTICLE_NOT_FOUND', message: 'Article not found.' },
      });
    }
    return article;
  }
}
