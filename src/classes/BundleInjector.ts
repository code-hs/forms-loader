import {Bundler} from './Bundler';
import {BundleInjectorDOM} from './BundleInjectorDOM';

export class BundleInjector {
	static inject(initContentPath: string): void {
		// don't inject script twice
		if (BundleInjectorDOM.hasScriptInHead()) return;

		const bundleUrl: string = Bundler.getLocalUrl(initContentPath);
		const script: HTMLScriptElement = this.generateScript(bundleUrl);

		BundleInjectorDOM.appendToHead(script);
	}

	private static generateScript(bundleUrl: string): HTMLScriptElement {
		const script: HTMLScriptElement = document.createElement('script');
		script.type = 'text/javascript';
		script.id = BundleInjectorDOM.key;
		script.src = bundleUrl;
		script.onerror = BundleInjector.handleError;

		return script;
	}

	private static handleError(error: ErrorEvent): void {
		// delete bad installed script
		BundleInjectorDOM.removeFromHead();
		// inject fallback bundle
		BundleInjector.inject(Bundler.getFallbackUrl());

		// todo: add server name to error message
		// @ts-ignore
		const s = `WDFL: Can't find bundle in local path: ${error.target.src}, automatically used bundle from %FORMNAME% server`;
		console.warn(s);
	}
}
