require('normalize.css/normalize.css');
require('../css/main.css');
require('./page.css');

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(document.location.search);
  const savedUrl = params.get('saved-url');
  const successMessage = `wohoo! ${savedUrl} has been added your bookmarks`;
  document.getElementById('success-text').textContent += successMessage;
});
