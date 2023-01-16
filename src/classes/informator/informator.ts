import {FormParams, StartedInfo} from '../structure';
import {InformatorApi} from './informator-api';
import {InformatorFile} from './informator-file';

export class Informator {
	static async getStartedInfo({
		projectId,
		initContentPath,
		useApi,
	}: FormParams): Promise<StartedInfo> {
		if (useApi && projectId) {
			return InformatorApi.get(projectId);
		}

		return InformatorFile.get(initContentPath);
	}
}
