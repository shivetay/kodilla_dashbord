import {templates, select} from './settings.js';
import Form from './components/Form.js';
import Link from './components/Links.js';



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
			thisApp.pages = document.querySelector(select.pages.allPages).children;
	
			/*get all links from nav */
			thisApp.navLinks = document.querySelectorAll(select.htmlItems.navItem);
	
			/* page activation method */
			const idFromHash = window.location.hash.replace('#/','');
	
			let pageMatchingHash = thisApp.pages[0].id;
	
			for(let page of thisApp.pages) {
				if(page.id === idFromHash) {
					pageMatchingHash = page.id;
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
				thisApp.initChart();
			}
			
			thisApp.initLinks();
		},

		initChart: function() {
			const canvas = document.getElementById('myChart');
			const ctx = canvas.getContext('2d');

			const chart = new Chart(ctx, { // eslint-disable-line no-unused-vars
				// 1
				type: 'bar',
				data: {
					// 2
					labels: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10'],
					// 3
					datasets: [{
							// 4
							label: 'Signups',
							// 5
							backgroundColor: '#8DBEC8',
							borderColor: '#8DBEC8',
							// 6
							data: [ 52, 51, 41, 94, 26, 6, 72, 9, 21, 88 ],
					},
					{
							label: 'FTD',
							backgroundColor: '#F29E4E',
							borderColor: '#F29E4E',
							data: [ 6, 72, 1, 0, 47, 11, 50, 44, 63, 76 ],
					},
					{
							label: 'Earned',
							backgroundColor: '#71B374',
							borderColor: '#71B374',
							data: [ 59, 49, 68, 90, 67, 41, 13, 38, 48, 48 ],
							// 7
							hidden: true,
					}]
				},
			}); 
		},

		initForm: function() {
			const	thisApp = this;
			const formContainer = document.querySelector(select.pages.personal);
			thisApp.form = new Form(formContainer);
		},
		
    initLinks: function() {
      const thisApp = this;
      const linkContainer = document.querySelector(select.htmlItems.allPages);
      thisApp.link = new Link(linkContainer);
    },

		init: function() {
			
			console.log('*** App starting ***');
			
      this.initPages();
			this.initForm();
			this.initLinks();
		}
	};

	app.init();