/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Author: pittham.b (https://sketchfab.com/pittham.b)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/marvel-logo-with-iron-man-blaster-inside-57b4bd4aa95f4943ae3bfa4a660197bb
Title: Marvel logo with Iron Man blaster inside
*/

import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export function Model(props) {
	const { nodes, materials } = useGLTF(
		'/marvel_logo_with_iron_man_blaster_inside.glb'
	);
	return (
		<group {...props} dispose={null} scale={[2, 2, 2]}>
			<group rotation={[0, 0, 0]}>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Object_2.geometry}
					material={materials['SVGMat.002']}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Object_3.geometry}
					material={materials['SVGMat.002']}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Object_4.geometry}
					material={materials['SVGMat.014']}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Object_5.geometry}
					material={materials['SVGMat.014']}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Object_6.geometry}
					material={materials['SVGMat.036']}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Object_7.geometry}
					material={materials['SVGMat.036']}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Object_8.geometry}
					material={materials['SVGMat.036']}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Object_9.geometry}
					material={materials['SVGMat.036']}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Object_10.geometry}
					material={materials['SVGMat.036']}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Object_11.geometry}
					material={materials['SVGMat.036']}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Object_12.geometry}
					material={materials['SVGMat.036']}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Object_13.geometry}
					material={materials['SVGMat.036']}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Object_14.geometry}
					material={materials['SVGMat.104']}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Object_15.geometry}
					material={materials['SVGMat.104']}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Object_16.geometry}
					material={materials['SVGMat.104']}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Object_17.geometry}
					material={materials['SVGMat.104']}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Object_18.geometry}
					material={materials['SVGMat.104']}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Object_19.geometry}
					material={materials['SVGMat.104']}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Object_20.geometry}
					material={materials['SVGMat.104']}
				/>
			</group>
		</group>
	);
}

useGLTF.preload('/marvel_logo_with_iron_man_blaster_inside.glb');
