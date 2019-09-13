import {select} from '../settings.js';



function closeModal() {
  document.querySelector(select.classesNames.overlay).classList.remove('show');
}

function overlaySelect() { // eslint-disable-line no-unused-vars
  document.querySelectorAll('#overlay .js--close-modal').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      closeModal();
      console.log('klik');
    });
  });

  document.addEventListener('click', function(e) {
    if(e.target === this) {
      closeModal();
    }
  });

  document.addEventListener('keyup', function(e) {
    if(e.keyCode === 27) {
      closeModal();
    }
  });
}

export function openModal(modal) { // eslint-disable-line no-unused-vars
  document.querySelectorAll('#overlay > *').forEach(function(modal) {
    modal.classList.remove('show');
  });
  document.querySelector('#overlay').classList.add('show');
  document.querySelector(modal).classList.add('show');
}

