import {Scheme, Locales} from './structure';
import {config} from '../config';

export class Bridge {
	/**
	 * Save data to storage for use in bundle (on the client app)
	 */
	static send(scheme: Scheme, locales: Locales) {
		this.saveToStorage(`${config.storagePrefix}scheme`, scheme);
		this.saveToStorage(`${config.storagePrefix}locales`, locales);
	}

	static saveToStorage(key: string, data: object) {
		const dataJson = JSON.stringify(data);
		localStorage.setItem(key, dataJson);
	}
}
