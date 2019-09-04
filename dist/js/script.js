/* global Handlebars, Chart*/


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
  linkTab: Handlebars.compile(document.querySelector(select.wraperOf.link).innerHTML),
  bannerTab: Handlebars.compile(document.querySelector(select.wraperOf.banner).innerHTML),
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
            if(classId === 'general'){

              const generateHTML = templates.generalTab();
              const changeToHtml = utils.createDOMFromHTML(generateHTML);
              const generalContainer = document.querySelector(select.pages.general);
              generalContainer.appendChild(changeToHtml);

            } else if (classId === 'links'){
              /* generate html */
              const generateHTML = templates.linkTab();
             	// console.log(generateHTML, 'generate html');
            
            	const changeToHtml = utils.createDOMFromHTML(generateHTML);
            
             	/*insert to dom */
              const linkContainer = document.querySelector(select.pages.links);
                
              linkContainer.appendChild(changeToHtml);
            } else if(classId === 'banner'){
              /* generate html */
              const generateHTML = templates.bannerTab();

              const changeToHtml = utils.createDOMFromHTML(generateHTML);

              /*insert to dom */
              const linkContainer = document.querySelector(select.pages.banner);
                
              linkContainer.appendChild(changeToHtml);
            } else{

            }
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
  

/* canvas */

var canvas = document.getElementById('myChart');
var ctx = canvas.getContext('2d');

var chart = new Chart(ctx, { // eslint-disable-line no-unused-vars
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

