import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { prisma } from '@nexthere/database';

@Injectable()
export class PrismaService implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit() {
    try {
      await prisma.$connect();
      this.logger.log('Successfully connected to database');
    } catch (err: any) {
      this.logger.warn(`Direct DB connection failed (${err?.message}). Running in resilient mode.`);
    }
  }

  get client() {
    return prisma;
  }
}
