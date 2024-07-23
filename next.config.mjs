/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['i.annihil.us'],
	},
	staticPageGenerationTimeout: 1000,
	async headers() {
		return [
			{
				source: '/(.*)', // Applique à toutes les pages
				headers: [
					{
						key: 'Cache-Control',
						value: 's-maxage=10, stale-while-revalidate', // Ajustez selon vos besoins
					},
					{
						key: 'Keep-Alive',
						value: 'timeout=59', // Ajustez selon vos besoins
					},
				],
			},
		];
	},
};

export default nextConfig;
