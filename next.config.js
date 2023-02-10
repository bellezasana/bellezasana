/** @type {import('next').NextConfig} */
const nextConfig = {
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
      ],
   },
};

module.exports = nextConfig;
