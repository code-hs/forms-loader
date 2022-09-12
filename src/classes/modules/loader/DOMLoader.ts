export class DOMLoader {
	private readonly className: string;

	constructor(className: string = '') {
		this.className = className;
	}

	loadFileJS(url: string, cb: Function = null): void {
		if (!url) return;

		const container: HTMLScriptElement = document.createElement('script');
		container.type = 'text/javascript';
		container.async = false;
		container.src = url;
		container.className = this.className;

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
		container.className = this.className;

		this.append(container);
	}

	private append(element: Element): void {
		document.body.append(element);
	}
}
