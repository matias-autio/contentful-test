/** @type {import('next').NextConfig} */
const nextConfig = {
    // trailingSlash: true,
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'images.ctfassets.net',
          },
        ],
      },
};

export default nextConfig;
