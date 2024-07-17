const BackgroundLight = () => {
	return (
		<div className="relative w-full aspect-square">
			{/* Conteneur pour l'effet de lumière */}
			<div className="absolute inset-0 radial-light border-2 border-red-400"></div>
		</div>
	);
};

export default BackgroundLight;
