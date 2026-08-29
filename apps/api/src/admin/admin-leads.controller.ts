import { Controller, Get, Param, Patch, Body, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AdminGuard } from '../auth/admin.guard';
import { Roles } from '../auth/roles.decorator';
import { Role, LeadStatus, LeadPriority } from '@nexthere/database';
import type { ApplicationUser } from '@nexthere/database';
import { CurrentUser } from '../auth/current-user.decorator';

@Controller('v1/admin/leads')
@UseGuards(AdminGuard)
export class AdminLeadsController {
  constructor(private prisma: PrismaService) {}

  @Get()
  @Roles(Role.ADMIN, Role.SUPER_ADMIN, Role.SALES)
  async getLeads() {
    const leads = await this.prisma.client.lead.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        service: true,
      },
    });
    return { success: true, data: leads };
  }

  @Get(':id')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN, Role.SALES)
  async getLead(@Param('id') id: string) {
    const lead = await this.prisma.client.lead.findUnique({
      where: { id },
      include: {
        service: true,
        inquiries: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });
    return { success: true, data: lead };
  }

  @Patch(':id/status')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN, Role.SALES)
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: LeadStatus,
    @CurrentUser() user: ApplicationUser
  ) {
    const lead = await this.prisma.client.lead.update({
      where: { id },
      data: { status },
    });

    await this.prisma.client.auditLog.create({
      data: {
        userId: user.id,
        action: 'LEAD_STATUS_CHANGE',
        entityType: 'Lead',
        entityId: id,
        metadata: { newStatus: status },
      },
    });

    return { success: true, data: lead };
  }

  @Patch(':id/priority')
  @Roles(Role.ADMIN, Role.SUPER_ADMIN, Role.SALES)
  async updatePriority(
    @Param('id') id: string,
    @Body('priority') priority: LeadPriority,
    @CurrentUser() user: ApplicationUser
  ) {
    const lead = await this.prisma.client.lead.update({
      where: { id },
      data: { priority },
    });

    await this.prisma.client.auditLog.create({
      data: {
        userId: user.id,
        action: 'LEAD_PRIORITY_CHANGE',
        entityType: 'Lead',
        entityId: id,
        metadata: { newPriority: priority },
      },
    });

    return { success: true, data: lead };
  }
}
