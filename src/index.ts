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
		// delete duplicated tags in html
		FormWorker.deleteDuplicates();

		const form: HTMLElement = FormWorker.getForm();
		// get params from html form in attributes
		const {projectId, page, initContentPath, useApi, dev}: FormParams = ParamsWorker.get(form);
		// check options
		ParamsWorker.validate({projectId, page, useApi});

		// get information (scheme, locales) for inject modules
		const {scheme, locales}: StartedInfo = await Informator.getStartedInfo({
			projectId,
			initContentPath,
			useApi,
		});
		// send data to the widget app (Player)
		Bridge.send(scheme, locales);
		// save scheme in store, for will use in init modules
		Store.scheme = scheme;

		DomLoader.initFilesContainer();
		ModulesLoader.load();
		BundleInjector.inject(initContentPath, dev);
	}
}

WDFL.run().catch(e => console.error(e));
