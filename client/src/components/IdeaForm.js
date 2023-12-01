const IdeasApi = require('../services/IdeasApi.js');
const Toast = require('./Toast.js');

class IdeaForm {
  constructor(ideaList) {
    this.form = document.getElementById('add-idea-form');
    if (this.form === null) {
      console.error(`Error: Form "add-idea-form" wasn't found`);
      return;
    }

    this.ideaList = ideaList;
    this.loadUsername();
    this.addEventListeners();
  }

  loadUsername() {
    const usernameField = this.form.querySelector('input[name="username"]');
    if (usernameField === null) return;

    let username = localStorage.getItem('username');
    username = username ? username : '';

    usernameField.value = username;
  }

  async handleSubmit(e) {
    e.preventDefault();

    // TODO: user authentication

    const text = this.form.elements.text.value;
    const tag = this.form.elements.tag.value;
    const username = this.form.elements.username.value;

    if (!text || !tag || !username) {
      Toast.warningToast('Please enter all the fields');
      return;
    }

    // save user to localstorage
    localStorage.setItem('username', username);

    const idea = {text, tag, username}

    // Add idea to database
    const newIdea = await IdeasApi.createIdea(idea);

    if (newIdea.data.success === false) {
      Toast.errorToast('Something went wrong, please refresh the page');
      return;
    };

    // Add idea to list
    this.ideaList.addIdeaToList(newIdea.data.data);

    // Clear fields
    this.form.elements.text.value = '';
    this.form.elements.tag.value = '';

    document.dispatchEvent(new Event('closemodal'));

    Toast.successToast('Idea added');
  }

  addEventListeners() {
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
  }
}

module.exports = IdeaForm;