import {Module} from '../../types';
import {DatepickerLoader} from '../datepicker-loader';

export class ModuleLoader {
	constructor(module: Module) {
		// now only one module
		// init modules by name
		switch (module.name) {
			case 'datepicker':
				const moduleItem = new DatepickerLoader(module);
				moduleItem.load();
				break;
			default:
				throw new Error(`ModuleLoader: Module ${module.name} not found`);
		}
	}
}
