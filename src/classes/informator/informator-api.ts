import {config} from '../../config';
import {StartedInfo} from '../types';

export class InformatorApi {
	static async get(projectId: string): Promise<StartedInfo> {
		const url = `${config.serverUrl}/api/v1/public/form/init?projectId=${projectId}`;
		const res = await fetch(url).then(response => response.json());

		if (!res || !res.success || !res.data.scheme || !res.data.locales) {
			throw new Error('WDFL: Bad response, to API request for get started info');
		}

		return res.data;
	}
}
