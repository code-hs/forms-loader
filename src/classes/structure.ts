export interface Module {
	name: string;
	enable: boolean;
	files: {
		js?: string[];
		css?: string[];
	};
	optionsForEachField?: object;
}

export interface Page {
	id?: number;
	key?: string;
	type?: string;
	description?: string;
	position?: number;
	components?: object[];
}

export interface Scheme {
	config: {
		modules?: Module[];
	};
	pages: Page[];
}

export interface Locales {
	[lang: string]: object;
}

export interface FormParams {
	projectId?: string;
	page?: string;
	useApi?: boolean;
	initContentPath?: string;
}

// for bundle
export interface StartedInfo {
	scheme: Scheme;
	locales: Locales;
}
