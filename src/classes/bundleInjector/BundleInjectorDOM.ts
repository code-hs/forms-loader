export class BundleInjectorDOM {
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
