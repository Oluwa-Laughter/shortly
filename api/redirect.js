import { createClient } from "@supabase/supabase-js";
import { URL } from "url";

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default async function handler(req, res) {
  const { slug } = req.query;

  if (!slug) {
    return res.status(400).json({ error: "Slug is required" });
  }

  const { data, error } = await supabase
    .from("shortly")
    .select("old_url")
    .eq("slug", slug)
    .single();

  if (error || !data) {
    return res.status(404).json({ error: "URL not found" });
  }

  try {
    // Validate the URL
    const url = new URL(data.old_url);
    if (!["http:", "https:"].includes(url.protocol)) {
      throw new Error("Invalid URL protocol");
    }

    res.writeHead(301, { Location: data.old_url });
    res.end();
  } catch (err) {
    res.status(400).json({ error: "Invalid URL" });
  }
}
