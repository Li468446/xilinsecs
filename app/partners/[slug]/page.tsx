import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/metadata";
import { getPartnerPortalBySlug } from "@/lib/site-data";
import PortalPage from "@/components/pages/portal-page";

const partnerSlugs = ["apply", "orders", "profile", "workspace"];

export function generateStaticParams() {
  return partnerSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const portal = getPartnerPortalBySlug(params.slug);
  if (!portal) return {};

  return buildMetadata({
    title: portal.seoTitle,
    description: portal.seoDescription,
    path: portal.href,
    image: portal.heroImage,
  });
}

export default function PartnerPortalPage({ params }: { params: { slug: string } }) {
  const portal = getPartnerPortalBySlug(params.slug);
  if (!portal) notFound();

  return <PortalPage portal={portal} />;
}
