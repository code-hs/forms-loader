import {FormWorker} from './classes/FormWorker';
import {ParamsWorker} from './classes/ParamsWorker';
import {Informator} from './classes/informator/Informator';
import {Bridge} from './classes/Bridge';
import {BundleInjector} from './classes/bundleInjector/BundleInjector';
import {ModulesLoader} from './classes/modules/ModulesLoader';
import {FormParams, StartedInfo} from './classes/structure';

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

		ModulesLoader.load(scheme, () => {
			// after load modules
			BundleInjector.inject(initContentPath);
		});
	}
}

// @ts-ignore
window.WDFL = WDFL;
WDFL.run().catch(e => console.error(e));
