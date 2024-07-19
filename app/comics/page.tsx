'use client';

import axios from 'axios';
import toast from 'react-hot-toast';
import { useEffect, useState, ChangeEvent, ChangeEventHandler } from 'react';
import { Search, StickyNote } from 'lucide-react';

import { Comic } from '@/type';
import { HoverEffect } from '@/components/card-hover-effect-3d-comics';
import { ModeToggle } from '@/components/mode-toggle';
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';
import { Input } from '@/components/ui/input';
import { useDebounce } from '@/hooks/use-debounce';
import Heading from '@/components/heading';
import SearchBar from '@/components/search-bar';

const ComicsPage = () => {
	// fetch data
	const [data, setData] = useState<Comic[]>([]);

	// Manage research
	const [title, setTitle] = useState('');
	const debounceTitle = useDebounce<string>(title, 500);
	const onTitleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
		setTitle(e.target.value);
	};

	// Manage page
	const [page, setPage] = useState(1);
	const [totalPages, setTotalPages] = useState(6000);
	const handlePrevious = () => {
		if (page > 1) {
			setPage(page - 1);
		}
	};
	const handleNext = () => {
		if (page < totalPages) {
			setPage(page + 1);
		}
	};
	const handlePageChange = (e: ChangeEvent<HTMLInputElement>) => {
		const newPage = parseInt(e.target.value);
		if (!isNaN(newPage) && newPage > 0) {
			setPage(newPage);
		}
	};
	// -----------------

	useEffect(() => {
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

				console.log(response.data.data.results);
			} catch (error) {
				toast.error('Something went wrong!');
			}
		};
		fetchData();
	}, [page, debounceTitle]);

	return (
		<div className="flex-center mx-auto common-padding bg-background font-comic ">
			<div className="w-full max-w-[1400px] flex flex-col dark:bg-dot-red-100/[0.2] bg-dot-red-800/[0.2]">
				<div className="flex justify-between">
					<ModeToggle />
				</div>

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

				<HoverEffect items={data} />

				{/* Le composant de pagination */}
				<Pagination className="mt-10">
					<PaginationContent>
						<PaginationItem>
							<PaginationPrevious
								href="#"
								onClick={(e) => {
									e.preventDefault();
									handlePrevious();
								}}
								className={page === 1 ? 'pointer-events-none opacity-50' : ''}
							/>
						</PaginationItem>

						{/* Affichage des liens de pagination en fonction de la page actuelle et du nombre total de pages */}
						{page > 1 && (
							<PaginationItem>
								<PaginationLink
									href="#"
									onClick={(e) => {
										e.preventDefault();
										handlePrevious();
									}}
								>
									{page - 1}
								</PaginationLink>
							</PaginationItem>
						)}

						<PaginationItem>
							<PaginationLink href="#">{page}</PaginationLink>
						</PaginationItem>

						{page < totalPages && (
							<PaginationItem>
								<PaginationLink
									href="#"
									onClick={(e) => {
										e.preventDefault();
										handleNext();
									}}
								>
									{page + 1}
								</PaginationLink>
							</PaginationItem>
						)}

						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
						<PaginationItem>
							<PaginationLink
								href="#"
								onClick={(e) => {
									e.preventDefault();
									setPage(totalPages);
								}}
							>
								{totalPages}
							</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationNext
								href="#"
								onClick={(e) => {
									e.preventDefault();
									handleNext();
								}}
							/>
						</PaginationItem>
					</PaginationContent>
				</Pagination>

				{/* Le input de la pagination */}
				<div className="flex justify-center items-center gap-3 relative mb-10 ">
					<div>Page</div>
					<Input
						type={'number'}
						className="flex w-max relative"
						placeholder="page number"
						value={page}
						onChange={(e) => {
							e.preventDefault();
							handlePageChange(e);
						}}
					/>
					<StickyNote className=" absolute w-6 h-6 top-1/2 left-1/2 -my-3 mx-16" />
				</div>
			</div>
		</div>
	);
};

export default ComicsPage;
