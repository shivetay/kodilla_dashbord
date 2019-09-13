import {select, templates} from '../settings.js';

class Link {
	constructor(element) {
		const thisLink = this;

		thisLink.getElements(element);

	}

	getElements(element) {

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
			
				/*get container */
        const container = document.querySelector(`#${classId}`);
				// container.appendChild(thisLink.dom.wrapper);
				container.innerHTML = generatHtml;
      }
    }
  }
}

export default Link;