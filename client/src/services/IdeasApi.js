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
}

module.exports = new IdeasApi();