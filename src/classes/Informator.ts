import {config} from '../config';

export class Informator {
	/**
	 * @param {string} projectId
	 * @returns {Promise<{scheme: Object, bundleName: string, locales: Object}>}
	 */
	static async getFromApi(projectId) {
		const url = `${config.serverUrl}/api/v1/public/form/init?projectId=${projectId}`;
		const res = await fetch(url).then(response => response.json());

		if (
			!res ||
			!res.success ||
			!res.data.bundleName ||
			!res.data.scheme ||
			!res.data.locales
		) {
			throw new Error(
				'WDFL: Bad response, to API request for get started info'
			);
		}

		return res.data;
	}

	static async loadFile(url) {
		return fetch(url).then(response => response.json());
	}

	/**
	 * @param {string} initContentPath
	 * @returns {Promise<{scheme: Object, bundleName: string, locales: Object}>}
	 */
	static async getFromFiles(initContentPath) {
		try {
			const [scheme, locales] = await Promise.all([
				this.loadFile(`${initContentPath}/scheme.json`),
				this.loadFile(`${initContentPath}/locales.json`),
			]);

			return {scheme, locales, bundleName: config.bundleName};
		} catch (e) {
			throw new Error(
				`WDFL: Bad path in attr data-init-content-path or` +
					` can't find scheme.json or locales.json`
			);
		}
	}

	/**
	 * Get started info
	 * @param {string} projectId
	 * @param {string} initContentPath
	 * @param {boolean} useApi
	 * @returns {Promise<{scheme: Object, bundleName: string, locales: Object}>}
	 */
	static async getStartedInfo({projectId, initContentPath, useApi}) {
		if (useApi && projectId) {
			return this.getFromApi(projectId);
		}
		return this.getFromFiles(initContentPath);
	}
}
