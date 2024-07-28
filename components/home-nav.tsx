'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { HoverBorderGradient } from './ui/hover-border-gradient';
import { useRouter } from 'next/navigation';
const HomeNav = () => {
	const router = useRouter();
	const textVariant = {
		hidden: { opacity: 0, y: 20 },
		visible: { opacity: 1, y: 0 },
	};
	return (
		<motion.div
			initial="hidden"
			animate="visible"
			variants={textVariant}
			transition={{
				delay: 1.5,
				duration: 0.8,
				ease: 'easeOut',
				staggerChildren: 0.2,
			}}
			className="flex max-md:h-[33vh]  h-[17vh] max-md:flex-col max-md:w-[40vw] md:w-[70vw] self-center"
		>
			<div className="flex w-full justify-around max-md:p-1">
				<HoverBorderGradient
					onClick={() => router.push('/comics')}
					containerClassName="rounded-full"
					as="button"
					className="p-4 dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 text-shadow min-w-24 max-md:w-[17vw] md:w-[15vw] justify-center"
				>
					<span>Comics</span>
				</HoverBorderGradient>

				<HoverBorderGradient
					onClick={() => router.push('/characters')}
					containerClassName="rounded-full"
					as="button"
					className="p-4 dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 text-shadow min-w-24 max-md:w-[17vw] md:w-[15vw] justify-center"
				>
					<span>Characters</span>
				</HoverBorderGradient>
			</div>
			<div className="flex w-full justify-around max-md:p-1">
				{/* <HoverBorderGradient
							onClick={() => router.push('/creators')}
							containerClassName="rounded-full"
							as="button"
							className="p-4 dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 text-shadow w-40 justify-center"
						>
							<span>Creators</span>
						</HoverBorderGradient> */}

				<HoverBorderGradient
					onClick={() => router.push('/series')}
					containerClassName="rounded-full"
					as="button"
					className="p-4 dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 text-shadow min-w-24 max-md:w-[17vw] md:w-[15vw] justify-center"
				>
					<span>Series</span>
				</HoverBorderGradient>

				<HoverBorderGradient
					onClick={() => router.push('/events')}
					containerClassName="rounded-full"
					as="button"
					className="p-4 dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 text-shadow min-w-24 max-md:w-[17vw] md:w-[15vw] justify-center"
				>
					<span>Events</span>
				</HoverBorderGradient>
			</div>
		</motion.div>
	);
};

export default HomeNav;
