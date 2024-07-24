'use client';

import axios from 'axios';
import toast from 'react-hot-toast';
import {
	useEffect,
	useState,
	ChangeEvent,
	ChangeEventHandler,
	KeyboardEventHandler,
} from 'react';

import { motion } from 'framer-motion';
import { Comic } from '@/type';
import { HoverEffect } from '@/components/card-hover-effect-3d-comics';
import { ModeToggle } from '@/components/mode-toggle';

import { useDebounce } from '@/hooks/use-debounce';
import Heading from '@/components/heading';
import SearchBar from '@/components/search-bar';
import CustomPagination from '@/components/custom-pagination';

const ComicsPage = () => {
	// fetch data
	const [data, setData] = useState<Comic[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [inputPage, setInputPage] = useState<string>('1');

	// Manage research
	const [title, setTitle] = useState('');
	const debounceTitle = useDebounce<string>(title, 500);
	const onTitleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		setTitle(e.target.value);
	};

	// Manage page
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(6000);
	const updatePage = (newPage: number) => {
		setPage(newPage);
		setInputPage(newPage.toString());
	};

	const handlePrevious = () => {
		if (page > 1) {
			updatePage(page - 1);
		}
	};

	const handleNext = () => {
		if (page < totalPages) {
			updatePage(page + 1);
		}
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInputPage(e.target.value);
	};

	const handleInputSubmit = () => {
		const newPage = parseInt(inputPage);
		if (!isNaN(newPage) && newPage > 0 && newPage <= totalPages) {
			updatePage(newPage);
			setInputPage('');
		} else {
			toast.error('Invalid page number');
		}
	};

	const handleKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
		if (e.key === 'Enter') {
			handleInputSubmit();
		}
	};

	useEffect(() => {
		setIsLoading(true);
		const fetchData = async () => {
			try {
				const response = await axios.get(
					`${process.env.NEXT_PUBLIC_API_URL}/comics?page=${page}&title=${debounceTitle}`
				);
				setData(response.data.data.results);

				const totalResults = response.data.data.total;
				const offset = 20;
				const calculatedTotalPages = Math.ceil(totalResults / offset);
				setTotalPages(calculatedTotalPages);
				setIsLoading(false);
				console.log(response.data.data.results);
			} catch (error) {
				toast.error('Something went wrong!');
			}
		};
		fetchData();
	}, [page, debounceTitle]);

	return (
		<section>
			<Heading
				title1="Mavel Univers"
				title2="Comics"
				title3="Catalog"
				title4="Click a Card to Dive Deeper into Your Favorite Comic!"
			/>
			<SearchBar
				title="Search a comic"
				placeholder="What comic do you want ?"
				onTitleChange={onTitleChange}
			/>
			{isLoading && (
				<motion.div
					initial={{
						opacity: 0,
						y: 20,
					}}
					animate={{
						opacity: 1,
						y: [20, -5, 0],
					}}
					transition={{
						delay: 0.5,
						duration: 0.5,
						ease: [0.4, 0.0, 0.2, 1],
					}}
					className="text-foreground flex justify-center items-center h-1/2 w-full"
				>
					is Loading...
				</motion.div>
			)}
			<HoverEffect items={data} />
			<CustomPagination
				handleInputChange={handleInputChange}
				handleKeyDown={handleKeyDown}
				handleInputSubmit={handleInputSubmit}
				updatePage={updatePage}
				handleNext={handleNext}
				handlePrevious={handlePrevious}
				page={page}
				totalPages={totalPages}
			/>
		</section>
	);
};

export default ComicsPage;
