export class BundleInjectorDOM {
	static key: 'widget-form-loader-script-bundle';

	static isLoaded(): boolean {
		return !!document.getElementById(this.key);
	}

	static append(script: Element): void {
		document.body.append(script);
	}

	static remove(): void {
		document.getElementById(this.key).remove();
	}
}
