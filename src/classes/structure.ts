export interface Module {
	name: string;
	enable: boolean;
	files: {
		js?: string[];
		css?: string[];
	};
	options?: {
		global?: object;
		forEachField?: object;
	};
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
	// where get the StartedInfo.
	// if true - use API, else - use file
	useApi?: boolean;
	// using in BundleInjector as local path
	initContentPath?: string;
}

// for bundle
export interface StartedInfo {
	scheme: Scheme;
	locales: Locales;
}
