import {Scheme, Module} from './structure';

export class ModulesLoader {
	static load(scheme: Scheme) {
		if (!scheme || !scheme.config || !scheme.config.modules) return;

		const {modules} = scheme.config;
		modules.forEach(module => this.loadModule(module));
	}

	static loadModule(module: Module) {
		if (!module || !module.enable || !module.files) return;

		const js = module.files.js || [];
		const css = module.files.css || [];

		js.forEach(url => this.loadFile(url, 'js'));
		css.forEach(url => this.loadFile(url, 'css'));
	}

	static loadFile(url: string, type: string) {
		if (type === 'js') {
			const script = document.createElement('script');
			script.type = 'text/javascript';
			// script.id = config.idInHead;
			script.src = url;
			// script.onerror = errorCb;
			document.getElementsByTagName('head')[0].appendChild(script);
		} else if (type === 'css') {
		}
	}
}
