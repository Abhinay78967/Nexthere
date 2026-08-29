import { Controller, Get, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AdminGuard } from '../auth/admin.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@nexthere/database';

@Controller('v1/admin/industries')
@UseGuards(AdminGuard)
@Roles(Role.ADMIN, Role.SUPER_ADMIN, Role.CONTENT_MANAGER)
export class AdminIndustriesController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async getIndustries() {
    const data = await this.prisma.client.industry.findMany();
    return { success: true, data };
  }
}
