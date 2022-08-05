import {Scheme, Locales} from './structure';

export class Bridge {
	private static storagePrefix: 'WDFL:init:';

	/**
	 * Save data to storage for use in bundle (on the client app)
	 */
	static send(scheme: Scheme, locales: Locales): void {
		this.saveToStorage(`${this.storagePrefix}scheme`, scheme);
		this.saveToStorage(`${this.storagePrefix}locales`, locales);
	}

	private static saveToStorage(key: string, data: object): void {
		const dataJson = JSON.stringify(data);
		localStorage.setItem(key, dataJson);
	}
}
