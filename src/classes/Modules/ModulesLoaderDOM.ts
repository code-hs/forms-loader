export class ModulesLoaderDOM {
	// static key: 'widget-form-loader-script-bundle';

	// static hasScriptInHead(): boolean {
	// 	return !!document.getElementById(this.key);
	// }

	static appendToHead(element: Element): void {
		document.querySelector('head').append(element);

		console.log('inject module');
	}

	// static removeFromHead(): void {
	// 	document.getElementById(this.key).remove();
	// }
}
