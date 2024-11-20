import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default async function handler(req, res) {
  // Get the slug from the URL
  const slug = req.query.slug[0];

  try {
    // Query Supabase for the original URL
    const { data, error } = await supabase
      .from("shortly")
      .select("old_url")
      .eq("slug", slug)
      .single();

    if (error) {
      throw error;
    }

    if (!data) {
      // If URL not found, redirect to home page or show error
      return res.redirect(307, "/");
    }

    // Redirect to the original URL
    return res.redirect(301, data.old_url);
  } catch (error) {
    console.error("Error:", error);
    return res.redirect(307, "/");
  }
}
