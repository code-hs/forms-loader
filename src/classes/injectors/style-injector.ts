import {MainInjectorDom} from './main-injector-dom';

export class StyleInjector {
	static inject(initContentPath: string | undefined, dev: boolean | undefined): void {
		if (dev) {
			// player, styles - injected by vue serve
			// don't inject twice
			return;
		}

		if (!initContentPath) {
			return;
		}

		const styleUrl = `${initContentPath}/main.css`;
		const styleElem: HTMLLinkElement = this.generateScript(styleUrl);
		MainInjectorDom.append(styleElem);
	}

	private static generateScript(bundleUrl: string): HTMLLinkElement {
		const link = document.createElement('link');
		link.rel = 'stylesheet';
		link.type = 'text/css';
		link.href = bundleUrl;

		return link;
	}
}
