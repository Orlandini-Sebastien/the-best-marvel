'use client';

import { cn } from '@/lib/utils';
import { Character, Comic } from '@/type';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

export const InfiniteMovingCards = ({
	items,
	direction = 'left',
	speed = 'slow',
	pauseOnHover = true,
	className,
}: {
	items: (Character | Comic)[];
	direction?: 'left' | 'right';
	speed?: 'fast' | 'normal' | 'slow';
	pauseOnHover?: boolean;
	className?: string;
}) => {
	const containerRef = React.useRef<HTMLDivElement>(null);
	const scrollerRef = React.useRef<HTMLUListElement>(null);

	useEffect(() => {
		if (items.length > 2) {
			addAnimation();
		}
	}, [items]);

	const [start, setStart] = useState(false);

	function addAnimation() {
		if (containerRef.current && scrollerRef.current) {
			const scrollerContent = Array.from(scrollerRef.current.children);

			scrollerContent.forEach((item) => {
				const duplicatedItem = item.cloneNode(true);
				if (scrollerRef.current) {
					scrollerRef.current.appendChild(duplicatedItem);
				}
			});

			getDirection();
			getSpeed();
			setStart(true);
		}
	}

	const getDirection = () => {
		if (containerRef.current) {
			containerRef.current.style.setProperty(
				'--animation-direction',
				direction === 'left' ? 'forwards' : 'reverse'
			);
		}
	};

	const getSpeed = () => {
		if (containerRef.current) {
			containerRef.current.style.setProperty(
				'--animation-duration',
				speed === 'fast' ? '20s' : speed === 'normal' ? '40s' : '80s'
			);
		}
	};

	const isCharacter = (item: Character | Comic): item is Character => {
		return (item as Character).thumbnail !== undefined;
	};

	return (
		<div
			ref={containerRef}
			className={cn(
				'scroller relative z-20 max-w-7xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]',
				className
			)}
		>
			<ul
				ref={scrollerRef}
				className={cn(
					'flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap',
					items.length > 2 && start && 'animate-scroll',
					pauseOnHover && 'hover:[animation-play-state:paused]'
				)}
			>
				{items.map((item) => (
					<li
						className="w-[350px] max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 px-8 py-6 md:w-[450px]"
						style={{
							background:
								'linear-gradient(180deg, var(--slate-800), var(--slate-900))',
						}}
						key={item.id}
					>
						<blockquote>
							<div
								aria-hidden="true"
								className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
							></div>
							<span className="relative z-20 text-sm leading-[1.6] text-gray-100 font-normal">
								{isCharacter(item) ? (
									<Image
										src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
										width={400}
										height={500}
										alt={item.name}
									/>
								) : (
									<Image
										src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
										width={400}
										height={500}
										alt={item.title}
									/>
								)}
							</span>

							<div className="relative z-20 mt-6 flex flex-row items-center">
								<span className="flex flex-col gap-1">
									<span className="text-sm leading-[1.6] text-gray-400 font-normal">
										{isCharacter(item) ? item.name : item.title}
									</span>
									<span className="text-sm leading-[1.6] text-gray-400 font-normal">
										{item.description}
									</span>
								</span>
							</div>
						</blockquote>
					</li>
				))}
			</ul>
		</div>
	);
};
