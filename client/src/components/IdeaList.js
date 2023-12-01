const IdeasApi = require('../services/IdeasApi.js');
const Toast = require('./Toast.js');
const {format} = require('date-fns');
const Spinner = require('../img/spinner.gif');

class IdeaList {
  constructor() {
    this.ideaListEl = document.getElementById('idea-list');
    this.ideas = new Array();
    this.getIdeas();
    
    this.validTags = new Set();
    this.validTags.add('technology');
    this.validTags.add('software');
    this.validTags.add('business');
    this.validTags.add('education');
    this.validTags.add('health');
    this.validTags.add('inventions');
  }

  showSpinner(card) {
    const spinnerEl = card.querySelector('.spinner');
    if (spinnerEl === null) return;
    spinnerEl.classList.add('active');
  }

  hideSpinner(card) {
    const spinnerEl = card.querySelector('.spinner');
    if (spinnerEl === null) return;
    spinnerEl.classList.remove('active');
  }

  async deleteIdea(e) {
    const ideaID = e.currentTarget.parentElement.dataset.id;
    if (!ideaID) {
      Toast.errorToast('Something went wrong, please refresh the page.');
      return;
    }

    try {
      const ideaEl = this.ideaListEl.querySelector(`.card[data-id="${ideaID}"]`);
      if (ideaEl === null) {
        Toast.errorToast('Something went wrong, please refresh the page.');
        return;
      }

      this.showSpinner(ideaEl);

      const response = await IdeasApi.deleteIdea(ideaID);

      this.ideas = this.ideas.filter((idea) => idea._id !== ideaID);

      ideaEl.remove();
      Toast.successToast('Idea deleted');
    } catch (error) {
      console.log(error);
      Toast.errorToast('You cannot delete this idea');
    }
  }

  async getIdeas() {
    try {
      const response = await IdeasApi.getIdeas();
      this.ideas = response.data.data;
      this.init();
    } catch (error) {
      console.log(error);
    }
  }

  addIdeaToList(idea) {
    this.ideas.push(idea);
    const ideaHTML = this.generateIdeaHTML(idea);
    this.ideaListEl.insertAdjacentHTML('beforeend', ideaHTML);

    const button = this.ideaListEl.querySelector('.card:last-child button.delete');
    if (button !== null) {
      button.addEventListener('click', this.deleteIdea.bind(this));
    }
  }

  getTagClass(tag) {
    tag = tag.toLowerCase();
    if (this.validTags.has(tag)) {
      return `tag-${tag}`;
    } else {
      return '';
    }
  }

  generateIdeaHTML(idea) {
    const tagClass = this.getTagClass(idea.tag);
    let actions = '';
    if (idea.username === localStorage.getItem('username')) {
      actions = `<button class="edit" aria-label="Edit idea"><i class="fa-solid fa-pen" aria-hidden="true"></i></button><button class="delete" aria-label="Delete idea"><i class="fas fa-times" aria-hidden="true"></i></button><img src="${Spinner}" class="spinner">`;
    }
    const formattedDate = format(new Date(idea.date), 'dd.MM.yyyy');
    return `
    <article class="card${actions ? ' edit-controls' : ''}" data-id="${idea._id}">
      ${actions}
      <h3>
        ${idea.text}
      </h3>
      <p class="tag ${tagClass}">${idea.tag.toUpperCase()}</p>
      <footer class="card-footer">
        Posted on <span class="date">${formattedDate}</span> by
        <span class="author">${idea.username}</span>
      </footer>
    </article>
    `;
  }

  init() {
    this.ideaListEl.innerHTML = this.ideas.map((idea) => this.generateIdeaHTML(idea)).join('');

    for (const idea of this.ideaListEl.children) {
      const button = idea.querySelector('button.delete');
      if (button !== null) {
        button.addEventListener('click', this.deleteIdea.bind(this));
      }
    }
  }
}

module.exports = IdeaList;