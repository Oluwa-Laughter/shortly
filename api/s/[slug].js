import { createClient } from "@supabase/supabase-js";

export default async function handler(req, res) {
  console.log("Function started");
  console.log("Environment check:", {
    hasSupabaseUrl: !!process.env.VITE_SUPABASE_URL,
    hasSupabaseKey: !!process.env.VITE_SUPABASE_KEY,
  });

  // Check if we have the required environment variables
  if (!process.env.VITE_SUPABASE_URL || !process.env.VITE_SUPABASE_KEY) {
    console.error("Missing environment variables");
    return res.status(500).json({
      error: "Server configuration error",
    });
  }

  // Initialize Supabase client
  try {
    const supabase = createClient(
      process.env.VITE_SUPABASE_URL,
      process.env.VITE_SUPABASE_KEY
    );

    // Get the slug
    const slug = req.query.slug?.[0];
    console.log("Requested slug:", slug);

    if (!slug) {
      return res.status(400).json({
        error: "No slug provided",
      });
    }

    // Query Supabase
    const { data, error } = await supabase
      .from("shortly")
      .select("old_url")
      .eq("slug", slug)
      .single();

    console.log("Supabase response:", { data, error });

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({
        error: "Database query error",
        details: error.message,
      });
    }

    if (!data) {
      console.log("URL not found");
      return res.redirect(307, "/");
    }

    // Check if the URL is valid
    if (!data.old_url) {
      console.error("Invalid URL in database");
      return res.status(500).json({
        error: "Invalid URL in database",
      });
    }

    console.log("Redirecting to:", data.old_url);
    return res.redirect(301, data.old_url);
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json({
      error: "Server error",
      details: error.message,
    });
  }
}
