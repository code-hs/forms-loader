import {StartedInfo} from '../structure';

export class InformatorFile {
	static async get(initContentPath: string): Promise<StartedInfo> {
		const [scheme, locales] = await Promise.all([
			this.getData(`${initContentPath}/scheme.json`),
			this.getData(`${initContentPath}/locales.json`),
		]).catch(() => {
			throw new Error(
				`WDFL: Bad path in attr data-init-content-path or` +
					` can't find scheme.json or locales.json or can't parse json`
			);
		});

		return {scheme, locales};
	}

	private static async getData(url: string): Promise<any> {
		return fetch(url).then(response => response.json());
	}
}
