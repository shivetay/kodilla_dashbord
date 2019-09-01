{
	'user strict';

	const inputCheck = document.querySelector('.navigation__hamburger--toggler');

	inputCheck.addEventListener('change', function(e){
		e.preventDefault();

		if (inputCheck.checked === true ){
			document.querySelector('.navigation__item ul').classList.add('visible');
		} else {
			console.log('uncheck');
			document.querySelector('.navigation__item ul').classList.remove('visible');
		}
	});
}