import {config} from '../config';

export class FormWorker {
	static getForms(): HTMLCollectionOf<HTMLElement> {
		// @ts-ignore
		const forms: HTMLCollectionOf<HTMLElement> = document.getElementsByTagName(
			config.widgetTag
		);
		if (!forms || !forms.length) {
			throw new Error(`WDFL: Not found any tag ${config.widgetTag}`);
		}

		return forms;
	}

	/**
	 * delete  duplicated form tags
	 */
	static deleteDuplicates() {
		const forms = this.getForms();

		// delete form tags, save only one form
		if (forms.length > 1) {
			for (let i = 1; i < forms.length; i++) {
				forms[i].remove();
			}
		}
	}

	static getForm(): HTMLElement {
		const forms = this.getForms();
		return forms[0];
	}
}
