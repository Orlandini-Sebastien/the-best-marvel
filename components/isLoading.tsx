// components/isLoading.js
import React from 'react';
import Lottie from 'react-lottie';
import animationData from '@/public/Animation - 1721827394721 (1).json'; // Assurez-vous que le chemin est correct
import { motion } from 'framer-motion';

const IsLoading = () => {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	};

	return (
		<>
			<motion.div
				animate={{ opacity: [1, 0, 1] }}
				transition={{ duration: 10, repeat: Infinity }}
				className="text-xs text-red-300 mb-10 text-center"
			>
				{`Search and page change are only available on localhost. 
				Using the Vercel free plan, and the requests take more than 10 seconds.`}
			</motion.div>
			<Lottie options={defaultOptions} height={400} width={400} />
		</>
	);
};

export default IsLoading;
