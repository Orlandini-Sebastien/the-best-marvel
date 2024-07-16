export interface Comic {
	id: string;
	title: string;
	description: string;
	images: {
		path: string;
		extension: string;
	}[];
}
