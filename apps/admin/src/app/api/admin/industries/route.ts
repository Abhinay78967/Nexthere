import { NextResponse, type NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('Industry')
      .select('*')
      .order('createdAt', { ascending: true });

    if (error) throw error;
    return NextResponse.json({ success: true, data: data || [] });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, slug, shortDescription, description, status, media } = body;

    if (!title || !slug) {
      return NextResponse.json({ success: false, error: 'Title and slug are required' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('Industry')
      .insert({
        id: crypto.randomUUID(),
        title,
        slug,
        shortDescription: shortDescription || null,
        description: description || null,
        status: status || 'PUBLISHED',
        media: media || null,
        updatedAt: new Date().toISOString(),
      })
      .select()
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
    const { id, title, slug, shortDescription, description, status, media } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Industry ID is required' }, { status: 400 });
    }

    const updatePayload: Record<string, any> = { updatedAt: new Date().toISOString() };
    if (title !== undefined) updatePayload.title = title;
    if (slug !== undefined) updatePayload.slug = slug;
    if (shortDescription !== undefined) updatePayload.shortDescription = shortDescription;
    if (description !== undefined) updatePayload.description = description;
    if (status !== undefined) updatePayload.status = status;
    if (media !== undefined) updatePayload.media = media;

    const { data, error } = await supabaseAdmin
      .from('Industry')
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
      return NextResponse.json({ success: false, error: 'Industry ID is required' }, { status: 400 });
    }

    const { error } = await supabaseAdmin.from('Industry').delete().eq('id', id);
    if (error) throw error;

    return NextResponse.json({ success: true, message: 'Industry deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
