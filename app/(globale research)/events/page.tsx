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
import { Event } from '@/type';
import { ModeToggle } from '@/components/mode-toggle';
import { useDebounce } from '@/hooks/use-debounce';
import Heading from '@/components/heading';
import { motion } from 'framer-motion';
import SearchBar from '@/components/search-bar';
import CustomPagination from '@/components/custom-pagination';
import { LayoutGrid } from '@/components/layout-grid-events';

const EventsPage = () => {
	// fetch data
	const [data, setData] = useState<Event[]>([]);
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
					`${process.env.NEXT_PUBLIC_API_URL}/events?page=${page}&title=${debounceTitle}`
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

	const Skeleton = ({ event }: { event: Event }) => {
		return (
			<div>
				<p className="font-bold md:text-4xl text-xl text-white">
					{event.title}
				</p>
				<p className="font-normal text-base text-white">{event.description}</p>
				<p className="font-normal text-base my-4 max-w-lg text-neutral-200">
					{event.start && new Date(event.start).toLocaleString()}
				</p>
				<p className="font-normal text-base my-4 max-w-lg text-neutral-200">
					{event.end && new Date(event.end).toLocaleString()}
				</p>
			</div>
		);
	};

	const getClassName = (index: number) => {
		const classes = [
			'md:col-span-2 h-[200px] ',
			'col-span-1 h-[200px] ',
			'col-span-1 h-[200px] ',
			'md:col-span-2 h-[200px] ',
		];
		return classes[index % classes.length];
	};

	const cards = data.map((event, index) => ({
		index: index,
		id: event.id,
		content: <Skeleton key={event.id} event={event} />,
		className: getClassName(index),
		thumbnail: `${event.thumbnail.path}.${event.thumbnail.extension}`,
	}));

	return (
		<section>
			<div className="flex justify-between">
				<ModeToggle />
			</div>

			<Heading
				title1="Mavel Univers"
				title2="Events"
				title3="List"
				title4="Click a Card to Dive Deeper into an Event !"
			/>

			<SearchBar
				title="Search an Event"
				placeholder="Which event do you research ?"
				onTitleChange={onTitleChange}
			/>

			{isLoading ? (
				<div>Loading...</div>
			) : (
				<div className="h-screen py-20 w-full">
					<LayoutGrid cards={cards} />
				</div>
			)}

			{!isLoading && <div className="h-[1500px] max-md:h-[3700px]" />}

			{isLoading && (
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: [20, -5, 0] }}
					transition={{ delay: 0.5, duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
					className="text-foreground flex justify-center items-center h-1/2 w-full"
				>
					is Loading...
				</motion.div>
			)}

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

export default EventsPage;
