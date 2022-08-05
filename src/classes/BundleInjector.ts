import {Bundler} from './Bundler';

class DOMWorker {
	static key: 'widget-form-loader-script-bundle';

	static hasScriptInHead(): boolean {
		return !!document.getElementById(this.key);
	}

	static appendToHead(script: Element): void {
		document.querySelector('head').append(script);
	}

	static removeFromHead(): void {
		document.getElementById(this.key).remove();
	}
}

export class BundleInjector {
	static inject(initContentPath: string): void {
		// don't inject script twice
		if (DOMWorker.hasScriptInHead()) return;

		const bundleUrl: string = Bundler.getLocalUrl(initContentPath);
		const script: HTMLScriptElement = this.generateScript(bundleUrl);

		DOMWorker.appendToHead(script);
	}

	private static generateScript(bundleUrl: string): HTMLScriptElement {
		const script: HTMLScriptElement = document.createElement('script');
		script.type = 'text/javascript';
		script.id = DOMWorker.key;
		script.src = bundleUrl;
		script.onerror = BundleInjector.handleError;

		return script;
	}

	private static handleError(error: ErrorEvent): void {
		// delete bad installed script
		DOMWorker.removeFromHead();
		// inject fallback bundle
		BundleInjector.inject(Bundler.getFallbackUrl());

		// todo: add server name to error message
		// @ts-ignore
		const s = `WDFL: Can't find bundle in local path: ${error.target.src}, automatically used bundle from %FORMNAME% server`;
		console.warn(s);
	}
}
