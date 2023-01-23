import {FormWorker} from './classes/form-worker';
import {ParamsWorker} from './classes/params-worker';
import {Informator} from './classes/informator/informator';
import {Bridge} from './classes/bridge';
import {BundleInjector} from './classes/bundle-injector/bundle-injector';
import {ModulesLoader} from './classes/modules/loader/modules-loader';
import {FormParams, StartedInfo} from './classes/structure';
import {Store} from './classes/store';
import {DomLoader} from './classes/modules/loader/dom-loader';

// Widget Form Loader
class WDFL {
	static async run() {
		FormWorker.deleteDuplicates();

		const form: HTMLElement = FormWorker.getForm();
		const {projectId, page, initContentPath, useApi, dev}: FormParams = ParamsWorker.get(form);
		ParamsWorker.validate({projectId, page, useApi});

		const {scheme, locales}: StartedInfo = await Informator.getStartedInfo({
			projectId,
			initContentPath,
			useApi,
		});
		Bridge.send(scheme, locales);
		Store.scheme = scheme;

		DomLoader.initFilesContainer();
		ModulesLoader.load();
		BundleInjector.inject(initContentPath, dev);
	}
}

WDFL.run().catch(e => console.error(e));
