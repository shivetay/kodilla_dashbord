
import {select, templates} from '../settings.js';
import utils from '../utils.js';

class Form {
	constructor(element) {
	const	thisForm = this;

    // thisForm.validateForm();
    thisForm.getElements(element);
    thisForm.validateForm();
	}
	
  getElements(element) {
    const thisForm = this;

    const generateHtml = templates.personalTab();

    thisForm.dom = {};
    thisForm.dom.wrapper = element;
    thisForm.dom.wrapper = utils.createDOMFromHTML(generateHtml);

    const formContainer = document.querySelector(select.pages.personal);
    console.log('container form', formContainer);
    formContainer.appendChild(thisForm.dom.wrapper);

    thisForm.dom.saveBtn = thisForm.dom.wrapper.querySelector(select.htmlItems.btnSave);

    thisForm.dom.name = thisForm.dom.wrapper.querySelector(select.formItems.name);
    thisForm.dom.surname = thisForm.dom.wrapper.querySelector(select.formItems.surname);
    thisForm.dom.mail = thisForm.dom.wrapper.querySelector(select.formItems.mail);
    thisForm.dom.phone = thisForm.dom.wrapper.querySelector(select.formItems.phone);
    thisForm.dom.skype = thisForm.dom.wrapper.querySelector(select.formItems.skype);
    thisForm.dom.icq = thisForm.dom.wrapper.querySelector(select.formItems.icq);
    thisForm.dom.msn = thisForm.dom.wrapper.querySelector(select.formItems.msn);
    thisForm.dom.wallet = thisForm.dom.wrapper.querySelector(select.formItems.wallet);
    thisForm.dom.password = thisForm.dom.wrapper.querySelector(select.formItems.password);
    thisForm.dom.repeat = thisForm.dom.wrapper.querySelector(select.formItems.repeat);
  }
  
	validateForm(){
    const thisForm = this;
    
		thisForm.dom.saveBtn.addEventListener('click', function(e){
      e.preventDefault();

      thisForm.sendOrder();
		});
  }

  sendOrder(){
    const thisForm = this;
    const url = select.db.url + '/' + select.db.form;
    console.log('url', url);

    const payload = {
     name: thisForm.dom.name.value,
     surname: thisForm.dom.surname.value,
     mail: thisForm.dom.mail.value,
     phone: thisForm.dom.phone.value,
     skype: thisForm.dom.skype.value,
     icq: thisForm.dom.icq.value,
     msn: thisForm.dom.msn.value,
     wallet: thisForm.dom.wallet.value,
     password: thisForm.dom.password.value,
    };
    console.log('payload', payload);

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    };
    fetch(url, options)
      .then(function(response){
        return response.json();
      }).then(function(parsedResponse){
        console.log('parsedresponse', parsedResponse);
      });
  }
}

export default Form;
