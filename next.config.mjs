/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['i.annihil.us'],
	},
	headers: [{ key: 'Keep-Alive', value: 'timeout=600' }],
};

export default nextConfig;
