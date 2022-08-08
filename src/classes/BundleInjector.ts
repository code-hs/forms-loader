import {Bundler} from './Bundler';
import {BundleInjectorDOM} from './BundleInjectorDOM';

export class BundleInjector {
	static inject(initContentPath: string): void {
		// don't inject script twice
		if (BundleInjectorDOM.hasScriptInHead()) return;

		if (!initContentPath) {
			this.injectDefaultBundle();
		}

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

	private static injectDefaultBundle(): void {
		// inject fallback bundle
		BundleInjector.inject(Bundler.getFallbackUrl());
		this.showWarn('');
	}

	private static handleError(error: ErrorEvent): void {
		// delete bad installed script
		BundleInjectorDOM.removeFromHead();
		this.injectDefaultBundle();
		// @ts-ignore
		this.showWarn(error.target.src);
	}

	private static showWarn(localPath: string): void {
		// todo: add server name to error message
		console.warn(
			`WDFL: Can't find bundle in local path: ${localPath}, automatically used bundle from %FORMNAME% server`
		);
	}
}
