require('normalize.css/normalize.css');
require('../css/main.css');
require('./page.css');
import lottie from 'lottie-web';
import {
  returnQueryParameter,
  getElementById,
  getElementBySelector} from '../js/helpers/dom';
import animation from '../img/animation/success';

document.addEventListener('DOMContentLoaded', () => {
  const savedUrl = returnQueryParameter('saved-url');
  getElementBySelector('.bookmark-added').innerHTML += savedUrl;

  lottie.loadAnimation({
    container: getElementById('#success-animation'),
    renderer: 'svg',
    loop: true,
    autoplay: true,
    animationData: animation,
  });
});
