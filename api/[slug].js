import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default async function handler(req, res) {
  const { slug } = req.query;

  const { data, error } = await supabase
    .from("shortly")
    .select("old_url")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return res.status(404).send("URL not found");
  }

  res.redirect(data.old_url);
}
