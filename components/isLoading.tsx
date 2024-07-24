// components/isLoading.js
import React from 'react';
import Lottie from 'react-lottie';
import animationData from '@/public/Animation - 1721827394721 (1).json'; // Assurez-vous que le chemin est correct

const IsLoading = () => {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: animationData,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	};

	return <Lottie options={defaultOptions} height={400} width={400} />;
};

export default IsLoading;
