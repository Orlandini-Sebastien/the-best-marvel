'use client';

import axios from 'axios';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { Character, Comic } from '@/type';
import { HoverEffect } from '@/components/card-hover-effect-3d-comics';
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';
import WaterDropCards from '@/components/water-drop-cards-characters';

const ComicIdPage = () => {
	const params = useParams();

	// fetch data
	const [dataCharacter, setDataCharacter] = useState<Character[]>([]);
	const [dataComics, setDataComics] = useState<Comic[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`${process.env.NEXT_PUBLIC_API_URL}/characters/${params.characterId}`
				);
				// setData(response.data.data.results[0]);
				console.log(response.data);
				setDataCharacter(response.data.characters.data.results);
				setDataComics(response.data.comic.data.results);
			} catch (error) {
				toast.error('Something went wrong!');
			}
		};
		fetchData();
	}, []);

	return (
		<div className="w-full flex flex-col justify-center items-center">
			<div className="h1">The character</div>

			<WaterDropCards items={dataCharacter} />

			<div className="h1">Characters featured in this comic</div>

			<div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
				<InfiniteMovingCards
					items={dataComics}
					direction="right"
					speed="slow"
				/>
			</div>
		</div>
	);
};

export default ComicIdPage;
