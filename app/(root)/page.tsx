'use client';

import React from 'react';
import { Spotlight } from '@/components/ui/spotlight';
import HomeTitle from '@/components/home-title';
import HomeCanvas from '@/components/home-canvas';
import HomeDescription from '@/components/home-description';
import HomeNav from '@/components/home-nav';

const Home = () => {
	return (
		<section
			className="bg-cover bg-center bg-no-repeat  h-[100vh]"
			style={{ backgroundImage: `url(/wallpaper.webp)` }}
		>
			<section className="flex flex-col m-auto w-full max-w-7xl h-[100vh]  border border-red-500 ">
				<Spotlight
					className="-top-40 left-0 md:left-60 md:-top-20"
					fill="white"
				/>
				<HomeTitle />
				<HomeCanvas />
				<HomeDescription />
				<HomeNav />
			</section>
		</section>
	);
};

export default Home;
