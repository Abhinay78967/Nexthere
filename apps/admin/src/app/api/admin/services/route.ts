import { NextResponse, type NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');

    let query = supabaseAdmin
      .from('Service')
      .select('*, ServiceCategory(id, title, slug)')
      .order('createdAt', { ascending: true });

    if (categoryId && categoryId !== 'ALL') {
      query = query.eq('categoryId', categoryId);
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
    const { categoryId, title, slug, description, capabilities, media, active } = body;

    if (!title || !slug || !categoryId || !description) {
      return NextResponse.json({ success: false, error: 'Title, slug, categoryId, and description are required' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('Service')
      .insert({
        id: crypto.randomUUID(),
        categoryId,
        title,
        slug,
        description,
        capabilities: Array.isArray(capabilities) ? capabilities : (capabilities ? capabilities.split(',').map((s: string) => s.trim()) : []),
        media: media || null,
        active: active !== undefined ? active : true,
      })
      .select('*, ServiceCategory(id, title, slug)')
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
    const { id, title, slug, categoryId, description, capabilities, active } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Service ID is required' }, { status: 400 });
    }

    const updatePayload: Record<string, any> = {};
    if (title !== undefined) updatePayload.title = title;
    if (slug !== undefined) updatePayload.slug = slug;
    if (categoryId !== undefined) updatePayload.categoryId = categoryId;
    if (description !== undefined) updatePayload.description = description;
    if (capabilities !== undefined) {
      updatePayload.capabilities = Array.isArray(capabilities) ? capabilities : capabilities.split(',').map((s: string) => s.trim());
    }
    if (active !== undefined) updatePayload.active = active;

    const { data, error } = await supabaseAdmin
      .from('Service')
      .update(updatePayload)
      .eq('id', id)
      .select('*, ServiceCategory(id, title, slug)')
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
      return NextResponse.json({ success: false, error: 'Service ID is required' }, { status: 400 });
    }

    const { error } = await supabaseAdmin.from('Service').delete().eq('id', id);
    if (error) throw error;

    return NextResponse.json({ success: true, message: 'Service deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
