class Modal {
  constructor(name) {
    this.modalName = name;
    this.modal = document.querySelector(`.modal[data-name="${name}"]`);
    this.modalButton = document.querySelectorAll(`.modal-btn[data-name="${name}"]`);
    if (this.modal === null) {
      console.error(`Error: Modal "${name}" wasn't found`);
      return;
    }

    this.addEventListeners();
  }

  open() {
    this.modal.classList.add('active');
  }
  
  close() {
    this.modal.classList.remove('active');
  }

  outsideClick(e) {
    if (e.target === e.currentTarget) {
      this.close();
    }
  }

  addEventListeners() {
    for (const button of this.modalButton) {
      button.addEventListener('click', this.open.bind(this));
    }
    this.modal.addEventListener('click', this.outsideClick.bind(this));
    document.addEventListener('closemodal', this.close.bind(this));
  }
}

module.exports = Modal;