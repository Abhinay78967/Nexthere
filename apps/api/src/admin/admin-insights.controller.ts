import { Controller, Get, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AdminGuard } from '../auth/admin.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@nexthere/database';

@Controller('v1/admin/insights')
@UseGuards(AdminGuard)
@Roles(Role.ADMIN, Role.SUPER_ADMIN, Role.CONTENT_MANAGER)
export class AdminInsightsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async getInsights() {
    const data = await this.prisma.client.article.findMany();
    return { success: true, data };
  }
}
