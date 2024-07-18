'use client';

import axios from 'axios';
import toast from 'react-hot-toast';
import { useEffect, useState, ChangeEvent, ChangeEventHandler } from 'react';
import { Search, StickyNote } from 'lucide-react';

import { Serie } from '@/type';

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
import Image from 'next/image';
import { DirectionAwareHover } from '@/components/direction-aware-hover-series';

import { motion } from 'framer-motion';
import { HeroHighlight, Highlight } from '@/components/ui/hero-hightlight';

const ComicsPage = () => {
	// fetch data
	const [data, setData] = useState<Serie[]>([]);

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
					`${process.env.NEXT_PUBLIC_API_URL}/series?page=${page}&title=${debounceTitle}`
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

				<HeroHighlight>
					<motion.h1
						initial={{
							opacity: 0,
							y: 20,
						}}
						animate={{
							opacity: 1,
							y: [20, -5, 0],
						}}
						transition={{
							duration: 0.5,
							ease: [0.4, 0.0, 0.2, 1],
						}}
						className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
					>
						Marvel Universe
						<Highlight className="text-black dark:text-white">Series</Highlight>
						Catalog
						<div className="h4">
							Click a Card to Dive Deeper into Your Favorite serie!
						</div>
					</motion.h1>
				</HeroHighlight>

				{/* La recherche d'un titre */}
				<div className="flex flex-col justify-center items-center gap-3 mb-10 ">
					<div className="h3">Search a serie</div>
					<div className="relative flex w-1/3 min-w-96">
						<Search className="absolute w-6 h-6 top-1/2 transform -translate-y-1/2 left-3 text-gray-500" />
						<Input
							className="pl-10 h-14 pr-3 py-2 w-full h4 "
							type={'text'}
							placeholder="Which serie do you want ?"
							onChange={onTitleChange}
						/>
					</div>
				</div>

				<DirectionAwareHover data={data} />

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
