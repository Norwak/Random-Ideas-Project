const axios = require('axios');

class IdeasApi {
  constructor() {
    this.apiUrl = 'http://localhost:5000/api/ideas';
  }

  getIdeas() {
    return axios.get(this.apiUrl);
  }
}

module.exports = new IdeasApi();