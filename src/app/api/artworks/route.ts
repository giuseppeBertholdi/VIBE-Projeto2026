import { NextResponse } from "next/server";
import { ARTWORKS } from "@/lib/artworks-data";

export async function GET() {
  const artworks = ARTWORKS.map(({ id, title, slug, year, imageUrl, thumbnailUrl, movements, tags, artist }) => ({
    id, title, slug, year, imageUrl, thumbnailUrl, movements, tags,
    artist: { id: artist.id, name: artist.name, nationality: artist.nationality },
  }));

  return NextResponse.json(
    { artworks, total: artworks.length },
    { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } }
  );
}
