import {Module} from '../../structure';
import {DatepickerLoader} from '../DatepickerLoader';

export class ModuleLoader {
	constructor(module: Module) {
		switch (module.name) {
			case 'datepicker':
				DatepickerLoader.load(module);
				break;
			default:
				throw new Error(`ModuleLoader: Module ${module.name} not found`);
		}
	}
}
