export const select = {
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
		btnSave: '.button--save',
		formRerquaierd: '.personal .req',
	},
	classesNames: {
		visible: 'visible',
	},
};

export const templates = {
	generalTab: Handlebars.compile(document.querySelector(select.wraperOf.general).innerHTML),
  linksTab: Handlebars.compile(document.querySelector(select.wraperOf.link).innerHTML),
  bannerTab: Handlebars.compile(document.querySelector(select.wraperOf.banner).innerHTML),
  personalTab: Handlebars.compile(document.querySelector(select.wraperOf.personal).innerHTML),
};