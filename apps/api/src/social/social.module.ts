import { Module } from '@nestjs/common';
import { SocialController } from './social.controller';
import { SocialWebhookController } from './social-webhook.controller';
import { SocialService } from './services/social.service';
import { AiGeneratorService } from './services/ai-generator.service';
import { SocialPublisherService } from './services/social-publisher.service';
import { SocialSchedulerService } from './services/social-scheduler.service';
import { SocialLeadCaptureService } from './services/social-lead-capture.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SocialController, SocialWebhookController],
  providers: [
    SocialService,
    AiGeneratorService,
    SocialPublisherService,
    SocialSchedulerService,
    SocialLeadCaptureService,
  ],
  exports: [
    SocialService,
    AiGeneratorService,
    SocialPublisherService,
    SocialSchedulerService,
    SocialLeadCaptureService,
  ],
})
export class SocialModule {}

