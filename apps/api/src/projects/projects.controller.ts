import { Controller, Get, Param } from '@nestjs/common';
import { ProjectsService } from './projects.service';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  async findAll() {
    const data = await this.projectsService.findAll();
    return {
      success: true,
      data: data.map((d) => ({
        id: d.id,
        title: d.title,
        slug: d.slug,
        projectStatus: d.projectStatus,
        location: d.location,
        coverMedia: d.coverMedia,
        seo: d.seo,
        industry: d.industry
          ? { title: d.industry.title, slug: d.industry.slug }
          : null,
      })),
    };
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    const d = await this.projectsService.findOneBySlug(slug);
    return {
      success: true,
      data: {
        id: d.id,
        title: d.title,
        slug: d.slug,
        projectStatus: d.projectStatus,
        location: d.location,
        completionDate: d.completionDate,
        challenge: d.challenge,
        solution: d.solution,
        execution: d.execution,
        results: d.results,
        coverMedia: d.coverMedia,
        gallery: d.gallery,
        seo: d.seo,
        industry: d.industry
          ? { title: d.industry.title, slug: d.industry.slug }
          : null,
        services: d.services.map((s) => ({ title: s.title, slug: s.slug })),
      },
    };
  }
}
