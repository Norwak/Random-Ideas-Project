import '@fortawesome/fontawesome-free/css/all.css'
import "toastify-js/src/toastify.css"
import './css/style.css';

const IdeaList = require('./components/IdeaList.js');
const AddForm = require('./components/AddForm.js');
const EditForm = require('./components/EditForm.js');
const Modal = require('./components/Modal.js');

const ideaList = new IdeaList();
new AddForm(ideaList);
new EditForm(ideaList);
new Modal('add-idea');