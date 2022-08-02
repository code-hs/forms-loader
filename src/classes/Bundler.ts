import {config} from '../config';

export class Bundler {
	/**
	 * Local by client site
	 * @param {string} bundleName
	 * @param {string} initContentPath
	 */
	static getLocalUrl(bundleName: string, initContentPath: string): string {
		return `${initContentPath}/${bundleName}`;
	}

	static getFallbackUrl(): string {
		return `${config.serverUrl}/p/bundles/${config.bundleName}`;
	}
}
