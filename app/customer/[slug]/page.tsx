import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/metadata";
import { getCustomerPortalBySlug } from "@/lib/site-data";
import PortalPage from "@/components/pages/portal-page";

const customerSlugs = ["orders", "subscriptions", "profile"];

export function generateStaticParams() {
  return customerSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const portal = getCustomerPortalBySlug(params.slug);
  if (!portal) return {};

  return buildMetadata({
    title: portal.seoTitle,
    description: portal.seoDescription,
    path: portal.href,
    image: portal.heroImage,
  });
}

export default function CustomerPortalPage({ params }: { params: { slug: string } }) {
  const portal = getCustomerPortalBySlug(params.slug);
  if (!portal) notFound();

  return <PortalPage portal={portal} />;
}
