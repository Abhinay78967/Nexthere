import { Controller, Get, Param } from '@nestjs/common';
import { IndustriesService } from './industries.service';

@Controller('industries')
export class IndustriesController {
  constructor(private readonly industriesService: IndustriesService) {}

  @Get()
  async findAll() {
    const data = await this.industriesService.findAll();
    return {
      success: true,
      data: data.map((d) => ({
        id: d.id,
        title: d.title,
        slug: d.slug,
        shortDescription: d.shortDescription,
        media: d.media,
        seo: d.seo,
      })),
    };
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    const data = await this.industriesService.findOneBySlug(slug);
    return {
      success: true,
      data: {
        id: data.id,
        title: data.title,
        slug: data.slug,
        shortDescription: data.shortDescription,
        description: data.description,
        media: data.media,
        seo: data.seo,
        services: data.services.map((s) => ({
          id: s.id,
          title: s.title,
          slug: s.slug,
        })),
        projects: data.projects.map((p) => ({
          id: p.id,
          title: p.title,
          slug: p.slug,
        })),
        articles: data.articles.map((a) => ({
          id: a.id,
          title: a.title,
          slug: a.slug,
        })),
        faqs: data.faqs.map((f) => ({
          id: f.id,
          question: f.question,
          answer: f.answer,
        })),
      },
    };
  }
}
