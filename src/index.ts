import {FormWorker} from './classes/FormWorker';
import {ParamsWorker} from './classes/ParamsWorker';
import {Informator} from './classes/Informator';
import {Bridge} from './classes/Bridge';
import {BundleInjector} from './classes/BundleInjector';
import {ModulesLoader} from './classes/ModulesLoader';
import {FormParams, StartedInfo} from './classes/structure';

// Widget Form Loader
{
	class WDFL {
		static async run() {
			FormWorker.deleteDuplicates();
			const form: HTMLElement = FormWorker.getForm();
			const {projectId, page, initContentPath, useApi}: FormParams =
				ParamsWorker.get(form);
			ParamsWorker.validate({projectId, page, useApi});

			const {scheme, locales}: StartedInfo = await Informator.getStartedInfo({
				projectId,
				initContentPath,
				useApi,
			});
			ModulesLoader.load(scheme);
			Bridge.send(scheme, locales);
			BundleInjector.inject(initContentPath);
		}
	}

	WDFL.run().catch(e => console.error(e));
}
