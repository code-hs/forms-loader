import {Scheme, Module} from '../structure';
import {ModulesLoaderDOM} from './ModulesLoaderDOM';

export class ModulesLoader {
	static cbAfterLoad: Function;
	static totalModules: number;

	static load(scheme: Scheme, cbAfterLoad: Function) {
		if (!scheme || !scheme.config || !scheme.config.modules) return;

		this.cbAfterLoad = cbAfterLoad;
		this.totalModules = scheme.config.modules.length;

		// пройтись по всем модулям и
		// создать массив с урлами
		// загрузить их все одновременно
		// и через Promise.all отслеживать когда все будут загружены
		// после этого вызвать cbAfterLoad

		// это я сделал выполнение как загрузился один модуль, а не все модули
		// то есть загрузился первый модуль и потом вызвался колбек

		scheme.config.modules.forEach(module => {
			new ModuleLoader(module);
		});
	}
}

class ModuleLoader {
	module: Module;
	totalFiles: number;

	constructor(module: Module) {
		if (!module || !module.enable || !module.files) return;

		this.module = module;
		const js = module.files.js || [];
		const css = module.files.css || [];
		this.totalFiles = js.length + css.length;

		js.forEach((url: string) => this.loadFileJS(url));
		css.forEach((url: string) => this.loadFileCSS(url));
	}

	private loadFileJS(url: string) {
		const container = document.createElement('script');
		container.type = 'text/javascript';
		// container.id = config.idInHead;
		container.src = url;
		// container.onerror = errorCb;
		container.onload = () => {
			this.onLoad();
		};

		ModulesLoaderDOM.appendToHead(container);
	}

	private loadFileCSS(url: string) {
		const container = document.createElement('link');
		container.type = 'text/javascript';
		container.rel = 'stylesheet';
		// container.onerror = errorCb;
		// container.id = cssId;
		container.type = 'text/css';
		container.href = url;
		container.media = 'all';

		container.onload = () => {
			this.onLoad();
		};

		ModulesLoaderDOM.appendToHead(container);
	}

	private onLoad() {
		this.totalFiles--;
		if (this.totalFiles === 0) ModulesLoader.cbAfterLoad();
	}
}
