// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   output: "standalone",
//   /* config options here */
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   reactStrictMode: false,
// };

// export default nextConfig;


// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   output: "standalone",

//   // TypeScript configuration
//   typescript: {
//     ignoreBuildErrors: false,
//   },

//   // React strict mode
//   reactStrictMode: true,

//   // Image optimization configuration
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'http',
//         hostname: '157.173.107.29',
//         pathname: '/media/**',
//       },
//       {
//         protocol: 'https',
//         hostname: '**.amazonaws.com',
//         pathname: '/**',
//       },
//       {
//         protocol: 'https',
//         hostname: '**.cloudinary.com',
//         pathname: '/**',
//       },
//       {
//         protocol: 'https',
//         hostname: 'fusateen.s3.amazonaws.com',
//         pathname: '/**',
//       },
//       {
//         protocol: 'https',
//         hostname: 'api.fusateen.com',
//         pathname: '/media/**',
//       },
//     ],
//     // Disable image optimization in development for faster builds
//     unoptimized: process.env.NODE_ENV === 'development',
//   },

//   // Headers for security
//   async headers() {
//     return [
//       {
//         source: '/(.*)',
//         headers: [
//           {
//             key: 'X-Frame-Options',
//             value: 'DENY',
//           },
//           {
//             key: 'X-Content-Type-Options',
//             value: 'nosniff',
//           },
//           {
//             key: 'Referrer-Policy',
//             value: 'strict-origin-when-cross-origin',
//           },
//         ],
//       },
//     ];
//   },

//   // Redirects
//   async redirects() {
//     return [
//       {
//         source: '/seller',
//         destination: '/seller/dashboard',
//         permanent: true,
//       },
//     ];
//   },
// };

// export default nextConfig;




import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",

  // TypeScript configuration
  typescript: {
    ignoreBuildErrors: false,
  },

  // React strict mode
  reactStrictMode: true,

  // Image optimization configuration
  images: {
    remotePatterns: [



      {
        protocol: 'https',
        hostname: 'fasateen.duckdns.org',
        pathname: '/furateen-media/**',
      },

      {
        protocol: 'https',
        hostname: 'fasateen.duckdns.org',
      },
      {
        protocol: 'https',
        hostname: 'example.com',
      },
      // ... باقي الـ patterns
    ],
    unoptimized: process.env.NODE_ENV === 'development',
  },

  

  // ✅ إضافة rewrites لحل مشكلة CORS
  async rewrites() {
    return [
      {
        source: '/api/uploads/:path*',        // أي طلب يبدأ بـ /api/uploads/
        destination: 'https://fasateen.duckdns.org/api/v1/uploads/:path*', // يُعاد توجيهه إلى الخادم البعيد
      },
      // يمكنك إضافة rewrites أخرى لو كان هناك endpoints إضافية تحتاجها
    ];
  },

  // Headers for security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // Redirects
  async redirects() {
    return [
      {
        source: '/seller',
        destination: '/seller/dashboard',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;