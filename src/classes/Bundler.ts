import {config} from '../config';

export class Bundler {
	/**
	 * From client side
	 */
	static getLocalUrl(initContentPath: string): string {
		return `${initContentPath}/${config.bundleName}`;
	}

	static getFallbackUrl(): string {
		return `${config.serverUrl}/p/bundles/${config.bundleName}`;
	}
}
