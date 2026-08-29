import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const [
      { count: totalLeads },
      { count: newLeads },
      { count: wonLeads },
      { count: totalServices },
      { count: activeServices },
      { count: totalProjects },
      { count: completedProjects },
      { count: totalArticles },
      { count: publishedArticles },
      { count: totalFaqs },
      { data: recentLeads },
    ] = await Promise.all([
      supabaseAdmin.from('Lead').select('*', { count: 'exact', head: true }),
      supabaseAdmin.from('Lead').select('*', { count: 'exact', head: true }).eq('status', 'NEW'),
      supabaseAdmin.from('Lead').select('*', { count: 'exact', head: true }).eq('status', 'WON'),
      supabaseAdmin.from('Service').select('*', { count: 'exact', head: true }),
      supabaseAdmin.from('Service').select('*', { count: 'exact', head: true }).eq('active', true),
      supabaseAdmin.from('Project').select('*', { count: 'exact', head: true }),
      supabaseAdmin.from('Project').select('*', { count: 'exact', head: true }).eq('projectStatus', 'COMPLETED'),
      supabaseAdmin.from('Article').select('*', { count: 'exact', head: true }),
      supabaseAdmin.from('Article').select('*', { count: 'exact', head: true }).eq('status', 'PUBLISHED'),
      supabaseAdmin.from('FAQ').select('*', { count: 'exact', head: true }),
      supabaseAdmin.from('Lead').select('*, ServiceCategory(title), Service(title)').order('createdAt', { ascending: false }).limit(6),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        stats: {
          leads: { total: totalLeads || 0, new: newLeads || 0, won: wonLeads || 0 },
          services: { total: totalServices || 0, active: activeServices || 0 },
          projects: { total: totalProjects || 0, completed: completedProjects || 0 },
          insights: { total: totalArticles || 0, published: publishedArticles || 0 },
          faqs: { total: totalFaqs || 0 },
        },
        recentLeads: recentLeads || [],
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
