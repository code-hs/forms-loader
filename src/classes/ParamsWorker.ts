import {Scheme, FormParams} from './structure';

export class ParamsWorker {
	/**
	 * @returns {{initContentPath: string, useApi: boolean, page: string, projectId: string}}
	 */
	static get(form: HTMLElement) {
		const {projectId, page, path = '', useApi} = form.dataset;

		return {
			projectId,
			page,
			initContentPath: path,
			useApi: useApi === '',
		};
	}

	/**
	 * @param {string} projectId
	 * @param {string} page
	 * @param {boolean} useApi
	 */
	static validate({projectId, page, useApi}: FormParams) {
		if (!page) throw new Error('WDFL: Empty param page key');

		if (useApi && !projectId) {
			throw new Error('WDFL: Empty attribute data-project-id');
		}
	}
}
