// locales names
// https://github.com/uxsolutions/bootstrap-datepicker/tree/master/dist/locales
// module
// https://mymth.github.io/vanillajs-datepicker/

import {Store} from '../store';
import {Module} from '../types';
import {DomLoader} from './loader/dom-loader';

type Relations = {
	[langFromAvailableLangs: string]: string;
};

export class DatepickerLoader {
	private module: Module;
	private DOMLoaderO: DomLoader; // DomLoader Object
	// part of path to datepicker files
	private subPath = 'https://cdn.jsdelivr.net/npm/vanillajs-datepicker@1.2.0/dist/';
	// files list
	private files = {
		js: [this.subPath + 'js/datepicker-full.min.js'],
		css: [this.subPath + 'css/datepicker.min.css'],
	};
	private localesPath = this.subPath + 'js/locales/';

	constructor(module: Module) {
		this.module = module;
		this.DOMLoaderO = new DomLoader(module.name);
	}

	// load module files
	load(): void {
		const f = (url: string, index: number) => {
			// use that command - once
			if (index === 0) {
				this.DOMLoaderO.loadFileJS(url, () => {
					// after loaded datepicker-full.min.js
					// load locales, that load only after loaded datepicker-full.min.js
					// because locales has dependency on datepicker-full.min.js
					// locales inject in global object - window.Datepicker

					// window.Datepicker is undefined
					// locales will not inject and catch error
					this.loadLocales();
				});
			} else {
				// never start, because js files length === 1
				// but could be useful in the future, in other modules
				this.DOMLoaderO.loadFileJS(url);
			}
		};

		this.files.js.forEach(f);
		this.files.css.forEach((url: string) => this.DOMLoaderO.loadFileCSS(url));
	}

	private loadLocales(): void {
		const localesPath: string[] = this.getLocalesPath();
		localesPath.forEach((url: string) => this.DOMLoaderO.loadFileJS(url));
	}

	private getLocalesPath(): string[] {
		// relations object can be {
		// 	"ua": "uk",
		// 	"fr": "fr"
		// 	}

		const relations: Relations = this.module.config?.locales?.relations || {};
		// site languages
		const availableLangs: string[] = this.getAvailableLangs();
		// as example, site languages: ["ua", "fr", "en"]
		// datepicker locales: ["uk", "fr", "en"]
		// need transform site languages to datepicker languages
		const relatedLangs: string[] = availableLangs.map((lang: string) => relations[lang] || lang);

		// input value: ["ua", "fr", "en"]
		// return
		// relatedLangs: ["uk", "fr", "en"]

		return relatedLangs.map((lang: string) => this.generatePathToLocale(lang));
	}

	// site languages
	// todo: move to another class, and get lang list from new function
	// scheme.config.localization?.availableLangs, without preInstalledLocale "en"
	private getAvailableLangs(): string[] {
		const {scheme} = Store;
		let availableLangs: string[] = scheme.config.localization?.availableLangs || [];
		// lang, that installed in datepicker as default locales
		const preInstalledLocale = 'en';
		// delete en from availableLangs, because datepicker has en locales
		availableLangs = availableLangs.filter((lang: string) => lang !== preInstalledLocale);

		return availableLangs;
	}

	// full path
	private generatePathToLocale(lang: string): string {
		return this.localesPath + lang + '.min.js';
	}
}
