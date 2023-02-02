import {StartedInfo} from '../structure';

export class InformatorFile {
	static async get(initContentPath: string = ''): Promise<StartedInfo> {
		// Request to two files
		const [scheme, locales] = await Promise.all([
			this.getData(`${initContentPath}/scheme.json`),
			this.getData(`${initContentPath}/locales.json`),
		]).catch(() => {
			throw new Error(
				`WDFL: not correct path in attr data-path or` +
					` can't find scheme.json or locales.json or can't parse json format`
			);
		});

		return {scheme, locales};
	}

	// request with json
	private static async getData(url: string): Promise<any> {
		return fetch(url).then(response => response.json());
	}
}
