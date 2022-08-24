import {Store} from '../../Store';
import {Module} from '../../structure';
import {ModulesLoaderDOM} from '../ModulesLoaderDOM';

type Relations = {
	[langFromAvailableLangs: string]: string;
};

export class DatepickerLoader {
	private static module: Module;
	private static files = {
		js: [
			'https://cdn.jsdelivr.net/npm/vanillajs-datepicker@1.2.0/dist/js/datepicker-full.min.js',
		],
		css: [
			'https://cdn.jsdelivr.net/npm/vanillajs-datepicker@1.2.0/dist/css/datepicker.min.css',
		],
	};
	private static localesPath =
		'https://cdn.jsdelivr.net/npm/vanillajs-datepicker@1.2.0/dist/js/locales/';

	static load(module: Module): void {
		this.module = module;
		this.files.js.forEach((url: string, index) => {
			// use cb once
			if (index === 0) {
				ModulesLoaderDOM.loadFileJS(url, () => {
					this.loadLocales();
				});
			} else {
				ModulesLoaderDOM.loadFileJS(url);
			}
		});
		this.files.css.forEach((url: string) => ModulesLoaderDOM.loadFileCSS(url));
	}

	private static loadLocales(): void {
		const localesPath: string[] = this.getLocalesPath();
		localesPath.forEach((url: string) => ModulesLoaderDOM.loadFileJS(url));
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
