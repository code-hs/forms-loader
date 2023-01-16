import {FormParams} from './structure';

export class ParamsWorker {
	static get(form: HTMLElement): FormParams {
		const {projectId, page, path = ''} = form.dataset;

		return {
			projectId,
			page,
			initContentPath: path,
			useApi: 'useApi' in form.dataset,
		};
	}

	static validate({projectId, page, useApi}: FormParams): void {
		if (!page) throw new Error('WDFL: Empty param page key');

		if (useApi && !projectId) {
			throw new Error('WDFL: Empty attribute data-project-id');
		}
	}
}
