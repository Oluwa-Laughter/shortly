import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Links from "./Links";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;

// Create Supabase client
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// URL validation regex
const URL_REGEX = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

export default function Shortener() {
  const [error, setError] = useState(null);
  const [inputURL, setInputURL] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resultURL, setResultURL] = useState(() => {
    const savedLinks = localStorage.getItem("links");
    return savedLinks ? JSON.parse(savedLinks) : [];
  });

  useEffect(() => {
    localStorage.setItem("links", JSON.stringify(resultURL));
  }, [resultURL]);

  const validateURL = (url) => {
    if (!url) return false;
    const urlToTest = url.startsWith("http") ? url : `https://${url}`;
    return URL_REGEX.test(urlToTest);
  };

  const generateSlug = () => {
    return (
      Math.random().toString(36).substring(2, 8) +
      Date.now().toString(36).substring(-4)
    );
  };

  const handleFetch = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // To Validate URL
      if (!validateURL(inputURL)) {
        throw new Error("Please enter a valid URL");
      }

      const slug = generateSlug();
      // Using the deployment URL to create the short URL
      const shortURL = `${window.location.origin}/s/${slug}`;

      // Improvng the input URL
      const formattedURL = inputURL.startsWith("http")
        ? inputURL
        : `https://${inputURL}`;

      const { data, error: supabaseError } = await supabase
        .from("shortly")
        .insert([
          {
            old_url: formattedURL,
            slug,
            short_url: shortURL,
          },
        ])
        .select()
        .single();

      if (supabaseError) throw new Error(supabaseError.message);

      if (data) {
        const newLink = {
          oldURL: formattedURL,
          shortenURL: shortURL,
          createdAt: new Date().toISOString(),
        };
        setResultURL((prev) => [newLink, ...prev]);
        setInputURL("");
      }
    } catch (err) {
      setError(err.message || "An error occurred");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFetch();
  };

  const handleClear = () => {
    localStorage.removeItem("links");
    setResultURL([]);
  };

  return (
    <div className="mx-auto grid max-w-[1000px] -mt-44 gap-6">
      <div className="relative mx-auto w-full overflow-hidden rounded-lg bg-[#3b3054] p-4 font-bold shadow-md sm:py-8 md:p-6 md:py-10 lg:p-12">
        <div className="absolute inset-0">
          <picture>
            <source
              media="(min-width: 600px)"
              srcSet="/images/bg-shorten-desktop.svg"
            />
            <img
              className="h-full w-full"
              src="/images/bg-shorten-mobile.svg"
              alt="CTA Background Blob"
            />
          </picture>
        </div>

        <form onSubmit={handleSubmit} className="z-10">
          <div className="relative flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
            <input
              type="text"
              placeholder="Shorten a link here..."
              value={inputURL}
              className={`relative flex-1 rounded-md p-2 font-medium transition-all duration-300 ease-in-out md:rounded-lg ${
                error
                  ? "ring-4 ring-red-500 focus:ring-red-600"
                  : "focus:ring-4 focus:ring-cyan-500"
              }`}
              onChange={(e) => setInputURL(e.target.value)}
              disabled={isLoading}
            />
            <div className="flex flex-col md:flex-row gap-4">
              <button
                className={`rounded-md bg-cyan-400 py-3 px-6 font-bold text-white transition-all duration-300 ease-in-out hover:bg-cyan-300 hover:shadow-sm disabled:opacity-50 disabled:cursor-not-allowed`}
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Shortening..." : "Shorten It!"}
              </button>

              <button
                onClick={handleClear}
                className="rounded-md bg-red-500 py-3 px-6 font-bold text-white transition-all duration-300 ease-in-out hover:bg-red-400 hover:shadow-sm disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:shadow-none"
                type="button"
                disabled={resultURL.length === 0 || isLoading}
              >
                {resultURL.length > 1 ? "Clear All" : "Clear"}
              </button>
            </div>
            {error && (
              <p className="absolute bottom-32 left-0 text-sm font-medium text-red-400 transition-all duration-300 ease-in-out sm:-bottom-7 md:-bottom-7 lg:-bottom-8">
                <i>{error}</i>
              </p>
            )}
          </div>
        </form>
      </div>

      {resultURL.map((url) => (
        <Links
          key={url.shortenURL}
          oldURL={url.oldURL}
          shortenURL={url.shortenURL}
        />
      ))}
    </div>
  );
}
