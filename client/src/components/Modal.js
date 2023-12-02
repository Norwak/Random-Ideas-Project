class Modal {
  constructor(name) {
    this.modalName = name;
    this.modal = document.querySelector(`.modal[data-name="${name}"]`);
    this.modalButton = document.querySelectorAll(`.modal-btn[data-name="${name}"]`);
    if (this.modal === null) {
      console.error(`Error: Modal "${name}" wasn't found`);
      return;
    }

    if (name !== 'edit-idea') {
      this.addEventListeners();
    }
  }

  open(e) {
    this.modal.classList.add('active');

    if (this.modalName === 'edit-idea') {
      const card = e.currentTarget.parentElement;
      const text = card.querySelector('h3');
      const tag = card.querySelector('.tag');
      const ideaID = card.dataset.id;

      this.modal.querySelector('input[name="id"]').value = ideaID;
      this.modal.querySelector('textarea[name="text"]').value = text.innerHTML.trim();
      this.modal.querySelector('input[name="tag"]').value = tag.innerHTML.trim();
    }
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

  newItemEvents(list) {
    const newItemButton = list.querySelector(`.card:last-child .modal-btn[data-name="${this.modalName}"]`);

    newItemButton.addEventListener('click', this.open.bind(this));
  }
}

module.exports = Modal;