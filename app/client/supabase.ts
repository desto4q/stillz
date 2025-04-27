import { createClient } from "@supabase/supabase-js";

let supabase = createClient(process.env.SUPA_URL!, process.env.SUPA_KEY!);
export { supabase };
