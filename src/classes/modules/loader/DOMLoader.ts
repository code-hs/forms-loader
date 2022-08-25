export class DOMLoader {
	static loadFileJS(url: string, cb: Function = null): void {
		if (!url) return;

		const container: HTMLScriptElement = document.createElement('script');
		container.type = 'text/javascript';
		container.async = false;
		container.src = url;

		// @ts-ignore
		if (cb) container.onload = cb;

		this.append(container);
	}

	static loadFileCSS(url: string): void {
		if (!url) return;

		const container: HTMLLinkElement = document.createElement('link');
		container.type = 'text/css';
		container.rel = 'stylesheet';
		container.media = 'all';
		container.href = url;

		this.append(container);
	}

	static append(element: Element): void {
		document.body.append(element);
	}
}
