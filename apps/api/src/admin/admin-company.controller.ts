import { Controller, Get, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AdminGuard } from '../auth/admin.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@nexthere/database';

@Controller('v1/admin/company')
@UseGuards(AdminGuard)
@Roles(Role.ADMIN, Role.SUPER_ADMIN, Role.CONTENT_MANAGER)
export class AdminCompanyController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async getCompany() {
    const data = await this.prisma.client.companyProfile.findMany();
    return { success: true, data };
  }
}
