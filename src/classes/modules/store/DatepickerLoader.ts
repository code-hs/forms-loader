import {Store} from '../../Store';
import {Module} from '../../structure';
import {ModulesLoaderDOM} from '../ModulesLoaderDOM';

export class DatepickerLoader {
	private static files = {
		js: [
			'https://cdn.jsdelivr.net/npm/vanillajs-datepicker@1.2.0/dist/js/datepicker-full.min.js',
		],
		css: [
			'https://cdn.jsdelivr.net/npm/vanillajs-datepicker@1.2.0/dist/css/datepicker.min.css',
		],
		localesPath:
			'https://cdn.jsdelivr.net/npm/vanillajs-datepicker@1.2.0/dist/js/locales/',
	};

	static load(module: Module): void {
		const {scheme} = Store;

		this.files.js.forEach((url: string) => ModulesLoaderDOM.loadFileJS(url));
		this.files.css.forEach((url: string) => ModulesLoaderDOM.loadFileCSS(url));
	}
}
