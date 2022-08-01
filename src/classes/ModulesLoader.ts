export class ModulesLoader {
	static load(scheme) {
		if (!scheme || !scheme.config || !scheme.config.modules) return;

		const {modules} = scheme.config;
		modules.forEach(module => this.loadModule(module));
	}

	static loadModule(module) {
		if (!module || !module.enable || !module.files) return;

		const js = module.files.js || [];
		const css = module.files.css || [];

		js.forEach(url => this.loadFile(url, 'js'));
		css.forEach(url => this.loadFile(url, 'css'));

		// "files": {
		// 		"js": [
		// 			"https://cdn.jsdelivr.net/npm/vanillajs-datepicker@1.2.0/dist/js/datepicker-full.min.js"
		// 		],
		// 		"css": [
		// 			"https://cdn.jsdelivr.net/npm/vanillajs-datepicker@1.2.0/dist/css/datepicker.min.css"
		// 		]
		// 	},
	}

	static loadFile(url, type) {
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
