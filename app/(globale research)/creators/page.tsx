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
import { Creator } from '@/type';
import { useDebounce } from '@/hooks/use-debounce';
import Heading from '@/components/heading';
import SearchBar from '@/components/search-bar';
import CustomPagination from '@/components/custom-pagination';
import Link from 'next/link';
import Image from 'next/image';
import IsLoading from '@/components/isLoading';

const CreatorsPage = () => {
	// fetch data
	const [data, setData] = useState<Creator[]>([]);
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
					`${process.env.NEXT_PUBLIC_API_URL}/creators?page=${page}&firstName=${debounceTitle}`
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
				title1="Mavel Universe"
				title2="Creator"
				title3="List"
				title4="Click a Card to Dive Deeper into Your Favorite Creator!"
			/>

			<SearchBar
				title="Search a Creator"
				placeholder="Which Creator do you search ?"
				onTitleChange={onTitleChange}
			/>

			<div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-4">
				{data.map((story) => (
					<Link
						href={'stories/' + story?.id.toString()}
						key={story.id}
						className="border p-4 "
					>
						<div>{story.firstName}</div>
						<Image
							src={story.thumbnail.path + '.' + story.thumbnail.extension}
							alt={story.firstName}
							width={50}
							height={50}
						/>
					</Link>
				))}
			</div>

			{isLoading && <IsLoading />}

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

export default CreatorsPage;
