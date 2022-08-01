import {config} from '../config';
import {Bundler} from './Bundler';

export class ScriptInjector {
	static handleError(error) {
		// delete bad installed script
		document.getElementById(config.idInHead).remove();
		// inject fallback bundle
		ScriptInjector.injectBundle(Bundler.getFallbackUrl());

		console.warn(
			`WDFL: Can't find bundle in local path: ${error.target.src}, automatically used bundle from %FORMNAME% server`
		);
	}

	/**
	 *
	 * @param {string} bundleUrl
	 * @param {function} errorCb
	 */
	static injectBundle(bundleUrl, errorCb = null) {
		// don't inject script twice
		const scriptInHead = document.getElementById(config.idInHead);
		if (scriptInHead) return;

		const script = document.createElement('script');
		script.type = 'text/javascript';
		script.id = config.idInHead;
		script.src = bundleUrl;
		script.onerror = errorCb;

		document.getElementsByTagName('head')[0].appendChild(script);
	}
}
