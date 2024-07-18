'use client';

import { useRef, useState, MouseEvent } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Serie } from '@/type';
import { GlareCard } from './ui/glare-card';

interface DirectionAwareHoverProps {
	childrenClassName?: string;
	imageClassName?: string;
	className?: string;
	data: Serie[];
}

export const DirectionAwareHover = ({
	childrenClassName,
	imageClassName,
	className,
	data,
}: DirectionAwareHoverProps) => {
	const handleMouseEnter = (
		event: MouseEvent<HTMLDivElement>,
		ref: React.RefObject<HTMLDivElement>,
		setDirection: React.Dispatch<React.SetStateAction<string>>
	) => {
		if (!ref.current) return;

		const direction = getDirection(event, ref.current);
		console.log('direction', direction);
		switch (direction) {
			case 0:
				setDirection('top');
				break;
			case 1:
				setDirection('right');
				break;
			case 2:
				setDirection('bottom');
				break;
			case 3:
				setDirection('left');
				break;
			default:
				setDirection('left');
				break;
		}
	};

	const getDirection = (ev: MouseEvent<HTMLDivElement>, obj: HTMLElement) => {
		const { width: w, height: h, left, top } = obj.getBoundingClientRect();
		const x = ev.clientX - left - (w / 2) * (w > h ? h / w : 1);
		const y = ev.clientY - top - (h / 2) * (h > w ? w / h : 1);
		const d = Math.round(Math.atan2(y, x) / 1.57079633 + 5) % 4;
		return d;
	};

	return (
		<div className="grid self-center justify-center items-center grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 p-10">
			{data.map((serie) => {
				const ref = useRef<HTMLDivElement>(null);
				const [direction, setDirection] = useState<string>('left');

				return serie.thumbnail.path !==
					'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available' ? (
					<motion.div
						onMouseEnter={(e) => handleMouseEnter(e, ref, setDirection)}
						ref={ref}
						className={cn(
							'md:h-96 w-60 h-60 md:w-96 bg-transparent rounded-lg overflow-hidden group/card relative',
							className
						)}
						key={serie.id}
					>
						<AnimatePresence mode="wait">
							<motion.div
								className="relative h-full w-full"
								initial="initial"
								whileHover={direction}
								exit="exit"
							>
								<motion.div className="group-hover/card:block hidden absolute inset-0 w-full h-full bg-black/40 z-10 transition duration-500" />
								<motion.div
									variants={variants}
									className="h-full w-full relative bg-gray-50 dark:bg-black"
									transition={{
										duration: 0.2,
										ease: 'easeOut',
									}}
								>
									{' '}
									{serie.thumbnail.path !==
										'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available' && (
										<Image
											alt="image"
											className={cn(
												'h-full w-full object-cover scale-[1.15]',
												imageClassName
											)}
											width="1000"
											height="1000"
											src={
												serie.thumbnail.path + '.' + serie.thumbnail.extension
											}
										/>
									)}
								</motion.div>

								<motion.div
									variants={textVariants}
									transition={{
										duration: 0.5,
										ease: 'easeOut',
									}}
									className={cn(
										'text-white absolute top-4 left-4 z-40 max-h-[380px] overflow-y-scroll', // Ensure proper scroll with max height and padding
										childrenClassName
									)}
								>
									<div className="h5">{serie.title}</div>
									<div className="h6">{serie.description}</div>
								</motion.div>
							</motion.div>
						</AnimatePresence>
					</motion.div>
				) : (
					<GlareCard className="text-white absolute w-full h-full  left-1/2 transform -translate-x-1/2 z-40 justify-center items-start flex gap-4 p-4">
						<div className="h5">{serie.title}</div>
						<div className="h6">{serie.description}</div>
					</GlareCard>
				);
			})}
		</div>
	);
};

const variants = {
	initial: {
		x: 0,
	},
	exit: {
		x: 0,
		y: 0,
	},
	top: {
		y: 20,
	},
	bottom: {
		y: -20,
	},
	left: {
		x: 20,
	},
	right: {
		x: -20,
	},
};

const textVariants = {
	initial: {
		y: 0,
		x: 0,
		opacity: 0,
	},
	exit: {
		y: 0,
		x: 0,
		opacity: 0,
	},
	top: {
		y: -20,
		opacity: 1,
	},
	bottom: {
		y: 2,
		opacity: 1,
	},
	left: {
		x: -2,
		opacity: 1,
	},
	right: {
		x: 20,
		opacity: 1,
	},
};
