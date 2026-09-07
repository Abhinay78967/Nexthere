import { Controller, Post, Get, Body, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { SocialLeadCaptureService, InboundSocialEvent } from './services/social-lead-capture.service';
import { SocialPlatform } from '@nexthere/database';

@Controller('social/webhooks')
export class SocialWebhookController {
  constructor(private readonly leadCapture: SocialLeadCaptureService) {}

  /**
   * Webhook verification for Meta Graph API (Instagram & Facebook)
   */
  @Get('verify')
  verifyWebhook(
    @Query('hub.mode') mode: string,
    @Query('hub.challenge') challenge: string,
    @Query('hub.verify_token') token: string
  ) {
    const verifyToken = process.env.META_WEBHOOK_VERIFY_TOKEN || 'nexthere_social_growth_2026';
    if (mode === 'subscribe' && token === verifyToken) {
      return challenge;
    }
    return 'Verification failed';
  }

  /**
   * Ingest inbound comment, DM, or mention event (Meta, LinkedIn, X, or Simulator)
   */
  @Post('inbound')
  @HttpCode(HttpStatus.OK)
  async handleInboundEvent(@Body() payload: any) {
    // Normalizes inbound payload format
    const event: InboundSocialEvent = {
      platform: (payload.platform?.toUpperCase() as SocialPlatform) || SocialPlatform.LINKEDIN,
      eventType: payload.eventType || 'COMMENT',
      senderHandle: payload.senderHandle || payload.from || 'prospective_client',
      senderName: payload.senderName || payload.name,
      senderEmail: payload.senderEmail || payload.email,
      senderPhone: payload.senderPhone || payload.phone,
      postId: payload.postId,
      messageText: payload.messageText || payload.text || 'Interested in your enterprise services. Please share pricing.',
      brandProfileId: payload.brandProfileId,
    };

    return this.leadCapture.processInboundEvent(event);
  }
}
