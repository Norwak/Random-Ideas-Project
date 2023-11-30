import '@fortawesome/fontawesome-free/css/all.css'
import './css/style.css';

const Modal = require('./components/Modal.js');
const IdeaForm = require('./components/IdeaForm.js');

const modal = new Modal();
const ideaForm = new IdeaForm();
ideaForm.render();