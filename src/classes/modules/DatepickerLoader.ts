// locales names
// https://github.com/uxsolutions/bootstrap-datepicker/tree/master/dist/locales

import {Store} from '../Store';
import {Module} from '../structure';
import {DOMLoader} from './loader/DOMLoader';

type Relations = {
	[langFromAvailableLangs: string]: string;
};

export class DatepickerLoader {
	private module: Module;
	private DOMLoaderO: DOMLoader;
	private subPath =
		'https://cdn.jsdelivr.net/npm/vanillajs-datepicker@1.2.0/dist/';
	private files = {
		js: [this.subPath + 'js/datepicker-full.min.js'],
		css: [this.subPath + 'css/datepicker.min.css'],
	};

	private localesPath = this.subPath + 'js/locales/';

	constructor(module: Module) {
		this.module = module;
		this.DOMLoaderO = new DOMLoader(module.name);
	}

	load(): void {
		this.files.js.forEach((url: string, index) => {
			// use cb once
			if (index === 0) {
				this.DOMLoaderO.loadFileJS(url, () => {
					this.loadLocales();
				});
			} else {
				this.DOMLoaderO.loadFileJS(url);
			}
		});
		this.files.css.forEach((url: string) => this.DOMLoaderO.loadFileCSS(url));
	}

	private loadLocales(): void {
		const localesPath: string[] = this.getLocalesPath();
		localesPath.forEach((url: string) => this.DOMLoaderO.loadFileJS(url));
	}

	private getLocalesPath(): string[] {
		const relations: Relations = this.module.options?.locales?.relations || {};
		const availableLangs: string[] = this.getAvailableLangs();
		const relatedLangs: string[] = availableLangs.map(
			(lang: string) => relations[lang] || lang
		);

		return relatedLangs.map((lang: string) => this.generatePathToLocale(lang));
	}

	private getAvailableLangs(): string[] {
		const {scheme} = Store;
		let availableLangs: string[] =
			scheme.config.localization?.availableLangs || [];
		const preInstalledLocale = 'en';

		availableLangs = availableLangs.filter(
			(lang: string) => lang !== preInstalledLocale
		);

		return availableLangs;
	}

	private generatePathToLocale(lang: string): string {
		return this.localesPath + lang + '.min.js';
	}
}
