import {config} from '../config';

export class Bundler {
	/**
	 * Local by client site
	 * @param {string} bundleName
	 * @param {string} initContentPath
	 * @returns {string}
	 */
	static getLocalUrl(bundleName, initContentPath) {
		return `${initContentPath}/${bundleName}`;
	}

	/**
	 * @returns {string}
	 */
	static getFallbackUrl() {
		return `${config.serverUrl}/p/bundles/${config.bundleName}`;
	}
}
