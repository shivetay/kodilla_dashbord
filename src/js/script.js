/* global Handlebars */


/* classes */

const select = {
	wraperOf: {
		general: '#template-main-general',
    link: '#template-main-link',
    banner: '#template-main-banner',
    personal: '#template-main-personal',
	},
	pages: {
		general: '#general',
    links: '#links',
    banner: '#banner',
	},
	htmlItems: {
		navUl: '.navigation__item ul',
    toggler: '.navigation__hamburger--toggler',
    navItem: '.navigation__item a',
    allPages: '.template',
	},
	classesNames: {
		visible: 'visible',
	},
};

const templates = {
	generalTab: Handlebars.compile(document.querySelector(select.wraperOf.general).innerHTML),
  linksTab: Handlebars.compile(document.querySelector(select.wraperOf.link).innerHTML),
  bannerTab: Handlebars.compile(document.querySelector(select.wraperOf.banner).innerHTML),
  personalTab: Handlebars.compile(document.querySelector(select.wraperOf.personal).innerHTML),
};

const utils = {}; // eslint-disable-line no-unused-vars


utils.createDOMFromHTML = function(htmlString) {
  let div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
};


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

				// if(pageId === 'home'){
				// 	link.classList.add(
				// 		classNames.helper.hide
				// 	);
				// } else {
				// 	link.classList.remove(
				// 		classNames.helper.hide
				// 	);
        }
        
        const allTemplates = document.querySelectorAll(select.htmlItems.allPages); // eslint-disable-line no-unused-vars
        // const allTemplates = document.getAttribute('id');
        // console.log(allTemplates);

        const allTemplatesObj = Array.from(allTemplates);
        console.log(allTemplatesObj);
    
        for(let templatePage of allTemplatesObj) {
          if(templatePage.classList.contains('active')){
            const classId = templatePage.getAttribute('id');
            console.log('clasId', classId);
             const generateHTML = templates[`${classId}Tab`](); 
             //generalTab()
              
              const generalContainer = document.querySelector(`#${classId}`);
              //inner html
              generalContainer.innerHTML = generateHTML;
          }
        }
			},

		init: function() {
			
			console.log('*** App starting ***');
			
			// this.initTemplates();
      this.initPages();

		}
	};
	
  app.init();


