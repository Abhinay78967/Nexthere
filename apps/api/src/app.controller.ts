import { Controller, Get } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';

@Controller()
export class AppController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('health')
  async getHealth() {
    let dbStatus = 'ok';
    try {
      await this.prisma.client.$queryRaw`SELECT 1`;
    } catch {
      dbStatus = 'error';
    }

    return {
      status: dbStatus === 'ok' ? 'ok' : 'degraded',
      service: 'nexthere-api',
      dependencies: {
        database: dbStatus,
      },
    };
  }
}
