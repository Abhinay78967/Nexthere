import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ||
    'https://uqjsgmqztgugojgnzkqc.supabase.co';
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    'sb_publishable_LPNR0sdUDTR6VMbSDIl0Aw_OLAiXXFu';

  return createBrowserClient(supabaseUrl, supabaseKey);
}
