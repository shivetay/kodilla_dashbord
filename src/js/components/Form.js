
import {select} from '../settings.js';

class Form {
	constructor(element) {
	const	thisForm = this;

		thisForm.validateForm();
	}
	validateForm(){
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
	}
}

// const	validateForm = function() {
		
// 		const buttonSave = document.querySelector(select.htmlItems.btnSave);

// 		buttonSave.addEventListener('click', function(e){
// 			e.preventDefault();

// 			const formArr = document.querySelectorAll(select.htmlItems.formRerquaierd);

// 			for(let i = 0; i < formArr.length; i++){
// 				if(formArr[i].value === ''){
// 					console.log('puste');
// 				} else{
// 					console.log('pełne');
// 				}
// 			}
// 		});
// 	};


	export default Form;
