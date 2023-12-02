const IdeasApi = require('../services/IdeasApi.js');
const Toast = require('./Toast.js');

class EditForm {
  constructor(ideaList) {
    this.form = document.getElementById('edit-idea-form');
    if (this.form === null) {
      console.error(`Error: Form "edit-idea-form" wasn't found`);
      return;
    }

    this.ideaList = ideaList;
    this.addEventListeners();
  }

  loadUsername() {
    let username = localStorage.getItem('username');
    return username ? username : '';
  }

  async handleSubmit(e) {
    e.preventDefault();

    // TODO: user authentication

    const id = this.form.elements.id.value;
    const text = this.form.elements.text.value;
    const tag = this.form.elements.tag.value;
    const username = this.loadUsername();

    if (!username) {
      Toast.errorToast('Error! Please reload the page');
      return;
    }

    if (!text || !tag) {
      Toast.warningToast('Please enter all the fields');
      return;
    }

    const idea = {text, tag, username}

    // Add idea to database
    const newIdea = await IdeasApi.updateIdea(id, idea);

    if (newIdea.data.success === false) {
      Toast.errorToast('Something went wrong, please refresh the page');
      return;
    };

    // Update idea in frontend
    this.ideaList.updateIdeaInList(newIdea.data.data);

    // Clear fields
    this.form.elements.text.value = '';
    this.form.elements.tag.value = '';

    document.dispatchEvent(new Event('closemodal'));

    Toast.successToast('Idea updated');
  }

  addEventListeners() {
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
  }
}

module.exports = EditForm;