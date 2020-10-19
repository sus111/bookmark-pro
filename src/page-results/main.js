require('normalize.css/normalize.css');
require('../css/main.css');
require('./page.css');
import { returnQueryParameter } from '../js/helpers/dom';
import animation from '../img/animation/success';
import bodymovin from '../js/bodymovin';

document.addEventListener('DOMContentLoaded', () => {
  // const savedUrl = history.state.savedUrl;
  // document.querySelector('.bookmark-added').innerHTML += savedUrl;

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
