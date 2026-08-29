import { Controller, Get } from '@nestjs/common';
import { FaqsService } from './faqs.service';

@Controller('faqs')
export class FaqsController {
  constructor(private readonly faqsService: FaqsService) {}

  @Get()
  async findAll() {
    const data = await this.faqsService.findAll();
    return {
      success: true,
      data: data.map((d) => ({
        id: d.id,
        question: d.question,
        answer: d.answer,
        category: d.category,
        displayOrder: d.displayOrder,
        service: d.service
          ? { title: d.service.title, slug: d.service.slug }
          : null,
        industry: d.industry
          ? { title: d.industry.title, slug: d.industry.slug }
          : null,
      })),
    };
  }
}
