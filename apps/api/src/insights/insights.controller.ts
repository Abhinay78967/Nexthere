import { Controller, Get, Param } from '@nestjs/common';
import { InsightsService } from './insights.service';

@Controller('insights')
export class InsightsController {
  constructor(private readonly insightsService: InsightsService) {}

  @Get()
  async findAll() {
    const data = await this.insightsService.findAll();
    return {
      success: true,
      data: data.map((d) => ({
        id: d.id,
        title: d.title,
        slug: d.slug,
        excerpt: d.excerpt,
        coverMedia: d.coverMedia,
        author: d.author,
        publishedAt: d.publishedAt,
        tags: d.tags,
        industry: d.industry
          ? { title: d.industry.title, slug: d.industry.slug }
          : null,
      })),
    };
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    const d = await this.insightsService.findOneBySlug(slug);
    return {
      success: true,
      data: {
        id: d.id,
        title: d.title,
        slug: d.slug,
        excerpt: d.excerpt,
        content: d.content,
        coverMedia: d.coverMedia,
        author: d.author,
        publishedAt: d.publishedAt,
        tags: d.tags,
        seo: d.seo,
        industry: d.industry
          ? { title: d.industry.title, slug: d.industry.slug }
          : null,
      },
    };
  }
}
