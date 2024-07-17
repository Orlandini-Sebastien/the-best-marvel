import React from 'react';

const GradientBorderSVG = () => {
	return (
		<svg  viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
			<defs>
				{/* Dégradé linéaire de rouge */}
				<linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
					<stop offset="0%" style={{ stopColor: '#FF1B1B' }} />
					<stop offset="100%" style={{ stopColor: '#FFA2A2' }} />
				</linearGradient>
			</defs>

			{/* Chemin pour la bordure du dégradé */}
			<path
				transform="rotate(180 300 300)"
				d="M300,90 C210,90 150,180 150,270 C150,360 300,540 300,540 C300,540 450,360 450,270 C450,180 390,90 300,90 Z"
				stroke="url(#gradient)"
				strokeWidth="10"
			/>
		</svg>
	);
};

export default GradientBorderSVG;
