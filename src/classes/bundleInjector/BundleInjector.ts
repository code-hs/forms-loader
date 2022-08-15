import {Bundler} from '../Bundler';
import {BundleInjectorDOM} from './BundleInjectorDOM';

export class BundleInjector {
	static inject(initContentPath: string): void {
		// don't inject script twice
		if (BundleInjectorDOM.isLoaded()) return;

		if (!initContentPath) {
			this.injectDefaultBundle();
			return;
		}

		const bundleUrl: string = Bundler.getLocalUrl(initContentPath);
		const script: HTMLScriptElement = this.generateScript(bundleUrl);
		BundleInjectorDOM.append(script);
	}

	private static generateScript(bundleUrl: string): HTMLScriptElement {
		const script: HTMLScriptElement = document.createElement('script');
		script.type = 'text/javascript';
		script.id = BundleInjectorDOM.key;
		script.src = bundleUrl;
		script.onerror = BundleInjector.handleError;
		script.async = false;

		return script;
	}

	private static injectDefaultBundle(): void {
		// inject fallback bundle
		const bundleUrl: string = Bundler.getFallbackUrl();
		const script: HTMLScriptElement = this.generateScript(bundleUrl);
		BundleInjectorDOM.append(script);

		this.showWarn('');
	}

	private static handleError(error: ErrorEvent): void {
		// this = event error object
		// delete bad installed script
		BundleInjectorDOM.remove();
		BundleInjector.injectDefaultBundle();
		// @ts-ignore
		BundleInjector.showWarn(error.target.src);
	}

	private static showWarn(localPath: string): void {
		// todo: add server name to error message
		console.warn(
			`WDFL: Can't find bundle in local path: ${localPath}, automatically used bundle from %FORMNAME% server`
		);
	}
}
