import {templates, select} from './settings.js';
import Form from './components/Form.js';


/* hamburger */

const inputCheck = document.querySelector(select.htmlItems.toggler);

	inputCheck.addEventListener('change', function(e){
		e.preventDefault();

		if (inputCheck.checked === true ){
			document.querySelector(select.htmlItems.navUl).classList.add(select.classesNames.visible);
		} else {
			// console.log('uncheck');
			document.querySelector(select.htmlItems.navUl).classList.remove(select.classesNames.visible);
		}
	});

	const app = {
		initPages: function(){
	
			const thisApp = this;
	
			/*select children of id="pages" */
			thisApp.pages = document.querySelector('#pages').children;
			// console.log('children', thisApp.pages);
	
			/*get all links from nav */
			thisApp.navLinks = document.querySelectorAll(select.htmlItems.navItem);
			// console.log('links', thisApp.navLinks);
	
			/* page activation method */
			const idFromHash = window.location.hash.replace('#/','');
	
			let pageMatchingHash = thisApp.pages[0].id;
			// console.log('matching hash', pageMatchingHash);
	
			for(let page of thisApp.pages) {
				if(page.id === idFromHash) {
					pageMatchingHash = page.id;
					// console.log('matching hash 2', pageMatchingHash);
					break;
				}
			}
	
			thisApp.activatePage(pageMatchingHash);

			/* add eventlistneres to links */
			for (let link of thisApp.navLinks){
				link.addEventListener('click', function(e){
					e.preventDefault();
	
					/* get id from href  .replace('#', '') will remove #*/
					const id = this.getAttribute('href').replace('#', '');
					/* run activatePage with href attribute */
					thisApp.activatePage(id);
					
					/* change urls hash */
					window.location.hash = '#' + id;

				});
			}
		},
	
		activatePage: function(pageId) {
			const thisApp = this;
			
			/* toggle active class to matching page */
			for(let page of thisApp.pages){
				page.classList.toggle('active', page.id === pageId);
			}
	
			/* add class active to matching links and remove active */
			for(let link of thisApp.navLinks){
				link.classList.toggle('active', link.getAttribute('href') === '#' + pageId);
      }

      const generalTemplate = document.querySelector(select.pages.general);

      const getId = generalTemplate.getAttribute('id');
      if(getId === pageId && generalTemplate.classList.contains('active')){
        const generateHTML = templates.generalTab();
        const generalContainer = generalTemplate;
        generalContainer.innerHTML = generateHTML;
      }
		},

		initForm: function() {
			const	thisApp = this;
			const formContainer = document.querySelector(select.pages.personal);
			thisApp.from = new Form(formContainer);
		},

		init: function() {
			
			console.log('*** App starting ***');
			
			// this.initTemplates();
      this.initPages();
      
			this.initForm();
		}
	};

	app.init();