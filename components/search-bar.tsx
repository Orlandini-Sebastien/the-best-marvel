import { Search } from 'lucide-react';
import React, { ChangeEventHandler } from 'react';
import { Input } from './ui/input';

interface SearchBarProps {
	title: string;
	placeholder: string;
	onTitleChange: ChangeEventHandler<HTMLInputElement>;
}

const SearchBar: React.FC<SearchBarProps> = ({
	title,
	placeholder,
	onTitleChange,
}) => {
	return (
		<div className="flex flex-col justify-center items-center gap-3 md:mb-10 ">
			<div className="max-md:h5 h3">{title}</div>
			<div className="relative flex w-1/3 max-md:w-full md:min-w-96">
				<Search className="absolute w-6 h-6 top-1/2 transform -translate-y-1/2 left-3 text-gray-500" />
				<Input
					className="pl-10 h-14 pr-3 py-2 w-full h5 max-md:h6"
					type={'text'}
					placeholder={placeholder}
					onChange={onTitleChange}
				/>
			</div>
		</div>
	);
};

export default SearchBar;
