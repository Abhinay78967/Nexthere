import { NextResponse } from 'next/server';
import { prisma } from '@nexthere/database';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Honeypot check
    if (body.honeypot) {
      return NextResponse.json({ success: true, data: { received: true } });
    }

    const lead = await prisma.lead.create({
      data: {
        name: body.name,
        companyName: body.companyName || null,
        email: body.email,
        phone: body.phone || null,
        notes: body.notes || body.message || null,
        source: body.source || 'WEBSITE',
        status: 'NEW',
        priority: 'MEDIUM',
      },
    });

    return NextResponse.json({ success: true, data: lead });
  } catch (err: any) {
    console.error('Lead creation error:', err);
    return NextResponse.json(
      { success: false, error: { message: 'Failed to submit lead' } },
      { status: 500 }
    );
  }
}
