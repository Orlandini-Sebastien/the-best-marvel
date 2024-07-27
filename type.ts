export interface Comic {
	id: number;
	title: string;
	description: string | null;
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

export interface Creator {
	id: number;
	firstName: string;
	description: string;
	thumbnail: {
		path: string;
		extension: string;
	};
	comics: Comic[];
	series: Serie[];
	character: Character[];
}

export interface Serie {
	id: number;
	title: string;
	description: string | null;
	thumbnail: {
		path: string;
		extension: string;
	};
}

export interface Event {
	id: number;
	title: string;
	description: string;
	thumbnail: {
		path: string;
		extension: string;
	};
	start: Date;
	end: Date;
}
