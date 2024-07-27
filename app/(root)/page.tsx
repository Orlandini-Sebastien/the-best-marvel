'use client';

import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';
import { useRouter } from 'next/navigation';
import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stage } from '@react-three/drei';
import { Model } from '@/components/model';
import { Spotlight } from '@/components/ui/spotlight';
import { motion } from 'framer-motion';
import { TextGenerateEffect } from '@/components/ui/text-generate-effect';

const textVariant = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0 },
};

const Home = () => {
	const router = useRouter();
	return (
		<section
			className="bg-cover bg-center bg-no-repeat h-[100vh] flex"
			style={{ backgroundImage: `url(/wallpaper.webp)` }}
		>
			<section className="flex flex-col m-auto justify-between gap-10 p-10 w-full max-w-7xl h-[75vh]">
				<Spotlight
					className="-top-40 left-0 md:left-60 md:-top-20"
					fill="white"
				/>
				<h1>
					<motion.h1
						initial="hidden"
						animate="visible"
						variants={textVariant}
						transition={{ duration: 0.8, ease: 'easeOut' }}
						className="h1 flex justify-center items-center z-40 text-shadow text-outline text-shadow  "
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

				<section className="h-96 -mt-32 -mb-40">
					<Canvas
						shadows
						dpr={[1, 2]}
						camera={{ fov: 50, position: [0, 0, 5] }}
					>
						<Suspense fallback={null}>
							<Stage preset="rembrandt" intensity={1} environment="city">
								<Model />
							</Stage>
						</Suspense>
						<OrbitControls autoRotate enableZoom={false} />
					</Canvas>
				</section>
				<TextGenerateEffect
					words={`	This is a front-end design application for experimenting with different
						types of presentations using various themes from the Marvel universe.
						One presentation showcases the Comics with a card that has a 3D effect.
						Another presentation draws inspiration mainly from the Characters,
						featuring cards with larger images for the series. There's also a truly
						smooth effect for the events. Dive in and explore the Marvel universe in
						a whole new way!`}
					className="max-md:hidden h5 px-10 text-center  opacity-70"
				/>

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
					className="flex max-xl:flex-col justify-around"
				>
					<div className="flex w-full justify-around max-md:py-5 max-md:px-20  ">
						<HoverBorderGradient
							onClick={() => router.push('/comics')}
							containerClassName="rounded-full"
							as="button"
							className="p-4 dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 text-shadow w-40 justify-center"
						>
							<span>Comics</span>
						</HoverBorderGradient>

						<HoverBorderGradient
							onClick={() => router.push('/characters')}
							containerClassName="rounded-full"
							as="button"
							className="p-4 dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 text-shadow w-40 justify-center"
						>
							<span>Characters</span>
						</HoverBorderGradient>
					</div>
					<div className="flex w-full justify-around max-md:py-5 max-md:px-20">
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
							className="p-4 dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 text-shadow w-40 justify-center"
						>
							<span>Series</span>
						</HoverBorderGradient>

						<HoverBorderGradient
							onClick={() => router.push('/events')}
							containerClassName="rounded-full"
							as="button"
							className="p-4 dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 text-shadow w-40 justify-center"
						>
							<span>Events</span>
						</HoverBorderGradient>
					</div>
				</motion.div>
			</section>
		</section>
	);
};

export default Home;
