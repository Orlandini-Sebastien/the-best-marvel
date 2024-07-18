export interface Comic {
	id: number;
	title: string;
	description: string;
	thumbnail: {
		path: string;
		extension: string;
	};
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

export interface Story {
	id: number;
	title: string;
	description: string;
	thumbnail: {
		path: string;
		extension: string;
	};
}

export interface Serie {
	id: number;
	title: string;
	description: string;
	thumbnail: {
		path: string;
		extension: string;
	};
}
