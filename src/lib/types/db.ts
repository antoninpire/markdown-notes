export type User = {
	id: string;
	name?: string;
	created: Date;
	updated: Date;
};

export type Note = {
	id: string;
	title: string;
	content?: string;
	user: string;
	folder?: string;
	expand: {
		user?: User;
		folder?: Folder;
	};
	created: Date;
	updated: Date;
};

export type Folder = {
	id: string;
	label: string;
	user: string;
	expand: {
		'notes(folder)'?: Note[];
		// 'folders(folder)'?: Folder[];
		user?: User;
	};
	created: Date;
	updated: Date;
};
