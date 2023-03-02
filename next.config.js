/** @type {import('next').NextConfig} */
const nextConfig = {
   reactStrictMode: false,
   i18n: {
      locales: ["es"],
      defaultLocale: "es",
   },
   images: {
      remotePatterns: [
         {
            protocol: "https",
            hostname: "**.googleusercontent.com",
         },
         {
            protocol: "https",
            hostname: "**.googleapis.com",
         },
         {
            protocol: "https",
            hostname: "cdn.shopify.com",
         },
      ],
   },
};

module.exports = nextConfig;
