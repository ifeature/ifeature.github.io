// (function () {
  function sendMail () {
    var form = document.querySelector('form');
    var message = form.querySelector('#message');
    var data = {
      'key': '-8KIDsmWFMy7aZUBmrBVmw',
      'message': {
        'from_email': 'message@ifeature.net',
        'to': [
        {
          'email': 'me@ifeature.net',
          'name': 'YOUR_RECEIVER_NAME',
          'type': 'to'
        }
        ],
        'subject': 'Сообщение',
        'html': message.value
      }
    };
    var xhr = new XMLHttpRequest();
    xhr.open('post', 'https://mandrillapp.com/api/1.0/messages/send.json');
    xhr.addEventListener('readystatechange', function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        console.log('Сообщение отправлено');
        alert('Спасибо, за проявленный интерес! Отвечу Вам в ближайшее время!');
        message.value = '';
      }
    });
    xhr.send(JSON.stringify(data));
  }

// })();

