/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    // enable SWC support for styled-components which handles
    // automatic React imports and avoids runtime globals
    styledComponents: true,
  },
  images: {
    // unoptimized: true,
  },
  transpilePackages: ['gsap'],
  webpack(config, { webpack }) {
    // provide React globally for packages that expect it to exist
    config.plugins.push(
      new webpack.ProvidePlugin({
        React: 'react',
      })
    );

    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};

module.exports = nextConfig;
