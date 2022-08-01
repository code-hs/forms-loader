import {FormWorker} from './classes/FormWorker';
import {ParamsWorker} from './classes/ParamsWorker';
import {Bundler} from './classes/Bundler';
import {Informator} from './classes/Informator';
import {Bridge} from './classes/Bridge';
import {ScriptInjector} from './classes/ScriptInjector';
import {ModulesLoader} from './classes/ModulesLoader';

// Widget Form Loader
{
	class WDFL {
		static async run() {
			try {
				FormWorker.deleteDuplicates();
				const form = FormWorker.getForm();
				const {projectId, page, initContentPath, useApi} =
					ParamsWorker.get(form);
				ParamsWorker.validate({projectId, page, useApi});

				const {scheme, locales, bundleName} = await Informator.getStartedInfo({
					projectId,
					initContentPath,
					useApi,
				});
				ModulesLoader.load(scheme);
				Bridge.send(scheme, locales);

				const bundleUrl = Bundler.getLocalUrl(bundleName, initContentPath);
				ScriptInjector.injectBundle(bundleUrl, ScriptInjector.handleError);
			} catch (e) {
				console.error(e.message);
			}
		}
	}

	WDFL.run();
}
