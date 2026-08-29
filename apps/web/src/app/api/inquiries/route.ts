import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase-client';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Honeypot check
    if (body.honeypot) {
      return NextResponse.json({ success: true, data: { received: true } });
    }

    const now = new Date().toISOString();

    // Check if lead exists or insert new
    let leadId = crypto.randomUUID();
    const { data: existingLead } = await supabase
      .from('Lead')
      .select('id')
      .eq('email', body.email)
      .limit(1)
      .single();

    if (existingLead?.id) {
      leadId = existingLead.id;
    } else {
      const { error: leadErr } = await supabase.from('Lead').insert({
        id: leadId,
        name: body.name,
        companyName: body.companyName || null,
        email: body.email,
        phone: body.phone || null,
        notes: body.message || null,
        source: 'WEBSITE',
        status: 'NEW',
        priority: 'MEDIUM',
        updatedAt: now,
      });
      if (leadErr) console.error('Lead creation error:', leadErr);
    }

    const inquiryId = crypto.randomUUID();
    const { data: inquiry, error: inqErr } = await supabase
      .from('Inquiry')
      .insert({
        id: inquiryId,
        leadId,
        serviceId: body.serviceId || null,
        subject: body.subject || 'Quote Request',
        message: body.message || '',
        location: body.location || null,
        timeline: body.timeline || null,
        updatedAt: now,
      })
      .select()
      .single();

    if (inqErr) throw inqErr;

    return NextResponse.json({ success: true, data: inquiry });
  } catch (err: any) {
    console.error('Inquiry submission error:', err);
    return NextResponse.json(
      { success: false, error: { message: 'Failed to submit inquiry' } },
      { status: 500 }
    );
  }
}
