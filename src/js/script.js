/* global Handlebars */


/* classes */

const select = {
	wraperOf: {
		general: '#template-main-general',
		link: '#template-main-link',
	},
	pages: {
		general: '#general',
		links: '#links',
	},
	htmlItems: {
		navUl: '.navigation__item ul',
		toggler: '.navigation__hamburger--toggler',
	},
	classesNames: {
		visible: 'visible',
	},
};

const templates = {
	generalTab: Handlebars.compile(document.querySelector(select.wraperOf.general).innerHTML),
	linkTab: Handlebars.compile(document.querySelector(select.wraperOf.link).innerHTML),
};

const utils = {}; // eslint-disable-line no-unused-vars


utils.createDOMFromHTML = function(htmlString) {
  let div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
};


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
			thisApp.navLinks = document.querySelectorAll('.navigation__item a');
			// console.log('links', thisApp.navLinks);
	
			/* page activation method */
			const idFromHash = window.location.hash.replace('#/','');
	
			let pageMatchingHash = thisApp.pages[0].id;
			console.log('matching hash', pageMatchingHash);
	
			for(let page of thisApp.pages) {
				if(page.id === idFromHash) {
					pageMatchingHash = page.id;
					console.log('matching hash 2', pageMatchingHash);
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

				// if(pageId === 'home'){
				// 	link.classList.add(
				// 		classNames.helper.hide
				// 	);
				// } else {
				// 	link.classList.remove(
				// 		classNames.helper.hide
				// 	);
				}
				if(pageId === 'general') {

					/* generate html */
					const generateHTML = templates.generalTab();
					// console.log(generateHTML, 'generate html');
			
					const changeToHtml = utils.createDOMFromHTML(generateHTML);
			
					/*insert to dom */
					const generalContainer = document.querySelector(select.pages.general);
					
					generalContainer.appendChild(changeToHtml);
				} else if(pageId === 'links') {
					/* generate html */
					const generateHTML = templates.linkTab();
					// console.log(generateHTML, 'generate html');
			
					const changeToHtml = utils.createDOMFromHTML(generateHTML);
			
					/*insert to dom */
					// const generalContainer = document.querySelector(select.pages.general);
					const linkContainer = document.querySelector(select.pages.links);
					
					linkContainer.appendChild(changeToHtml);
				}
			},

		init: function() {
			
			console.log('*** App starting ***');
			
			// this.initTemplates();
			this.initPages();
		}
	};
	
	app.init();
