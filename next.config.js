/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
      },
    ],
  },
  async redirects() {
    const productionRedirects =
      process.env.NODE_ENV === "production"
        ? [
            { source: "/notes", destination: "/", permanent: false },
            { source: "/notes/:path*", destination: "/", permanent: false },
          ]
        : [];

    return productionRedirects;
  },
};

module.exports = nextConfig;
