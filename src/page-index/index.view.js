import Pagination from '../partials/pagination/main';
import { createElement, getElementByClass } from '../js/helpers/dom';

class IndexView {
  constructor() {
    this.input = document.querySelector('#form-input');
    this.form = document.querySelector('#form-add-bookmark');

    this.listWrapper = document.querySelectorAll('.list-wrapper')[0];
  }

  resetInput = () => {
    this.input.value = '';
  };

  displayBookmarks = (bookmarks, deleteHandler, editHandler) => {
    if (bookmarks.length === 0) {
      // remove pagination component from DOM
      const bookmarkList = document.querySelector('.pagination');
      if (bookmarkList) {
        bookmarkList.remove();
      }

      // render no bookmarks messaging
      const h3 = (createElement('h3').textContent = 'No bookmarks');
      const p = createElement('p');
      p.textContent =
        'Any new bookmarks you add will appear here \n What are you waiting for?! Get adding';
      this.listWrapper.append(h3);
      this.listWrapper.append(p);
    } else {
      new Pagination(bookmarks, deleteHandler, editHandler);
    }
  };

  renderErrorMessage = (error) => {
    const errorTag = document.querySelector('.error-message');
    errorTag.textContent = error;
  };

  bindFocusInput = (setErrorHandler) => {
    this.input.addEventListener('focus', () => {
      setErrorHandler('');
    });
  };

  bindAddBookmark = (addBookmarkHandler, setErrorHandler) => {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      const urlText = this.input.value;
      this.resetInput();
      setErrorHandler('');

      addBookmarkHandler(urlText);
    });
  };

  toggerLoader = ({ showLoader }) => {
    const spinner = getElementByClass('.submit-spinner');
    const text = getElementByClass('.submit-text');

    if (showLoader) {
      spinner.setAttribute('style', 'display: block;');
      text.setAttribute('style', 'display: none;');
    } else {
      spinner.setAttribute('style', 'display: none;');
      text.setAttribute('style', 'display: block;');
    }
  };
}

export default IndexView;
