import {Bundler} from '../bundler';
import {BundleInjectorDom} from './bundle-injector-dom';
import {FormParams} from '../types';

export class BundleInjector {
	static inject({initContentPath, dev}: FormParams): void {
		if (dev) {
			// player, bundle - injected by vue serve
			// don't inject twice
			return;
		}

		// don't inject script twice
		if (BundleInjectorDom.isLoaded()) return;

		if (!initContentPath) {
			this.injectDefaultBundle();
			return;
		}

		const bundleUrl: string = Bundler.getLocalUrl(initContentPath);
		const script: HTMLScriptElement = this.generateScript(bundleUrl);
		BundleInjectorDom.append(script);
	}

	private static generateScript(bundleUrl: string): HTMLScriptElement {
		const script: HTMLScriptElement = document.createElement('script');
		script.type = 'text/javascript';
		script.id = BundleInjectorDom.key;
		script.src = bundleUrl;
		//@ts-ignore
		script.onerror = BundleInjector.handleError;

		return script;
	}

	private static injectDefaultBundle(): void {
		// inject fallback bundle
		const bundleUrl: string = Bundler.getFallbackUrl();
		const script: HTMLScriptElement = this.generateScript(bundleUrl);
		BundleInjectorDom.append(script);

		this.showWarn('');
	}

	private static handleError(error: ErrorEvent) {
		// this = event error object
		// delete bad installed script
		BundleInjectorDom.remove();
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
