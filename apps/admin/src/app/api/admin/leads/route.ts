import { NextResponse, type NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');
    const search = searchParams.get('search');

    let query = supabaseAdmin
      .from('Lead')
      .select('*, ServiceCategory(title), Service(title), Inquiry(*)')
      .order('createdAt', { ascending: false });

    if (status && status !== 'ALL') {
      query = query.eq('status', status);
    }
    if (priority && priority !== 'ALL') {
      query = query.eq('priority', priority);
    }
    if (search) {
      query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%,phone.ilike.%${search}%,companyName.ilike.%${search}%`);
    }

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json({ success: true, data: data || [] });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, companyName, serviceCategoryId, serviceId, status, priority, source, notes, message } = body;

    if (!name || !email) {
      return NextResponse.json({ success: false, error: 'Name and email are required' }, { status: 400 });
    }

    const now = new Date().toISOString();
    const { data: lead, error: leadError } = await supabaseAdmin
      .from('Lead')
      .insert({
        id: crypto.randomUUID(),
        name,
        email,
        phone: phone || null,
        companyName: companyName || null,
        serviceCategoryId: serviceCategoryId || null,
        serviceId: serviceId || null,
        status: status || 'NEW',
        priority: priority || 'MEDIUM',
        source: source || 'WEBSITE',
        notes: notes || null,
        updatedAt: now,
      })
      .select()
      .single();

    if (leadError) throw leadError;

    if (message && lead) {
      await supabaseAdmin.from('Inquiry').insert({
        id: crypto.randomUUID(),
        leadId: lead.id,
        serviceId: serviceId || null,
        subject: 'General Inquiry',
        message: message,
        updatedAt: now,
      });
    }

    return NextResponse.json({ success: true, data: lead });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status, priority, notes, name, email, phone, companyName } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Lead ID is required' }, { status: 400 });
    }

    const updatePayload: Record<string, any> = { updatedAt: new Date().toISOString() };
    if (status !== undefined) updatePayload.status = status;
    if (priority !== undefined) updatePayload.priority = priority;
    if (notes !== undefined) updatePayload.notes = notes;
    if (name !== undefined) updatePayload.name = name;
    if (email !== undefined) updatePayload.email = email;
    if (phone !== undefined) updatePayload.phone = phone;
    if (companyName !== undefined) updatePayload.companyName = companyName;

    const { data, error } = await supabaseAdmin
      .from('Lead')
      .update(updatePayload)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Lead ID is required' }, { status: 400 });
    }

    const { error } = await supabaseAdmin.from('Lead').delete().eq('id', id);
    if (error) throw error;

    return NextResponse.json({ success: true, message: 'Lead deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
