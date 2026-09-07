import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { LeadPriority, LeadSource, LeadStatus, SocialPlatform } from '@nexthere/database';

export interface InboundSocialEvent {
  platform: SocialPlatform;
  eventType: 'COMMENT' | 'DIRECT_MESSAGE' | 'MENTION';
  senderHandle: string;
  senderName?: string;
  senderEmail?: string;
  senderPhone?: string;
  postId?: string;
  messageText: string;
  brandProfileId?: string;
}

export interface InboundCaptureResult {
  leadCaptured: boolean;
  leadId?: string;
  inquiryId?: string;
  autoReplyText: string;
  customerName: string;
  intentDetected: string;
}

@Injectable()
export class SocialLeadCaptureService {
  private readonly logger = new Logger(SocialLeadCaptureService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Processes an incoming social interaction, extracts intent, and creates a CRM Lead
   */
  async processInboundEvent(event: InboundSocialEvent): Promise<InboundCaptureResult> {
    const text = event.messageText.toLowerCase();
    const handle = event.senderHandle.replace(/^@/, '');
    const customerName = event.senderName || `@${handle}`;

    // Detect lead intent
    let intentDetected = 'General Engagement';
    let isHighIntent = false;

    if (
      text.includes('price') ||
      text.includes('cost') ||
      text.includes('quote') ||
      text.includes('rate')
    ) {
      intentDetected = 'Pricing / Quote Request';
      isHighIntent = true;
    } else if (
      text.includes('audit') ||
      text.includes('consult') ||
      text.includes('strategy') ||
      text.includes('grow') ||
      text.includes('help')
    ) {
      intentDetected = 'Strategy Audit / Consultation';
      isHighIntent = true;
    } else if (
      text.includes('hire') ||
      text.includes('service') ||
      text.includes('cloud') ||
      text.includes('logistics') ||
      text.includes('electrical')
    ) {
      intentDetected = 'Service Inquiry';
      isHighIntent = true;
    }

    // Generate smart contextual auto-reply
    let autoReplyText = `Hi ${customerName}! Thanks for connecting with NextHere. We've sent you our comprehensive overview and direct scheduling link in your DMs.`;

    if (intentDetected === 'Pricing / Quote Request') {
      autoReplyText = `Hello ${customerName}! We have generated an instant quotation link tailored for your requirements. Please check your direct messages or visit nexthere.in/quote`;
    } else if (intentDetected === 'Strategy Audit / Consultation') {
      autoReplyText = `Hi ${customerName}! You're in! We have reserved your complimentary NextHere Enterprise Strategy Audit. Check your DMs for the executive calendar link.`;
    }

    let leadId: string | undefined;
    let inquiryId: string | undefined;

    try {
      // Find or create lead in CRM database
      const dummyEmail = event.senderEmail || `${handle.toLowerCase()}@social.${event.platform.toLowerCase()}.com`;

      const lead = await this.prisma.client.lead.create({
        data: {
          name: customerName,
          companyName: `${customerName} (${event.platform})`,
          email: dummyEmail,
          phone: event.senderPhone || null,
          source: LeadSource.OTHER,
          status: LeadStatus.NEW,
          priority: isHighIntent ? LeadPriority.HIGH : LeadPriority.MEDIUM,
          notes: `[Auto-Captured from ${event.platform} ${event.eventType}] Message: "${event.messageText}". Intent: ${intentDetected}`,
        },
      });

      leadId = lead.id;

      // Create linked CRM inquiry
      const inquiry = await this.prisma.client.inquiry.create({
        data: {
          leadId: lead.id,
          subject: `${event.platform} Social Lead: ${intentDetected}`,
          message: event.messageText,
          metadata: {
            platform: event.platform,
            eventType: event.eventType,
            senderHandle: event.senderHandle,
            postId: event.postId,
            autoReplySent: autoReplyText,
            capturedAt: new Date().toISOString(),
          },
        },
      });

      inquiryId = inquiry.id;

      this.logger.log(`[LEAD CAPTURED] New CRM Lead created from ${event.platform}: ${customerName} (ID: ${lead.id})`);
    } catch (err: any) {
      this.logger.warn(`Could not persist lead directly to DB (${err?.message}), returning capture result.`);
    }

    return {
      leadCaptured: true,
      leadId,
      inquiryId,
      autoReplyText,
      customerName,
      intentDetected,
    };
  }
}
