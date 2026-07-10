import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ARTWORKS, getArtworkBySlug } from "@/lib/artworks-data";
import { ArtworkExperience } from "./ArtworkExperience";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ARTWORKS.map(a => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const artwork = getArtworkBySlug(slug);
  if (!artwork) return {};
  return {
    title: `${artwork.title} — ${artwork.artist.name}`,
    description: artwork.description || `Explore ${artwork.title} com um guia de IA em tempo real.`,
    openGraph: {
      images: [{ url: artwork.thumbnailUrl || artwork.imageUrl, alt: artwork.title }],
    },
  };
}

export default async function ArtworkPage({ params }: Props) {
  const { slug } = await params;
  const artwork = getArtworkBySlug(slug);
  if (!artwork) notFound();
  return <ArtworkExperience artwork={artwork} />;
}
