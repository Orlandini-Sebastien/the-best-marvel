const BackgroundLight = () => {
	return (
		<div className="relative w-full aspect-square">
			{/* Conteneur pour l'effet de lumière */}
			<div className="absolute inset-0 radial-light"></div>
		</div>
	);
};

export default BackgroundLight;
