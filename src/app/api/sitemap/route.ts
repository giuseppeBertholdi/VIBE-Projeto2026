import { NextResponse } from "next/server";
import { ARTWORKS } from "@/lib/artworks-data";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://museum-ai.vercel.app";
  const now = new Date().toISOString();

  const staticPages = [
    { url: baseUrl, priority: "1.0", changefreq: "weekly" },
    { url: `${baseUrl}/about`, priority: "0.7", changefreq: "monthly" },
  ];

  const artworkPages = ARTWORKS.map(a => ({
    url: `${baseUrl}/artwork/${a.slug}`,
    priority: "0.9",
    changefreq: "monthly",
  }));

  const allPages = [...staticPages, ...artworkPages];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(page => `  <url>
    <loc>${page.url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join("\n")}
</urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=86400",
    },
  });
}
