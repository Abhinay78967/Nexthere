import { NextResponse, type NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    let query = supabaseAdmin
      .from('FAQ')
      .select('*, Service(id, title), Industry(id, title)')
      .order('displayOrder', { ascending: true });

    if (category && category !== 'ALL') {
      query = query.eq('category', category);
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
    const { question, answer, category, serviceId, industryId, displayOrder, status } = body;

    if (!question || !answer) {
      return NextResponse.json({ success: false, error: 'Question and answer are required' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('FAQ')
      .insert({
        id: crypto.randomUUID(),
        question,
        answer,
        category: category || 'General',
        serviceId: serviceId || null,
        industryId: industryId || null,
        displayOrder: displayOrder !== undefined ? parseInt(displayOrder) : 0,
        status: status || 'PUBLISHED',
        updatedAt: new Date().toISOString(),
      })
      .select('*, Service(id, title), Industry(id, title)')
      .single();

    if (error) throw error;
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, question, answer, category, serviceId, industryId, displayOrder, status } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'FAQ ID is required' }, { status: 400 });
    }

    const updatePayload: Record<string, any> = { updatedAt: new Date().toISOString() };
    if (question !== undefined) updatePayload.question = question;
    if (answer !== undefined) updatePayload.answer = answer;
    if (category !== undefined) updatePayload.category = category;
    if (serviceId !== undefined) updatePayload.serviceId = serviceId;
    if (industryId !== undefined) updatePayload.industryId = industryId;
    if (displayOrder !== undefined) updatePayload.displayOrder = parseInt(displayOrder);
    if (status !== undefined) updatePayload.status = status;

    const { data, error } = await supabaseAdmin
      .from('FAQ')
      .update(updatePayload)
      .eq('id', id)
      .select('*, Service(id, title), Industry(id, title)')
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
      return NextResponse.json({ success: false, error: 'FAQ ID is required' }, { status: 400 });
    }

    const { error } = await supabaseAdmin.from('FAQ').delete().eq('id', id);
    if (error) throw error;

    return NextResponse.json({ success: true, message: 'FAQ deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
