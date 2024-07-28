'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
	motion,
	useTransform,
	AnimatePresence,
	useMotionValue,
	useSpring,
} from 'framer-motion';
import { ScrollParallax } from 'react-just-parallax';
import { Character } from '@/type';

import ClipPath from '@/svg/ClipPath';
import GradienBorderSVG from '@/svg/GradientBorderSVG';
import BackgroundLight from '@/design/gradient-light';
import Link from 'next/link';
import { GlareCard } from './ui/glare-card';

interface WaterDropCardsProps {
	items: Character[];
}

const WaterDropCards: React.FC<WaterDropCardsProps> = ({ items }) => {
	const [scrollY, setScrollY] = useState(0);

	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	const springConfig = { stiffness: 100, damping: 5 };
	const x = useMotionValue(0);
	const rotate = useSpring(
		useTransform(x, [-100, 100], [-45, 45]),
		springConfig
	);
	const translateX = useSpring(
		useTransform(x, [-100, 100], [-50, 50]),
		springConfig
	);

	const handleMouseMove = (event: any) => {
		const halfWidth = event.target.offsetWidth / 2;
		x.set(event.nativeEvent.offsetX - halfWidth);
	};

	useEffect(() => {
		const handleScroll = () => {
			setScrollY(window.scrollY);
		};

		window.addEventListener('scroll', handleScroll);
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	const springConfig2 = { stiffness: 100, damping: 5 };
	const x2 = useMotionValue(0);
	const rotate2 = useSpring(
		useTransform(x, [-100, 100], [-45, 45]),
		springConfig
	);
	const translateX2 = useSpring(
		useTransform(x, [-100, 100], [-50, 50]),
		springConfig
	);

	const oscillation = {
		initial: { opacity: 1, x: 0, scale: 1 },
		animate: () => ({
			opacity: 1,
			x: [-20, 20, -20], // Oscillation de gauche à droite
			scale: 1,
			transition: {
				type: 'spring',
				stiffness: 260,
				damping: 10,
				repeat: Infinity,
				repeatType: 'reverse' as const,
				duration: 0.5,
				delay: 0.1,
			},
		}),
	};

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 justify-items-center pt-40 pb-40 overflow-hidden max-md:-my-40">
			{items.map((item) => (
				<Link
					href={'characters/' + item?.id.toString()}
					key={item.id}
					className="relative w-[600px] h-[600px] group"
				>
					<ScrollParallax strength={0.1 + Math.random() * 0.2}>
						<div className="relative w-[600px] h-[600px] top-0 left-0 flex justify-center items-center -z-30 max-md:scale-75 ">
							<GradienBorderSVG />
							<ClipPath />
							{/* La div contenant l'image ou le GlareCard */}

							{item.thumbnail.path !==
								'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available' && (
								<div className="max-md:flex absolute right-1/5 top-20 opacity-70 w-full max-w-xs hidden flex-col items-center justify-center rounded-md bg-primary-foreground z-50 shadow-xl px-4 py-2">
									<div className="font-bold text-primary text-lg">
										{item.name}
									</div>
									<div className="text-primary text-sm overflow-hidden break-words line-clamp-4">
										{item.description}
									</div>
								</div>
							)}

							<div className="absolute  w-[600px] h-[600px]">
								<div
									className="absolute inset-0"
									style={{ clipPath: 'url(#drop)' }}
								>
									{item.thumbnail.path !==
									'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available' ? (
										<Image
											className="absolute inset-0 object-cover w-full h-full"
											src={item.thumbnail.path + '.' + item.thumbnail.extension}
											alt={item.name}
											layout="fill"
											onMouseMove={handleMouseMove}
											onMouseEnter={() => setHoveredIndex(item.id)}
											onMouseLeave={() => setHoveredIndex(null)}
										/>
									) : (
										<div className="absolute inset-0 flex justify-center items-center max-md:scale-[200%] scale-150 antialiased">
											<GlareCard className="flex flex-col justify-center items-center bg-red-900 w-full h-full">
												<div className="text-center w-1/2 font-bold">
													{item.name}
												</div>
												<div className="text-center w-1/2 text-xs line-clamp-5">
													{item.description}
												</div>
											</GlareCard>
										</div>
									)}
								</div>
							</div>
						</div>
						{Number(item.id) % 2 === 0 && (
							<div className="absolute max-md:w-[300px] max-md:h-[300px]  w-[400px] h-[400px] top-10  left-20 -z-40 flex justify-center items-center">
								<BackgroundLight />
							</div>
						)}

						<AnimatePresence>
							{hoveredIndex === item.id && (
								<>
									<motion.div
										initial={{ opacity: 0, y: 20, scale: 0.6 }}
										animate={{
											opacity: 1,
											y: 0,
											scale: 1,
											transition: {
												type: 'spring',
												stiffness: 260,
												damping: 10,
											},
										}}
										exit={{ opacity: 0, y: 20, scale: 0.6 }}
										style={{
											translateX: translateX,
											rotate: rotate,
										}}
										className="max-md:hidden absolute right-32 top-4 w-full max-w-xs flex flex-col items-center justify-center rounded-md bg-primary-foreground z-50 shadow-xl px-4 py-2"
									>
										<div className="font-bold text-primary text-lg">
											{item.name}
										</div>
										<div className="text-primary text-sm overflow-hidden break-words line-clamp-4">
											{item.description}
										</div>
									</motion.div>
								</>
							)}
						</AnimatePresence>
					</ScrollParallax>
				</Link>
			))}
		</div>
	);
};

export default WaterDropCards;
