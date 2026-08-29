import { Controller, Get, Param } from '@nestjs/common';
import { ServicesService } from './services.service';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  async findAll() {
    const services = await this.servicesService.findAll();
    return {
      success: true,
      data: services.map((s) => ({
        id: s.id,
        title: s.title,
        slug: s.slug,
        description: s.description,
        capabilities: s.capabilities,
        media: s.media,
        category: s.category
          ? {
              title: s.category.title,
              slug: s.category.slug,
              media: (s.category as { media?: unknown }).media,
            }
          : null,
      })),
    };
  }

  @Get('categories')
  async findCategories() {
    const categories = await this.servicesService.findCategories();
    return {
      success: true,
      data: categories.map((c) => ({
        id: c.id,
        title: c.title,
        slug: c.slug,
        description: c.description,
        media: c.media,
        services: c.services.map((s) => ({
          title: s.title,
          slug: s.slug,
        })),
      })),
    };
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    const service = await this.servicesService.findOneBySlug(slug);
    return {
      success: true,
      data: {
        id: service.id,
        title: service.title,
        slug: service.slug,
        description: service.description,
        capabilities: service.capabilities,
        media: service.media,
        category: service.category
          ? {
              title: service.category.title,
              slug: service.category.slug,
              media: (service.category as { media?: unknown }).media,
            }
          : null,
      },
    };
  }
}
