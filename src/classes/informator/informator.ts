import {FormParams, StartedInfo} from '../types';
import {InformatorApi} from './informator-api';
import {InformatorFile} from './informator-file';
type InformatorProps = Omit<FormParams, 'page'>;

export class Informator {
	static async getStartedInfo({
		projectId,
		initContentPath,
		useApi,
	}: InformatorProps): Promise<StartedInfo> {
		if (useApi) return InformatorApi.get(projectId);

		// main direction
		return InformatorFile.get(initContentPath);
	}
}
