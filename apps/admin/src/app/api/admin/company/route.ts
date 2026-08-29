import { NextResponse, type NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { data: profile } = await supabaseAdmin.from('CompanyProfile').select('*').limit(1).single();
    return NextResponse.json({ success: true, data: profile });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      id,
      legalName,
      displayName,
      shortDescription,
      longDescription,
      mission,
      vision,
      primaryEmail,
      primaryPhone,
      address,
      city,
      state,
      country,
      foundedYear,
    } = body;

    const payload = {
      legalName,
      displayName: displayName || 'NextHere Services',
      shortDescription,
      longDescription,
      mission,
      vision,
      primaryEmail,
      primaryPhone,
      address,
      city,
      state,
      country,
      foundedYear: foundedYear ? parseInt(foundedYear) : 2025,
      updatedAt: new Date().toISOString(),
    };

    let result;
    if (id) {
      const { data, error } = await supabaseAdmin
        .from('CompanyProfile')
        .update(payload)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      result = data;
    } else {
      const { data: existing } = await supabaseAdmin.from('CompanyProfile').select('id').limit(1).single();
      if (existing?.id) {
        const { data, error } = await supabaseAdmin
          .from('CompanyProfile')
          .update(payload)
          .eq('id', existing.id)
          .select()
          .single();
        if (error) throw error;
        result = data;
      } else {
        const { data, error } = await supabaseAdmin
          .from('CompanyProfile')
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
