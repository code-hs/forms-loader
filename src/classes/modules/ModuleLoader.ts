import {Module, Configurations} from '../structure';
import {DatepickerLoader} from './store/DatepickerLoader';

export class ModuleLoader {
	constructor(module: Module, config: Configurations) {
		switch (module.name) {
			case 'datepicker':
				DatepickerLoader.load(module, config);
				break;
			default:
				throw new Error(`ModuleLoader: Module ${module.name} not found`);
		}
	}
}
