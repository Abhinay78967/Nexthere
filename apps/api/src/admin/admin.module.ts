import { Module } from '@nestjs/common';
import { AdminLeadsController } from './admin-leads.controller';
import { AdminServicesController } from './admin-services.controller';
import { AdminIndustriesController } from './admin-industries.controller';
import { AdminProjectsController } from './admin-projects.controller';
import { AdminInsightsController } from './admin-insights.controller';
import { AdminFaqsController } from './admin-faqs.controller';
import { AdminCompanyController } from './admin-company.controller';

@Module({
  controllers: [
    AdminLeadsController, 
    AdminServicesController,
    AdminIndustriesController,
    AdminProjectsController,
    AdminInsightsController,
    AdminFaqsController,
    AdminCompanyController
  ],
})
export class AdminModule {}
