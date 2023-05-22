import type {FormParams} from './types';

export class ParamsWorker {
	static get(form: HTMLElement): FormParams {
		const {projectId, page, path = ''} = form.dataset;

		return {
			projectId: projectId as string,
			page: page as string,
			// using in BundleInjector as local path.
			// path for get files (scheme.json, locales.json)
			initContentPath: path,

			// boolean value
			// used in Informator.getStartedInfo()
			useApi: 'useApi' in form.dataset,

			// boolean value
			// used in BundleInjector.inject
			dev: 'dev' in form.dataset,
		};
	}

	static validate({projectId, page, initContentPath, useApi, dev}: FormParams): void {
		// if prop data-page don't set, what need to print ?
		// nothing, exception start
		if (!page) throw new Error('WDFL: Empty param page key');

		if (!initContentPath && !dev) throw new Error('WDFL: Empty param data-path');

		if (useApi && !projectId) {
			// if set param useApi -> need set project-id!!
			throw new Error('WDFL: Empty attribute data-project-id');
		}
	}
}
