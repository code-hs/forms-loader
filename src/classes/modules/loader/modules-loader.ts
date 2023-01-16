import {Store} from '../../store';
import {Module} from '../../structure';
import {ModuleLoader} from './module-loader';

export class ModulesLoader {
	static load(): void {
		const {scheme} = Store;
		if (!scheme || !scheme.config || !scheme.config.modules) return;

		scheme.config.modules.forEach((module: Module) => {
			if (!module || !module.name) return;
			if (module.enable === false) return;

			new ModuleLoader(module);
		});
	}
}
