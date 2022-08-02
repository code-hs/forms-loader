import {config} from '../config';
import {Bundler} from './Bundler';

//todo: bundle injector ???
export class ScriptInjector {
	static handleError(error: ErrorEvent): void {
		// delete bad installed script
		document.getElementById(config.idInHead).remove();
		// inject fallback bundle
		ScriptInjector.injectBundle(Bundler.getFallbackUrl());

		// @ts-ignore
		const s = `WDFL: Can't find bundle in local path: ${error.target.src}, automatically used bundle from %FORMNAME% server`;
		console.warn(s);
	}

	static injectBundle(
		bundleUrl: string,
		errorCb: OnErrorEventHandler = null
	): void {
		// don't inject script twice
		const scriptInHead: HTMLHeadElement = document.getElementById(
			config.idInHead
		);
		if (scriptInHead) return;

		const script = document.createElement('script');
		script.type = 'text/javascript';
		script.id = config.idInHead;
		script.src = bundleUrl;
		script.onerror = errorCb;

		const head: HTMLHeadElement = document.getElementsByTagName('head')[0];
		head.appendChild(script);
	}
}
