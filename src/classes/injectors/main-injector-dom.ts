import {config} from '../../config';

export class MainInjectorDom {
	static append(elem: Element): void {
		const container = document.getElementById(config.filesContainerId) as HTMLElement;
		container.append(elem);
	}
}
