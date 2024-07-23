/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
	  domains: ['i.annihil.us'],
	},
	async headers() {
	  return [
		{
		  source: "/api/(.*)",
		  headers: [
			{
			  key: "Keep-Alive",
			  value: "timeout=600", // 10 minutes
			},
		  ],
		},
	  ];
	},
  };
  
  export default nextConfig;
  