'use client';

import { motion } from 'framer-motion';
import React from 'react';
import { HeroHighlight, Highlight } from './ui/hero-hightlight';
import { TextGenerateEffect } from './ui/text-generate-effect';

interface HeadingProps {
	title1: string;
	title2: string;
	title3: string;
	title4: string;
}

const Heading: React.FC<HeadingProps> = ({
	title1,
	title2,
	title3,
	title4,
}) => {
	return (
		<>
		
			<HeroHighlight>
				<motion.h1
					initial={{
						opacity: 0,
						y: 20,
					}}
					animate={{
						opacity: 1,
						y: [20, -5, 0],
					}}
					transition={{
						duration: 0.5,
						ease: [0.4, 0.0, 0.2, 1],
					}}
					className="px-4 h2 md:h1 font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto w-9/12 "
				>
					{title1} {' '}
					<Highlight className="text-primary">{title2}</Highlight>
					{' '} {title3}{' '}
					<TextGenerateEffect
						words={title4}
						className="h4 text-neutral-700/80 dark:text-white/80"
					/>
				</motion.h1>
			</HeroHighlight>
		</>
	);
};

export default Heading;
