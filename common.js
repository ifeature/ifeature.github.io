(function () {


  function sendMail () {
    var modals = document.querySelector('.js-modals');
    var modalForm = modals.querySelector('.js-form');

    modalForm.addEventListener('submit', function (event) {
      event.preventDefault();

      var name = modalForm.querySelector('#name');
      var email = modalForm.querySelector('#email');
      var message = modalForm.querySelector('#message');

      var data = {
        'key': '-8KIDsmWFMy7aZUBmrBVmw',
        'message': {
          'from_email': email.value,
          'to': [
          {
            'email': 'me@ifeature.net',
            'name': 'YOUR_RECEIVER_NAME',
            'type': 'to'
          }
          ],
          'subject': 'Новое сообщение от ' + name.value + '',
          'html': message.value
        }
      };



      var xhr = new XMLHttpRequest();
      xhr.open('post', 'https://mandrillapp.com/api/1.0/messages/send.json');

      xhr.addEventListener('readystatechange', function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
          console.log('Сообщение отправлено');
          alert('Спасибо, за проявленный интерес! Отвечу Вам в ближайшее время!');

          localStorage.setItem('name', name.value);
          localStorage.setItem('email', email.value);


          modals.style.display = 'none';
          name.value = '';
          email.value = '';
          message.value = '';
        }
      });

      xhr.send(JSON.stringify(data));


    });
}


function displayModal () {
  var openlink = document.querySelector('.js-modal-show');
  var modals = document.querySelector('.js-modals');

  var modalForm = modals.querySelector('.js-form');

  var name = modalForm.querySelector('#name');
  var email = modalForm.querySelector('#email');
  var message = modalForm.querySelector('#message');

  var closeLink = modals.querySelector('.js-modal-hide');

  var storage = {
    name: localStorage.getItem('name'),
    email: localStorage.getItem('email')
  };

  var local = {
    name: sessionStorage.getItem('name'),
    email: sessionStorage.getItem('email'),
    message: sessionStorage.getItem('message')
  };

  name.addEventListener('change', function () {
    sessionStorage.setItem('name', name.value);
  });

  email.addEventListener('change', function () {
    sessionStorage.setItem('email', email.value);
  });

  message.addEventListener('change', function () {
    sessionStorage.setItem('message', message.value);
  });

  openlink.addEventListener('click', function () {
    modals.classList.add('modals_show');
    document.body.classList.add('dimmed');

    window.addEventListener('scroll', function (event) {
      return false;
    });

    if (storage.name) {
      name.value = storage.name;
      email.focus();
    }
    if (storage.email) {
      email.value = storage.email;
      message.focus();
    } else {
      name.focus();
    }

    // if (local.name) {
    //   name.value = local.name;
    //   email.focus();
    // }
    // if (local.email) {
    //   email.value = local.email;
    //   message.focus();
    // }
    // if (local.message) {
    //   message.value = local.message;
    //   name.focus();
    // }

  });

  closeLink.addEventListener('click', function () {
    modals.classList.remove('modals_show');
    document.body.classList.remove('dimmed');
  });

  window.addEventListener('keydown', function (event) {
    if (event.keyCode == 27) {
      if (modals.classList.contains('modals_show')) {
        modals.classList.remove('modals_show');
        document.body.classList.remove('dimmed');
      }
    }
  });

  document.body.addEventListener('touchmove', function(e){ e.preventDefault(); });



}



sendMail();
displayModal();
})();

