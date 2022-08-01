import {config} from '../config';

export class Bridge {
	/**
	 * Save data to storage for use in bundle (on the client app)
	 * @param {object} scheme
	 * @param {object} locales
	 */
	static send(scheme, locales) {
		this.saveToStorage(`${config.storagePrefix}scheme`, scheme);
		this.saveToStorage(`${config.storagePrefix}locales`, locales);
	}

	/**
	 * Save data to localStorage
	 * @param {string} key
	 * @param {Object} data
	 */
	static saveToStorage(key, data) {
		const dataJson = JSON.stringify(data);
		localStorage.setItem(key, dataJson);
	}
}
