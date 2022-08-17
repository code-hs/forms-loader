import {Module} from '../structure';
import {ModulesLoaderDOM} from './ModulesLoaderDOM';

type ModuleFiles = {
	js?: string[];
	css?: string[];
};
type ModulesStore = {[key: string]: ModuleFiles};

// noinspection JSMethodCanBeStatic
export class ModuleLoader {
	private static modulesFiles: ModulesStore = {
		datepicker: {
			js: [
				'https://cdn.jsdelivr.net/npm/vanillajs-datepicker@1.2.0/dist/js/datepicker-full.min.js',
			],
			css: [
				'https://cdn.jsdelivr.net/npm/vanillajs-datepicker@1.2.0/dist/css/datepicker.min.css',
			],
		},
	};

	constructor(module: Module) {
		const moduleFiles = ModuleLoader.modulesFiles[module.name];
		if (!moduleFiles) {
			throw new Error(`ModuleLoader: Module ${module.name} not found`);
		}

		const js: string[] = moduleFiles.js || [];
		const css: string[] = moduleFiles.css || [];

		js.forEach((url: string) => this.loadFileJS(url));
		css.forEach((url: string) => this.loadFileCSS(url));
	}

	private loadFileJS(url: string): void {
		if (!url) return;

		const container: HTMLScriptElement = document.createElement('script');
		container.type = 'text/javascript';
		container.async = false;
		container.src = url;

		ModulesLoaderDOM.append(container);
	}

	private loadFileCSS(url: string): void {
		if (!url) return;

		const container: HTMLLinkElement = document.createElement('link');
		container.type = 'text/css';
		container.rel = 'stylesheet';
		container.media = 'all';
		container.href = url;

		ModulesLoaderDOM.append(container);
	}
}
