import {FormWorker} from './classes/FormWorker';
import {ParamsWorker} from './classes/ParamsWorker';
import {Informator} from './classes/informator/Informator';
import {Bridge} from './classes/Bridge';
import {BundleInjector} from './classes/bundleInjector/BundleInjector';
import {ModulesLoader} from './classes/modules/ModulesLoader';
import {FormParams, StartedInfo} from './classes/structure';
import {Store} from './classes/Store';

// Widget Form Loader
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
		Bridge.send(scheme, locales);
		Store.scheme = scheme;

		// added js files use async = false. Firstly load modules, then bundle
		ModulesLoader.load();
		BundleInjector.inject(initContentPath);
	}
}

WDFL.run().catch(e => console.error(e));
