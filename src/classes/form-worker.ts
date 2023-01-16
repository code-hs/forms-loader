import {config} from '../config';

type HTMLForms = HTMLCollectionOf<HTMLElement>;

export class FormWorker {
	/**
	 * delete  duplicated form tags
	 */
	static deleteDuplicates(): void {
		const forms: HTMLForms = this.getForms();

		// delete form tags, save only one form
		if (forms.length > 1) {
			for (let i = 1; i < forms.length; i++) {
				forms[i].remove();
			}
		}
	}

	static getForm(): HTMLElement {
		const forms: HTMLForms = this.getForms();
		return forms[0];
	}

	private static getForms(): HTMLForms {
		// @ts-ignore
		const forms: HTMLForms = document.getElementsByTagName(config.widgetTag);
		if (!forms || !forms.length) {
			throw new Error(`WDFL: Not found any tag ${config.widgetTag}`);
		}

		return forms;
	}
}
