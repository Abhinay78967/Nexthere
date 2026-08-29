import { NextResponse, type NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    let query = supabaseAdmin
      .from('Project')
      .select('*, Industry(id, title)')
      .order('createdAt', { ascending: false });

    if (status && status !== 'ALL') {
      query = query.eq('projectStatus', status);
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
    const { title, slug, industryId, location, projectStatus, status, challenge, solution, execution, results, coverMedia } = body;

    if (!title || !slug) {
      return NextResponse.json({ success: false, error: 'Title and slug are required' }, { status: 400 });
    }

    const { data, error } = await supabaseAdmin
      .from('Project')
      .insert({
        id: crypto.randomUUID(),
        title,
        slug,
        industryId: industryId || null,
        location: location || null,
        projectStatus: projectStatus || 'COMPLETED',
        status: status || 'PUBLISHED',
        challenge: challenge || null,
        solution: solution || null,
        execution: execution || null,
        results: results || null,
        coverMedia: typeof coverMedia === 'string' ? { url: coverMedia, alt: title } : (coverMedia || null),
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
    const { id, title, slug, industryId, location, projectStatus, status, challenge, solution, execution, results, coverMedia } = body;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Project ID is required' }, { status: 400 });
    }

    const updatePayload: Record<string, any> = { updatedAt: new Date().toISOString() };
    if (title !== undefined) updatePayload.title = title;
    if (slug !== undefined) updatePayload.slug = slug;
    if (industryId !== undefined) updatePayload.industryId = industryId;
    if (location !== undefined) updatePayload.location = location;
    if (projectStatus !== undefined) updatePayload.projectStatus = projectStatus;
    if (status !== undefined) updatePayload.status = status;
    if (challenge !== undefined) updatePayload.challenge = challenge;
    if (solution !== undefined) updatePayload.solution = solution;
    if (execution !== undefined) updatePayload.execution = execution;
    if (results !== undefined) updatePayload.results = results;
    if (coverMedia !== undefined) {
      updatePayload.coverMedia = typeof coverMedia === 'string' ? { url: coverMedia, alt: title || '' } : coverMedia;
    }

    const { data, error } = await supabaseAdmin
      .from('Project')
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
      return NextResponse.json({ success: false, error: 'Project ID is required' }, { status: 400 });
    }

    const { error } = await supabaseAdmin.from('Project').delete().eq('id', id);
    if (error) throw error;

    return NextResponse.json({ success: true, message: 'Project deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
