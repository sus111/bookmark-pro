require('normalize.css/normalize.css');
require('../css/main.css');
require('./page.css');
import { returnQueryParameter } from '../js/helpers/dom';
import animation from '../img/animation/success';

document.addEventListener('DOMContentLoaded', () => {
  const savedUrl = returnQueryParameter('saved-url');
  document.querySelector('.bookmark-added').innerHTML += savedUrl;

  bodymovin.loadAnimation({
    container: document.getElementById('#success-animation'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: animation,
  });
});
