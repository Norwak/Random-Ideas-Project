const IdeasApi = require('../services/IdeasApi.js');
const {format} = require('date-fns');

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

  async deleteIdea(e) {
    const ideaID = e.currentTarget.parentElement.dataset.id;
    if (!ideaID) {
      alert('Something went wrong, please refresh the page.');
      return;
    }

    try {
      const response = await IdeasApi.deleteIdea(ideaID);

      this.ideas = this.ideas.filter((idea) => idea._id !== ideaID);

      const ideaEl = this.ideaListEl.querySelector(`.card[data-id="${ideaID}"]`);
      if (ideaEl !== null) ideaEl.remove();
    } catch (error) {
      console.log(error);
      alert('You cannot delete this resource');
    }
  }

  async getIdeas() {
    try {
      const response = await IdeasApi.getIdeas();
      this.ideas = response.data.data;
      this.render();
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
    let deleteButton = '';
    if (idea.username === localStorage.getItem('username')) {
      deleteButton = '<button class="delete"><i class="fas fa-times"></i></button>';
    }
    const formattedDate = format(new Date(idea.date), 'dd.MM.yyyy');
    return `
    <div class="card" data-id="${idea._id}">
      ${deleteButton}
      <h3>
        ${idea.text}
      </h3>
      <p class="tag ${tagClass}">${idea.tag.toUpperCase()}</p>
      <p>
        Posted on <span class="date">${formattedDate}</span> by
        <span class="author">${idea.username}</span>
      </p>
    </div>
    `;
  }

  render() {
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