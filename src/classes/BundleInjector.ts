import {config} from '../config';
import {Bundler} from './Bundler';

export class BundleInjector {
	static inject(initContentPath: string): void {
		this.process(initContentPath);
	}

	static process(initContentPath: string): void {
		const bundleUrl: string = Bundler.getLocalUrl(
			'form-widget-g.js',
			initContentPath
		);

		// don't inject script twice
		// todo: refact, add new function
		const scriptInHead: HTMLHeadElement = document.getElementById(
			config.idInHead
		);
		if (scriptInHead) return;

		const script = document.createElement('script');
		script.type = 'text/javascript';
		script.id = config.idInHead;
		script.src = bundleUrl;
		script.onerror = BundleInjector.handleError;

		const head: HTMLHeadElement = document.getElementsByTagName('head')[0];
		head.appendChild(script);
	}

	static handleError(error: ErrorEvent): void {
		// delete bad installed script
		document.getElementById(config.idInHead).remove();
		// inject fallback bundle
		BundleInjector.inject(Bundler.getFallbackUrl());

		// @ts-ignore
		const s = `WDFL: Can't find bundle in local path: ${error.target.src}, automatically used bundle from %FORMNAME% server`;
		console.warn(s);
	}
}
