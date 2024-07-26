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
import { Character } from '@/type';
import IsLoading from '@/components/isLoading';
import { useDebounce } from '@/hooks/use-debounce';
import Heading from '@/components/heading';
import WaterDropCards from '@/components/water-drop-cards-characters';
import SearchBar from '@/components/search-bar';
import CustomPagination from '@/components/custom-pagination';

const CharactersPage = () => {
	// loading
	const [isLoading, setIsLoading] = useState(true);

	// fetch data
	const [data, setData] = useState<Character[]>([]);

	// Manage research
	const [name, setName] = useState('');
	const debounceName = useDebounce<string>(name, 500);
	const onNameChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		setName(e.target.value);
	};

	// Manage page
	const [page, setPage] = useState(1);
	const [inputPage, setInputPage] = useState<string>('1');
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
					`${process.env.NEXT_PUBLIC_API_URL}/characters?page=${page}&name=${debounceName}`
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
	}, [page, debounceName]);

	return (
		<section>
			<Heading
				title1="Mavel Universe"
				title2="Characters"
				title3="Catalog"
				title4="Click a Card to Dive Deeper into Your Favorite Character!"
			/>

			<SearchBar
				title="Search a character"
				placeholder="Which character do you want?"
				onTitleChange={onNameChange}
			/>

			{isLoading && <IsLoading />}

			<WaterDropCards items={data} />

			<CustomPagination
				handleInputChange={handleInputChange}
				handleKeyDown={handleKeyDown}
				handleNext={handleNext}
				handlePrevious={handlePrevious}
				handleInputSubmit={handleInputSubmit}
				page={page}
				totalPages={totalPages}
				updatePage={updatePage}
			/>
		</section>
	);
};

export default CharactersPage;
