import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServicesModule } from './services/services.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectsModule } from './projects/projects.module';
import { IndustriesModule } from './industries/industries.module';
import { InquiriesModule } from './inquiries/inquiries.module';
import { LeadsModule } from './leads/leads.module';

import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

import { CompanyModule } from './company/company.module';
import { InsightsModule } from './insights/insights.module';
import { FaqsModule } from './faqs/faqs.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    PrismaModule,
    AuthModule,
    AdminModule,
    ServicesModule,
    ProjectsModule,
    IndustriesModule,
    InquiriesModule,
    LeadsModule,
    CompanyModule,
    InsightsModule,
    FaqsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
