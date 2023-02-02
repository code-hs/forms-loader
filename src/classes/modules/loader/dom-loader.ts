import {config} from '../../../config';

export class DomLoader {
	private readonly className: string;

	constructor(className: string = '') {
		this.className = className;
	}

	loadFileJS(url: string, cb: Function | null = null): void {
		if (!url) return;

		const container: HTMLScriptElement = document.createElement('script');
		container.type = 'text/javascript';
		container.src = url;
		container.className = this.getClassName();

		// @ts-ignore
		if (cb) container.onload = cb;

		this.append(container);
	}

	loadFileCSS(url: string): void {
		if (!url) return;

		const container: HTMLLinkElement = document.createElement('link');
		container.type = 'text/css';
		container.rel = 'stylesheet';
		container.media = 'all';
		container.href = url;
		container.className = this.getClassName();

		this.append(container);
	}

	private append(element: Element): void {
		const container = document.getElementById(config.filesContainerId) as HTMLElement;
		container.append(element);
	}

	private getClassName(): string {
		return `module-${this.className}`;
	}

	static initFilesContainer() {
		const filesContainer = document.createElement('div');
		// filesContainerId - used for append files in container
		filesContainer.id = config.filesContainerId;
		// add container to body bottom
		document.body.append(filesContainer);
	}
}
