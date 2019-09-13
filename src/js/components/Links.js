import {select, templates} from '../settings.js';
import utils from '../utils.js';


class Link {
	constructor(element) {
		const thisLink = this;

		thisLink.getElements(element);
	}

	getElements(element) {
		const thisLink = this;

		/* get link/baner template */
		const allTemplates = document.querySelectorAll(select.htmlItems.allPages);
    /*create array */
		const templatesArr = Array.from(allTemplates);
		/* loop through array */
		for(let templatePage of templatesArr) {
			if(templatePage.classList.contains('active')) {
        const classId = templatePage.getAttribute('id');
				/*generate template name using cassID */
				const generatHtml = templates[`${classId}Tab`]();

				thisLink.dom = {};
				/*assing dom wrapper to element */
				thisLink.dom.wrapper = element;
				/* create dom from html */
				thisLink.dom.wrapper = utils.createDOMFromHTML(generatHtml);
				/*get container */
        const container = document.querySelector(`#${classId}`);
        container.appendChild(thisLink.dom.wrapper);
        
        thisLink.dom.btnAdd = thisLink.dom.wrapper.querySelector(select.htmlItems.btnAdd);
				thisLink.dom.overlayBack = document.querySelector(select.classesNames.overlay);
			}
		}
	}
}

export default Link;