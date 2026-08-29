import { NextResponse, type NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { data: settings } = await supabaseAdmin.from('SiteSettings').select('*').limit(1).single();
    return NextResponse.json({ success: true, data: settings });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      id,
      siteName,
      tagline,
      socialLinks,
      defaultSEO,
      footerContent,
    } = body;

    const payload = {
      siteName: siteName || 'NextHere Services',
      tagline,
      socialLinks: typeof socialLinks === 'string' ? JSON.parse(socialLinks || '{}') : (socialLinks || null),
      defaultSEO: typeof defaultSEO === 'string' ? JSON.parse(defaultSEO || '{}') : (defaultSEO || null),
      footerContent: typeof footerContent === 'string' ? JSON.parse(footerContent || '{}') : (footerContent || null),
      updatedAt: new Date().toISOString(),
    };

    let result;
    if (id) {
      const { data, error } = await supabaseAdmin
        .from('SiteSettings')
        .update(payload)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      result = data;
    } else {
      const { data: existing } = await supabaseAdmin.from('SiteSettings').select('id').limit(1).single();
      if (existing?.id) {
        const { data, error } = await supabaseAdmin
          .from('SiteSettings')
          .update(payload)
          .eq('id', existing.id)
          .select()
          .single();
        if (error) throw error;
        result = data;
      } else {
        const { data, error } = await supabaseAdmin
          .from('SiteSettings')
          .insert(payload)
          .select()
          .single();
        if (error) throw error;
        result = data;
      }
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
