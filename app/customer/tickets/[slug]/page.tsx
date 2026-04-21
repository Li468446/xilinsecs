import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/metadata";
import { getCustomerTicketPortalBySlug } from "@/lib/site-data";
import PortalPage from "@/components/pages/portal-page";

const ticketSlugs = ["new", "status"];

export function generateStaticParams() {
  return ticketSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const portal = getCustomerTicketPortalBySlug(params.slug);
  if (!portal) return {};

  return buildMetadata({
    title: portal.seoTitle,
    description: portal.seoDescription,
    path: portal.href,
    image: portal.heroImage,
  });
}

export default function CustomerTicketPortalPage({ params }: { params: { slug: string } }) {
  const portal = getCustomerTicketPortalBySlug(params.slug);
  if (!portal) notFound();

  return <PortalPage portal={portal} />;
}
