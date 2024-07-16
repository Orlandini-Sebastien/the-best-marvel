export interface Comic {
	id: string;
	title: string;
	description: string;
	images: {
		path: string;
		extension: string;
	}[];
}

export interface Character {
	id: number;
	name: string;
	description: string;
	thumbnail: {
		path: string;
		extension: string;
	};
}
