import React from 'react';
import { TextGenerateEffect } from './ui/text-generate-effect';

const HomeDescription = () => {
	return (
		<TextGenerateEffect
			words={`Get ready to dive into the Marvel universe with this 
            exciting front-end design app ! Enjoy Comics with cool 3D effect cards, 
            admire Characters with bold series images, and experience a smooth 
            flow for Events !`}
			className="max-md:hidden h5 px-10 text-center opacity-70 h-[23vh] min-h-40"
		/>
	);
};

export default HomeDescription;
