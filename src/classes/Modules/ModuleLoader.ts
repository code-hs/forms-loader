import {Module} from '../structure';
import {ModulesLoaderDOM} from './ModulesLoaderDOM';

// noinspection JSMethodCanBeStatic
export class ModuleLoader {
	constructor(module: Module) {
		if (!module || !module.files) return;
		if (module.enable === false) return;

		const js: string[] = module.files.js || [];
		const css: string[] = module.files.css || [];

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
