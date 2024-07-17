import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { CardContainer, CardBody, CardItem } from './3d-card';

export const HoverEffect = ({
	items,
	className,
}: {
	items: {
		id: string;
		title: string;
		description: string;
		images: {
			path: string;
			extension: string;
		}[];
	}[];
	className?: string;
}) => {
	let [hoveredIndex, setHoveredIndex] = useState<string | null>(null);

	return (
		<div
			className={cn(
				'grid grid-cols-1 lg:grid-cols-2  min-[1330px]:grid-cols-3 gap-4 ',
				className
			)}
		>
			{items.map((item) => (
				<Link
					href={'comics/' + item?.id.toString()}
					key={item?.id}
					className="relative group block h-full w-full p-2 py-4 "
					onMouseEnter={() => setHoveredIndex(item?.id)}
					onMouseLeave={() => setHoveredIndex(null)}
				>
					<CardContainer className="">
						<CardBody>
							<AnimatePresence>
								{hoveredIndex === item?.id && (
									<motion.span
										className="absolute inset-0 h-full w-full blur-lg opacity-60 rounded-3xl"
										style={{
											background:
												'radial-gradient(circle, rgba(255,0,0,1) 0%, rgba(255,200,200,1) 50%, rgba(255,0,0,1) 100%)',
										}}
										layoutId="hoverBackground"
										initial={{ opacity: 0 }}
										animate={{
											opacity: 1,
											transition: { duration: 0.2 },
										}}
										exit={{
											opacity: 0,
											transition: { duration: 0.2, delay: 0.2 },
										}}
									/>
								)}
							</AnimatePresence>

							{/* Ajout d'un element de design  */}

							<Card>
								<CardContainer>
									<CardBody className="flex flex-col items-center p-4 space-y-4">
										{item.images[0] && (
											<CardItem
												className="relative  flex justify-center"
												translateZ={120}
											>
												<motion.div
													className="flex justify-center"
													initial={{ y: 0 }}
													animate={
														hoveredIndex === item?.id ? { y: -20 } : { y: 0 }
													}
													transition={{ duration: 0.3 }}
												>
													<Image
														className="object-cover w-3/4 aspect-square"
														src={
															item?.images[0]?.path +
															'.' +
															item?.images[0]?.extension
														}
														width={300}
														height={300}
														alt="image"
													/>
												</motion.div>
											</CardItem>
										)}
										<CardItem
											className="relative flex justify-center text-center "
											translateZ={200}
										>
											<motion.div
												className="flex justify-center items-center"
												initial={{ y: 0 }}
												animate={
													hoveredIndex === item?.id ? { y: -20 } : { y: 0 }
												}
												transition={{ duration: 0.3 }}
											>
												<CardTitle>{item.title}</CardTitle>
											</motion.div>
										</CardItem>
									</CardBody>
								</CardContainer>
							</Card>
						</CardBody>
					</CardContainer>
				</Link>
			))}
		</div>
	);
};

export const Card = ({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) => {
	return (
		<div
			className={cn(
				'flex justify-center items-center rounded-2xl h-full w-fulloverflow-visible bg-secondary/80 border border-secondary-foreground group-hover:border-secondary relative z-20',
				className
			)}
		>
			<div className="relative flex justify-center items-center z-50">
				<div className="flex justify-center items-center flex-col ">
					{children}
				</div>
			</div>
		</div>
	);
};

export const CardTitle = ({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) => {
	// Vérifier la longueur du titre
	const title = typeof children === 'string' ? children : '';
	const words = title.split(' ');
	const truncatedTitle =
		words.length > 10 ? words.slice(0, 10).join(' ') + '...' : title;

	return (
		<h4
			className={cn('text-card-foreground font-bold tracking-wide', className)}
			style={{
				display: '-webkit-box',
				WebkitLineClamp: 2,
				WebkitBoxOrient: 'vertical',
				overflow: 'hidden',
				textOverflow: 'ellipsis',
			}}
		>
			{truncatedTitle}
		</h4>
	);
};

export const CardDescription = ({
	className,
	children,
}: {
	className?: string;
	children: React.ReactNode;
}) => {
	return (
		<p
			className={cn(
				'mt-8 text-card-foreground tracking-wide leading-relaxed text-sm',
				className
			)}
		>
			{children}
		</p>
	);
};
