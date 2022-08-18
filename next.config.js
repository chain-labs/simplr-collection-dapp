/* eslint-disable @typescript-eslint/no-var-requires */
const withTM = require('next-transpile-modules')(['gsap']);
const withPlugins = require('next-compose-plugins');

const nextConfig = {
	images: {
		domains: ['nftfy.mypinata.cloud'],
	},
};
module.exports = withPlugins([
	[
		withTM({
			webpack(config) {
				config.module.rules.push({
					test: /\.(jpg|gif|svg|eot|ttf|woff|woff2)$/,
					use: ['@svgr/webpack'],
				});
				return config;
			},
			async rewrites() {
				return [
					{
						source: '/api/:path*',
						destination: 'https://simplr.mypinata.cloud/ipfs/:path*',
					},
				];
			},
			generateETags: false,
		}),
	],
	nextConfig,
]);
