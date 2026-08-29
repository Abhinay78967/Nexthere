import { Controller, Get, Post, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AdminGuard } from '../auth/admin.guard';
import { Roles } from '../auth/roles.decorator';
import { Role } from '@nexthere/database';
import type { ApplicationUser } from '@nexthere/database';
import { CurrentUser } from '../auth/current-user.decorator';
import { CreateServiceDto } from './dto/create-service.dto';

@Controller('v1/admin/services')
@UseGuards(AdminGuard)
@Roles(Role.ADMIN, Role.SUPER_ADMIN, Role.CONTENT_MANAGER)
export class AdminServicesController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async getServices() {
    const services = await this.prisma.client.service.findMany({
      orderBy: { createdAt: 'desc' },
      include: { category: true },
    });
    return { success: true, data: services };
  }

  @Post()
  async createService(@Body() data: CreateServiceDto, @CurrentUser() user: ApplicationUser) {
    const service = await this.prisma.client.service.create({
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        categoryId: data.categoryId,
        active: false, // Start as draft (inactive)
      },
    });

    await this.prisma.client.auditLog.create({
      data: {
        userId: user.id,
        action: 'CREATE',
        entityType: 'Service',
        entityId: service.id,
      },
    });

    return { success: true, data: service };
  }

  @Patch(':id/publish')
  async publishService(@Param('id') id: string, @CurrentUser() user: ApplicationUser) {
    const service = await this.prisma.client.service.update({
      where: { id },
      data: { active: true },
    });

    await this.prisma.client.auditLog.create({
      data: {
        userId: user.id,
        action: 'PUBLISH',
        entityType: 'Service',
        entityId: service.id,
      },
    });

    return { success: true, data: service };
  }
}
