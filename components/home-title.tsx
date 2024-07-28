import React from 'react';
import { motion } from 'framer-motion';

const HomeTitle = () => {
	const textVariant = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
	};
	return (
		<h1 className="border-2  flex flex-col justify-end max-md:h-[33vh] md:h-[37vh]">
			<motion.h1
				initial="hidden"
				animate="visible"
				variants={textVariant}
				transition={{ duration: 0.8, ease: 'easeOut' }}
				className="h1 flex justify-center items-center z-40 text-shadow text-outline text-shadow "
			>
				Marvel Universe{' '}
			</motion.h1>
			<motion.h1
				initial="hidden"
				animate="visible"
				variants={textVariant}
				transition={{ delay: 0.5, duration: 0.8, ease: 'easeOut' }}
				className="h1 flex justify-center items-center text-center z-40 text-shadow text-outline drop-shadow-2xl"
			>
				Front-End Design Explorer
			</motion.h1>
		</h1>
	);
};

export default HomeTitle;
