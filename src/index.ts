import {FormWorker} from './classes/FormWorker';
import {ParamsWorker} from './classes/ParamsWorker';
import {Bundler} from './classes/Bundler';
import {Informator} from './classes/Informator';
import {Bridge} from './classes/Bridge';
import {BundleInjector} from './classes/BundleInjector';
import {ModulesLoader} from './classes/ModulesLoader';
import {Scheme, FormParams} from './classes/structure';

// Widget Form Loader
{
	class WDFL {
		static async run() {
			try {
				FormWorker.deleteDuplicates();
				const form: HTMLElement = FormWorker.getForm();
				const {projectId, page, initContentPath, useApi}: FormParams =
					ParamsWorker.get(form);
				ParamsWorker.validate({projectId, page, useApi});

				const {scheme, locales, bundleName} = await Informator.getStartedInfo({
					projectId,
					initContentPath,
					useApi,
				});
				ModulesLoader.load(scheme);
				Bridge.send(scheme, locales);
				BundleInjector.inject(initContentPath);
			} catch (e) {
				console.error(e.message);
			}
		}
	}

	// todo: move try to this function
	WDFL.run();
}
