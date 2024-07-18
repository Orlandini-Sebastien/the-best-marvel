'use client';

import React, { useState } from 'react';
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

interface WaterDropCardsProps {
	items: Character[];
}

const WaterDropCards: React.FC<WaterDropCardsProps> = ({ items }) => {
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

	// Fonction pour diviser les éléments en lignes de 3, 2, et 1 colonnes selon la taille de l'écran
	const getRows = (items: Character[], isMediumScreen: boolean) => {
		const rows: Character[][] = [];
		let i = 0;
		while (i < items.length) {
			if (isMediumScreen) {
				if (i % 3 < 2) {
					// Ajouter une ligne de 2 éléments
					rows.push(items.slice(i, i + 2));
					i += 2;
				} else {
					// Ajouter une ligne de 1 élément
					rows.push(items.slice(i, i + 1));
					i += 1;
				}
			} else {
				if (i % 5 < 3) {
					// Ajouter une ligne de 3 éléments
					rows.push(items.slice(i, i + 3));
					i += 3;
				} else {
					// Ajouter une ligne de 2 éléments
					rows.push(items.slice(i, i + 2));
					i += 2;
				}
			}
		}
		return rows;
	};

	const [isMediumScreen, setIsMediumScreen] = useState(false);

	// Détecter la taille de l'écran pour changer la disposition
	React.useEffect(() => {
		const handleResize = () => {
			setIsMediumScreen(window.innerWidth >= 768 && window.innerWidth < 1280);
		};

		handleResize(); // Vérifiez une fois au montage
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const rows = getRows(items, isMediumScreen);

	return (
		<div className="flex  justify-center items-center flex-col space-y-4">
			{rows.map((row, rowIndex) => (
				<div
					key={rowIndex}
					className={`grid gap-4 justify-center items-center  ${
						row.length === 3
							? 'grid-cols-3'
							: row.length === 2
							? 'grid-cols-2'
							: 'grid-cols-1'
					} max-xl:grid-cols-2 max-xl:flex max-lg:grid-cols-1`}
				>
					{row.map((item) => (
						<ScrollParallax key={item.id} strength={0.1 + Math.random() * 0.2}>
							{/* Image avec clipPath et avec une bordure SVG */}
							<div className="relative w-[600px] group flex justify-center items-center">
								<ClipPath />
								{/* L'image */}
								<div
									className="absolute top-0 left-0"
									style={{ clipPath: 'url(#drop)' }}
									onMouseEnter={() => setHoveredIndex(item.id)}
									onMouseLeave={() => setHoveredIndex(null)}
								>
									<div className="w-[600px] h-[600px]">
										<Image
											className="object-cover p-16"
											src={item.thumbnail.path + '.' + item.thumbnail.extension}
											alt={item.name}
											fill
											onMouseMove={handleMouseMove}
										/>
									</div>
								</div>
								{/* La bordure */}
								<div className="w-[600px]">
									<GradienBorderSVG />
								</div>
								<div className="w-[600px] absolute top-0 left-0 -z-10">
									<BackgroundLight />
								</div>

								<AnimatePresence>
									{hoveredIndex === item.id && (
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
											className="absolute -top-10 w-96 flex flex-col items-center justify-center rounded-md bg-primary-foreground z-50 shadow-xl px-4 py-2"
										>
											<div className="font-bold text-primary h3">
												{item.name}
											</div>
											<div className="text-primary h6 overflow-hidden break-words line-clamp-4">
												{item.description}
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</div>
						</ScrollParallax>
					))}
				</div>
			))}
		</div>
	);
};

export default WaterDropCards;
