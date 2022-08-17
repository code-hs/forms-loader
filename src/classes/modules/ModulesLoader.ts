import {Scheme, Module} from '../structure';
import {ModuleLoader} from './ModuleLoader';

export class ModulesLoader {
	static load(scheme: Scheme): void {
		if (!scheme || !scheme.config || !scheme.config.modules) return;

		scheme.config.modules.forEach((module: Module) => {
			new ModuleLoader(module);
		});
	}
}
