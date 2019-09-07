import {templates, select} from './settings.js';


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

					thisApp.validateForm();
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
        
			const allTemplates = document.querySelectorAll(select.htmlItems.allPages); // eslint-disable-line no-unused-vars

			const allTemplatesObj = Array.from(allTemplates);
	
			for(let templatePage of allTemplatesObj) {
				if(templatePage.classList.contains('active')){
					const classId = templatePage.getAttribute('id');

						const generateHTML = templates[`${classId}Tab`](); 
						//generalTab()
						
						const generalContainer = document.querySelector(`#${classId}`);
						//inner html
						generalContainer.innerHTML = generateHTML;
				}
			}
		},

		validateForm: function() {
		
			const buttonSave = document.querySelector(select.htmlItems.btnSave);

			buttonSave.addEventListener('click', function(e){
				e.preventDefault();

				const formArr = document.querySelectorAll(select.htmlItems.formRerquaierd);

				for(let i = 0; i < formArr.length; i++){
					if(formArr[i].value === ''){
						console.log('puste');
					} else{
						console.log('pełne');
					}
				}
			});
		},


		init: function() {
			
			console.log('*** App starting ***');
			
			// this.initTemplates();
			this.initPages();
		}
	};

	app.init();