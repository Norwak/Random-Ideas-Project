const IdeasApi = require('../services/IdeasApi.js');

class IdeaForm {
  constructor(ideaList) {
    this.formModal = document.getElementById('form-modal');
    this.form = null;
    this.ideaList = ideaList;
  }

  async handleSubmit(e) {
    e.preventDefault();

    // TODO: user authentication

    const text = this.form.elements.text.value;
    const tag = this.form.elements.tag.value;
    const username = this.form.elements.username.value;

    if (!text || !tag || !username) {
      alert('Please enter all fields');
      return;
    }

    // save user to localstorage
    localStorage.setItem('username', username);

    const idea = {text, tag, username}

    // Add idea to database
    const newIdea = await IdeasApi.createIdea(idea);

    // Add idea to list
    this.ideaList.addIdeaToList(newIdea.data.data);

    // Clear fields
    this.form.elements.text.value = '';
    this.form.elements.tag.value = '';

    document.dispatchEvent(new Event('closemodal'));
  }

  addEventListeners() {
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  render() {
    const username = localStorage.getItem('username');
    this.formModal.innerHTML = `
    <form id="idea-form">
      <div class="form-control">
        <label for="idea-text">Enter a Username</label>
        <input type="text" name="username" id="username" value="${username ? username : ''}" />
      </div>
      <div class="form-control">
        <label for="idea-text">What's Your Idea?</label>
        <textarea name="text" id="idea-text"></textarea>
      </div>
      <div class="form-control">
        <label for="tag">Tag</label>
        <input type="text" name="tag" id="tag" />
      </div>
      <button class="btn" type="submit" id="submit">Submit</button>
    </form>
    `;
    this.form = document.getElementById('idea-form');
    this.addEventListeners();
  }
}

module.exports = IdeaForm;