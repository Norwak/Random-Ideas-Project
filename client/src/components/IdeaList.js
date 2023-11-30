const IdeasApi = require('../services/IdeasApi.js');

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
    return `
    <div class="card">
      <button class="delete"><i class="fas fa-times"></i></button>
      <h3>
        ${idea.text}
      </h3>
      <p class="tag ${tagClass}">${idea.tag.toUpperCase()}</p>
      <p>
        Posted on <span class="date">${idea.date}</span> by
        <span class="author">${idea.username}</span>
      </p>
    </div>
    `;
  }

  render() {
    this.ideaListEl.innerHTML = this.ideas.map((idea) => this.generateIdeaHTML(idea)).join('');
  }
}

module.exports = IdeaList;