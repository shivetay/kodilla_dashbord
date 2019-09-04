

const app = {
	initPages: function(){

		const thisApp = this;

		/*select children of id="pages" */
		thisApp.pages = document.querySelector('#pages').children;
		console.log('children', thisApp.pages);

		/*get all links from nav */
		thisApp.navLinks = document.querySelectorAll('.navigation__item a');
		console.log('links', thisApp.navLinks);

		/* page activation method */
		const idFromHash = window.location.hash.replace('#/','');

		let pageMatchingHash = thisApp.pages[0].id;
		console.log('matching hash', pageMatchingHash);

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
			// if(pageId === 'home'){
			// 	link.classList.add(
			// 		classNames.helper.hide
			// 	);
			// } else {
			// 	link.classList.remove(
			// 		classNames.helper.hide
			// 	);
			}
		},

	init: function() {
		
		console.log('*** App starting ***');
		
		this.initPages();
		console.log('init pages', this.initPages);

	}
};

app.init();