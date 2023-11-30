const axios = require('axios');

class IdeasApi {
  constructor() {
    this.apiUrl = 'http://localhost:5000/api/ideas';
  }

  getIdeas() {
    return axios.get(this.apiUrl);
  }

  createIdea(data) {
    return axios.post(this.apiUrl, data);
  }

  updateIdea(id, data) {
    return axios.put(`${this.apiUrl}/${id}`, data);
  }

  deleteIdea(id) {
    let username = localStorage.getItem('username');
    username = username ? username : '';
    return axios.delete(`${this.apiUrl}/${id}`, {
      data: {username}
    });
  }
}

module.exports = new IdeasApi();