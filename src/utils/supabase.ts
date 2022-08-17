import { createClient } from "@supabase/supabase-js";

//* supabaseのインスタンスの作成

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.NEXT_PUBLIC_SUPABASE_API_KEY as string
);
