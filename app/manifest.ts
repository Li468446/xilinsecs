import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "HK XSEC",
    short_name: "HK XSEC",
    description: "HK XSEC 品牌站与服务入口中心",
    start_url: "/",
    display: "standalone",
    background_color: "#0f172a",
    theme_color: "#0f172a",
    icons: [
      {
        src: "/source/imgs/logo-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/source/imgs/logo-180.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
