import {FormParams, StartedInfo} from './structure';
import {InformatorAPI} from './InformatorAPI';
import {InformatorFile} from './InformatorFile';

export class Informator {
	static async getStartedInfo({
		projectId,
		initContentPath,
		useApi,
	}: FormParams): Promise<StartedInfo> {
		if (useApi && projectId) {
			return InformatorAPI.get(projectId);
		}

		return InformatorFile.get(initContentPath);
	}
}
