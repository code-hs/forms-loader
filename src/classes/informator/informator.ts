import type {FormParams, StartedInfo} from '../types';
import {InformatorApi} from './informator-api';
import {InformatorFile} from './informator-file';

export class Informator {
	static async getStartedInfo({
		projectId,
		initContentPath,
		useApi,
	}: FormParams): Promise<StartedInfo> {
		if (useApi) return InformatorApi.get(projectId);

		// main direction
		return InformatorFile.get(initContentPath);
	}
}
