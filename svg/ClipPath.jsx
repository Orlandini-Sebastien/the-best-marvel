const ClipPath = () => {
	return (
		<svg width="0" height="0">
			<defs>
				<clipPath id="drop">
					<path
						transform="rotate(180 300 300)"
						d="M300,90 C210,90 150,180 150,270 C150,360 300,540 300,540 C300,540 450,360 450,270 C450,180 390,90 300,90 Z"
					/>
				</clipPath>
			</defs>
		</svg>
	);
};

export default ClipPath;
