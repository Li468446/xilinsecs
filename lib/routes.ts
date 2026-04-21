import {
  contactPortals,
  customerPortals,
  customerTicketPortals,
  downloads,
  newsItems,
  partnerPortals,
  products,
  projects,
  services,
  tools,
} from "@/lib/site-data";

export const staticRoutes = [
  "/",
  "/about/",
  "/projects/",
  "/partners/",
  "/contact/",
  "/services/",
  "/products/",
  "/news/",
  "/company/timeline/",
  "/company/leadership/",
  "/tools/",
  "/downloads/",
  "/careers/",
  "/careers/team/",
  "/careers/life/",
  "/careers/open-roles/",
  "/legal/privacy/",
];

export const dynamicRoutes = [
  ...projects.map((item) => item.href),
  ...newsItems.map((item) => item.href),
  ...services.map((item) => item.href),
  ...products.map((item) => item.href),
  ...tools.map((item) => item.href),
  ...downloads.map((item) => item.href),
  ...contactPortals.map((item) => item.href),
  ...customerPortals.map((item) => item.href),
  ...customerTicketPortals.map((item) => item.href),
  ...partnerPortals.map((item) => item.href),
];

export const allRoutes = [...staticRoutes, ...dynamicRoutes];
