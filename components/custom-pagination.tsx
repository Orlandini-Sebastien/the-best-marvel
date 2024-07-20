'use client';

import React, {
	ChangeEvent,
	KeyboardEventHandler,
	useEffect,
	useState,
} from 'react';
import { StickyNote } from 'lucide-react';
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from './ui/pagination';
import { Input } from './ui/input';

interface CustomPaginationProps {
	page: number;
	totalPages: number;
	handlePrevious: () => void;
	handleNext: () => void;
	handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
	updatePage: (newPage: number) => void;
	handleInputSubmit: () => void;
	handleKeyDown: KeyboardEventHandler<HTMLInputElement>;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
	page,
	totalPages,
	handleNext,
	handlePrevious,
	handleInputChange,
	updatePage,
	handleInputSubmit,
	handleKeyDown,
}) => {
	const [inputValue, setInputValue] = useState<string>('');

	useEffect(() => {
		// Réinitialiser la valeur de l'input lorsque la page change
		setInputValue('');
	}, [page]);

	const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
		handleInputChange(e); // Assurez-vous que la fonction passe la valeur correcte
	};

	const onBlur = () => {
		// Appeler handleInputSubmit lorsque l'input perd le focus
		handleInputSubmit();
	};

	return (
		<>
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
								updatePage(totalPages);
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

			<div className="flex justify-center items-center gap-3 relative mb-10 ">
				<div>Page</div>
				<Input
					type={'number'}
					className="flex w-max relative"
					placeholder="page number"
					value={inputValue} // Assurez-vous que l'input est contrôlé
					onChange={onInputChange} // Mettre à jour l'état lorsque la valeur change
					onBlur={onBlur} // Appeler handleInputSubmit lorsque l'input perd le focus
					onKeyDown={handleKeyDown} // Gestion des événements de clavier
				/>
				<StickyNote className=" absolute w-6 h-6 top-1/2 left-1/2 -my-3 mx-16" />
			</div>
		</>
	);
};

export default CustomPagination;
