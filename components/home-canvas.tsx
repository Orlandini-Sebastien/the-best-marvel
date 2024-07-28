'use client';

import { OrbitControls, Stage } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { Suspense } from 'react';
import { Model } from './model';

const HomeCanvas = () => {
	return (
		<section className="max-md:h-[33vh] md:h-[33vh] -my-[5vh] border-2 border-red-500  min-h-60">
			<Canvas shadows dpr={[1, 2]} camera={{ fov: 50, position: [0, 0, 5] }}>
				<Suspense fallback={null}>
					<Stage preset="rembrandt" intensity={1} environment="city">
						<Model />
					</Stage>
				</Suspense>
				<OrbitControls autoRotate enableZoom={false} />
			</Canvas>
		</section>
	);
};

export default HomeCanvas;
