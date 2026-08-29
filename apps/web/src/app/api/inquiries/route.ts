import { NextResponse } from 'next/server';
import { prisma } from '@nexthere/database';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Honeypot check
    if (body.honeypot) {
      return NextResponse.json({ success: true, data: { received: true } });
    }

    // First ensure lead exists or create one
    let lead = await prisma.lead.findFirst({
      where: { email: body.email },
    });

    if (!lead) {
      lead = await prisma.lead.create({
        data: {
          name: body.name,
          companyName: body.companyName || null,
          email: body.email,
          phone: body.phone || null,
          notes: body.message || null,
          source: 'SERVICE_PAGE',
          status: 'NEW',
          priority: 'MEDIUM',
        },
      });
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        leadId: lead.id,
        serviceId: body.serviceId || null,
        subject: body.subject || 'Service Inquiry',
        message: body.message || '',
      },
    });

    return NextResponse.json({ success: true, data: inquiry });
  } catch (err: any) {
    console.error('Inquiry submission error:', err);
    return NextResponse.json(
      { success: false, error: { message: 'Failed to submit inquiry' } },
      { status: 500 }
    );
  }
}
