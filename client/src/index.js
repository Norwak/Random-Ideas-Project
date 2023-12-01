import '@fortawesome/fontawesome-free/css/all.css'
import './css/style.css';

const Modal = require('./components/Modal.js');
const IdeaForm = require('./components/IdeaForm.js');
const IdeaList = require('./components/IdeaList.js');

new Modal('add-idea');
new Modal('edit-idea');
const ideaList = new IdeaList();
new IdeaForm(ideaList);