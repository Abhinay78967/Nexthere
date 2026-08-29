import { NextResponse, type NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let query = supabaseAdmin
      .from('Article')
      .select('*, Industry(id, title)')
      .order('createdAt', { ascending: false });

    if (status && status !== 'ALL') {
      query = query.eq('status', status);
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
    const { title, slug, excerpt, content, author, tags, status, publishedAt, coverMedia, industryId } = body;

    if (!title || !slug) {
      return NextResponse.json({ success: false, error: 'Title and slug are required' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('Article')
      .insert({
        id: crypto.randomUUID(),
        title,
        slug,
        excerpt: excerpt || null,
        content: content || null,
        author: author || 'NextHere Editorial Team',
        tags: Array.isArray(tags) ? tags : (tags ? tags.split(',').map((t: string) => t.trim()) : []),
        status: status || 'PUBLISHED',
        publishedAt: publishedAt || new Date().toISOString(),
        coverMedia: typeof coverMedia === 'string' ? { url: coverMedia, alt: title } : (coverMedia || null),
        industryId: industryId || null,
        updatedAt: new Date().toISOString(),
      })
      .select('*, Industry(id, title)')
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
    const { id, title, slug, excerpt, content, author, tags, status, publishedAt, coverMedia, industryId } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Article ID is required' }, { status: 400 });
    }

    const updatePayload: Record<string, any> = { updatedAt: new Date().toISOString() };
    if (title !== undefined) updatePayload.title = title;
    if (slug !== undefined) updatePayload.slug = slug;
    if (excerpt !== undefined) updatePayload.excerpt = excerpt;
    if (content !== undefined) updatePayload.content = content;
    if (author !== undefined) updatePayload.author = author;
    if (tags !== undefined) {
      updatePayload.tags = Array.isArray(tags) ? tags : tags.split(',').map((t: string) => t.trim());
    }
    if (status !== undefined) updatePayload.status = status;
    if (publishedAt !== undefined) updatePayload.publishedAt = publishedAt;
    if (industryId !== undefined) updatePayload.industryId = industryId;
    if (coverMedia !== undefined) {
      updatePayload.coverMedia = typeof coverMedia === 'string' ? { url: coverMedia, alt: title || '' } : coverMedia;
    }

    const { data, error } = await supabaseAdmin
      .from('Article')
      .update(updatePayload)
      .eq('id', id)
      .select('*, Industry(id, title)')
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
      return NextResponse.json({ success: false, error: 'Article ID is required' }, { status: 400 });
    }

    const { error } = await supabaseAdmin.from('Article').delete().eq('id', id);
    if (error) throw error;

    return NextResponse.json({ success: true, message: 'Article deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
