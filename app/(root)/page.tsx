'use client';

import { HoverBorderGradient } from '@/components/ui/hover-border-gradient';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Home = () => {
	const router = useRouter();
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		if (router) {
			setIsReady(true);
		}
	}, [router]);

	return (
		<section className="flex flex-col justify-center gap-10 p-10 w-full h-full max-w-7xl m-auto">
			<h1 className="h1 flex justify-center ">Marvel Universe </h1>
			<h1 className="h1 flex justify-center">Front-End Design Explorer</h1>
			<p className="h5 px-20 text-center py-10">
				{`	This is a front-end design application for experimenting with different
				types of presentations using various themes from the Marvel universe.
				One presentation showcases the Comics with a card that has a 3D effect.
				Another presentation draws inspiration mainly from the Characters,
				featuring cards with larger images for the series. There's also a truly
				smooth effect for the events. Dive in and explore the Marvel universe in
				a whole new way!`}
			</p>
			<div className="flex gap-4 ">
				{isReady && (
					<div className="flex w-full justify-around">
						<HoverBorderGradient
							onClick={() => router.push('/comics')}
							containerClassName="rounded-full"
							as="button"
							className="p-4 dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
						>
							<span>Comics</span>
						</HoverBorderGradient>

						<HoverBorderGradient
							onClick={() => router.push('/characters')}
							containerClassName="rounded-full"
							as="button"
							className="p-4 dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
						>
							<span>Characters</span>
						</HoverBorderGradient>

						<HoverBorderGradient
							onClick={() => router.push('/creators')}
							containerClassName="rounded-full"
							as="button"
							className="p-4 dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
						>
							<span>Creators</span>
						</HoverBorderGradient>

						<HoverBorderGradient
							onClick={() => router.push('/series')}
							containerClassName="rounded-full"
							as="button"
							className="p-4 dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
						>
							<span>Series</span>
						</HoverBorderGradient>

						<HoverBorderGradient
							onClick={() => router.push('/events')}
							containerClassName="rounded-full"
							as="button"
							className="p-4 dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2"
						>
							<span>Events</span>
						</HoverBorderGradient>
					</div>
				)}
			</div>
		</section>
	);
};

export default Home;
