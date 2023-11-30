import '@fortawesome/fontawesome-free/css/all.css'
import './css/style.css';

const Modal = require('./components/Modal.js');
const IdeaForm = require('./components/IdeaForm.js');
const IdeaList = require('./components/IdeaList.js');

new Modal();
const ideaList = new IdeaList();
const ideaForm = new IdeaForm(ideaList);
ideaForm.render();