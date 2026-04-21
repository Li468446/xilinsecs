import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-data";

type MetadataOptions = {
  title: string;
  description: string;
  path: string;
  image?: string;
};

export function buildMetadata({
  title,
  description,
  path,
  image = siteConfig.heroImage,
}: MetadataOptions): Metadata {
  const canonical = path === "/" ? siteConfig.domain : `${siteConfig.domain}${path.replace(/\/$/, "")}/`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: siteConfig.name,
      type: "website",
      images: [
        {
          url: image,
          width: 1600,
          height: 900,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
