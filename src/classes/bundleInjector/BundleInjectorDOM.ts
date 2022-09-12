import {config} from '../../config';

export class BundleInjectorDOM {
	static key = 'main-bundle';

	static isLoaded(): boolean {
		return !!document.getElementById(this.key);
	}

	static append(script: Element): void {
		const container = document.getElementById(config.filesContainerId);
		container.append(script);
	}

	static remove(): void {
		document.getElementById(this.key).remove();
	}
}
