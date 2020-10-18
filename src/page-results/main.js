require('normalize.css/normalize.css');
require('../css/main.css');
require('./page.css');
import { returnQueryParameter } from '../js/helpers/dom';

document.addEventListener('DOMContentLoaded', () => {
  const savedUrl = returnQueryParameter('saved-url');
  const successMessage = `wohoo! ${savedUrl} has been added your bookmarks`;
  document.getElementById('success-text').textContent += successMessage;
});
