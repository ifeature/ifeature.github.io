(function () {
  'use strict';

  function preventScroll () {
    document.body.addEventListener('touchmove', function (event) {
      event.preventDefault();
    });
  }

  function allowScroll () {
    document.body.addEventListener('touchmove', function (event) {
      return true;
    })
  }

  function parallaxing () {

    var wScroll = window.pageYOffset;
    var parallax = document.querySelector('.js-parallax');
    var parallaxHeading = parallax.childNodes[0];
    var parallaxParagraph = parallax.childNodes[1];
    var parallaxMore = parallax.childNodes[2];

    window.addEventListener('scroll', function () {
      if (this.innerWidth > 600 && this.pageYOffset < 600) {
        wScroll = this.pageYOffset; //window.scrollTop()
        var params = {
          translateYMore: Math.round(wScroll / 2),
          translateYLess: Math.round(wScroll / 4),
          blur: Math.round(wScroll / 10),
          opacityMore: 1-Math.floor(wScroll)/200,
          opacityLess: 1-Math.floor(wScroll)/300
        };

        parallaxHeading.setAttribute('style',
          'transform:translateY(' + params.translateYMore + '%);');

        parallaxParagraph.setAttribute('style',
          'opacity:' + params.opacityMore + ';transform:translate3d(0,0,0) translateY(' + params.translateYLess + '%);color:rgba(71,82,82,' + params.opacityMore + ');');

          // parallaxParagraph.setAttribute('style',
          //   'opacity:' + params.opacityMore + ';transform:translate3d(0,0,0);translateY(' + params.translateY + '%);-webkit-filter:blur(' + params.blur + 'px);filter:blur(' + params.blur + 'px);');

          parallaxMore.setAttribute('style',
            'opacity:' + params.opacityLess + ';');

        // console.log(wScroll);
      }
    });
  }

  function sendMail (modalForm, name, email, message) {
    var data = {
      'key': '-8KIDsmWFMy7aZUBmrBVmw',
      'message': {
        'from_email': email,
        'to': [
        {
          'email': 'me@ifeature.net',
          'name': 'YOUR_RECEIVER_NAME',
          'type': 'to'
        }
        ],
        'subject': 'Новое сообщение от ' + name + '',
        'html': message
      }
    };

    var xhr = new XMLHttpRequest();
    xhr.open('post', 'https://mandrillapp.com/api/1.0/messages/send.json');

    xhr.addEventListener('readystatechange', function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        console.log('Сообщение отправлено');
      }
    });

    xhr.send(JSON.stringify(data));

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

    modalForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var nameValue = name.value;
      var emailValue = email.value;
      var messageValue = message.value;

      sendMail(modalForm,nameValue,emailValue,messageValue);
      alert('Спасибо, за проявленный интерес! Отвечу Вам в ближайшее время!');

      localStorage.setItem('name', name.value);
      localStorage.setItem('email', email.value);

      modals.classList.remove('modals_show');
      document.body.classList.remove('dimmed');
      name .value= '';
      email.value = '';
      message.value = '';
    });

  }

  displayModal();
  parallaxing();
})();

