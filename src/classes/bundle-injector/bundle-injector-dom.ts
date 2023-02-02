import {config} from '../../config';

export class BundleInjectorDom {
	static key = 'main-bundle';

	static isLoaded(): boolean {
		return !!document.getElementById(this.key);
	}

	static append(script: Element): void {
		const container = document.getElementById(config.filesContainerId) as HTMLElement;
		container.append(script);
	}

	static remove(): void {
		// @ts-ignore
		document.getElementById(this.key).remove();
	}
}
