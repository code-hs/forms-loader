import {Store} from '../Store';
import {Module} from '../structure';
import {DOMLoader} from './loader/DOMLoader';

type Relations = {
	[langFromAvailableLangs: string]: string;
};
const subPath = 'https://cdn.jsdelivr.net/npm/vanillajs-datepicker@1.2.0/dist/';

export class DatepickerLoader {
	private static module: Module;
	private static files = {
		js: [subPath + 'js/datepicker-full.min.js'],
		css: [subPath + 'css/datepicker.min.css'],
	};
	private static localesPath = subPath + 'js/locales/';

	static load(module: Module): void {
		this.module = module;
		this.files.js.forEach((url: string, index) => {
			// use cb once
			if (index === 0) {
				DOMLoader.loadFileJS(url, () => {
					this.loadLocales();
				});
			} else {
				DOMLoader.loadFileJS(url);
			}
		});
		this.files.css.forEach((url: string) => DOMLoader.loadFileCSS(url));
	}

	private static loadLocales(): void {
		const localesPath: string[] = this.getLocalesPath();
		localesPath.forEach((url: string) => DOMLoader.loadFileJS(url));
	}

	private static getLocalesPath(): string[] {
		const relations: Relations = this.module.options.locales.relations;
		const {scheme} = Store;
		const availableLangs: string[] = scheme.config.localization.availableLangs;

		const relatedLangs: string[] = availableLangs.map(
			(lang: string) => relations[lang] || lang
		);

		return relatedLangs.map((lang: string) => this.generatePathToLocale(lang));
	}

	static generatePathToLocale(lang: string): string {
		return this.localesPath + lang + '.min.js';
	}
}
