/* eslint-disable @typescript-eslint/no-var-requires */
const withTM = require('next-transpile-modules')(['gsap', 'react-timezone-select']);
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
			async headers() {
				return [
					{
						source: '/drive.google.com/file/d/:path',
						headers: [
							{
								key: 'Access-Control-Allow-Origin',
								value: '*',
							},
						],
					},
				];
			},
		}),
	],
	nextConfig,
]);
