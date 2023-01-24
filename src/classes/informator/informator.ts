import {FormParams, StartedInfo} from '../structure';
import {InformatorApi} from './informator-api';
import {InformatorFile} from './informator-file';
type InformatorProps = Omit<FormParams, 'page'>;

export class Informator {
	static async getStartedInfo({
		projectId,
		initContentPath,
		useApi,
	}: InformatorProps): Promise<StartedInfo> {
		if (useApi && projectId) {
			return InformatorApi.get(projectId);
		}

		return InformatorFile.get(initContentPath);
	}
}
