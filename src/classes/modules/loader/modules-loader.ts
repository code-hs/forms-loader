import {Store} from '../../store';
import {Module} from '../../structure';
import {ModuleLoader} from './module-loader';

export class ModulesLoader {
	static load(): void {
		// get scheme from store
		const {scheme} = Store;
		// check is has modules
		if (!scheme || !scheme.config || !scheme.config.modules) return;

		// init all active modules
		scheme.config.modules.forEach((module: Module) => {
			// check if module enable
			if (!module || !module.name) return;
			// noinspection PointlessBooleanExpressionJS
			if (module.enable === false) return;

			new ModuleLoader(module);
		});
	}
}
