const Toastify = require('toastify-js');

class Toast {
  constructor() {}

  static errorToast(message) {
    Toastify({
      text: message,
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "red",
      },
    }).showToast();
  }

  static warningToast(message) {
    Toastify({
      text: message,
      duration: 3000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "coral",
      },
    }).showToast();
  }

  static successToast(message) {
    Toastify({
      text: message,
      duration: 5000,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "green",
      },
    }).showToast();
  }
}

module.exports = Toast;