import Pagination from '../partials/pagination/main';
import { getElementBySelector } from '../js/helpers/dom';
import spinnerSvg from '../img/svg/spinner.svg';

/**
 * IndexView
 * @class
 */
class IndexView {
  /**
   * @constructor
   * @return {void}
   */
  constructor() {
    this.input = getElementBySelector('#form-input');
    this.form = getElementBySelector('#form-add-bookmark');

    this.listWrapper = getElementBySelector('.list-wrapper');
  }

  /**
   * resetInput
   * @function
   * @return {void}
   */
  resetInput = () => (this.input.value = '');

  /**
   * displayBookmarks - render my bookmarks content
   * @function
   * @param {array} bookmarks
   * @param {function} deleteHandler
   * @param {function} editHandler
   * @return {void}
   */
  displayBookmarks = (bookmarks, deleteHandler, editHandler) => {
    if (bookmarks.length === 0) {
      this.listWrapper.innerHTML = `
        <h3>No bookmarks</h3>
        <p>Any new bookmarks you add will appear here</p>
        <p>What are you waiting for?! Get adding</p>
      `;
    } else {
      new Pagination(bookmarks, deleteHandler, editHandler);
    }
  };

  /**
   * renderErrorMessage - set error message in error element
   * @function
   * @param {string} error
   * @return {void}
   */
  renderErrorMessage = (error) => {
    const errorTag = getElementBySelector('.error-message');
    errorTag.textContent = error;
  };

  /**
   * bindFocusInput - reset error on focus of input element
   * @function
   * @param {function} setErrorHandler
   * @return {void}
   */
  bindFocusInput = (setErrorHandler) => {
    this.input.addEventListener('focus', () => {
      setErrorHandler('');
    });
  };

  /**
   * bindAddBookmark - handle form submission
   * @function
   * @param {function} addBookmarkHandler
   * @param {function} setErrorHandler
   * @return {void}
   */
  bindAddBookmark = (addBookmarkHandler, setErrorHandler) => {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();
      const urlText = this.input.value;
      this.resetInput();
      setErrorHandler('');

      addBookmarkHandler(urlText);
    });
  };

  /**
   * bindFormValidationError - handle invalid form input
   * @function
   * @param {function} setError
   * @param {function} toggleLoader
   * @return {void}
   */
  bindFormValidationError(setError, toggleLoader) {
    this.form.addEventListener(
      'invalid',
      function(e) {
        e.preventDefault();
        toggleLoader({ showLoader: false });
        setError('Please enter url in valid format');
      },
      true
    );
  }

  /**
   * toggerLoader - render / hide loading spinner
   * @function
   * @param {function} showLoader
   * @return {void}
   */
  toggerLoader = ({ showLoader }) => {
    const spinner = getElementBySelector('.submit-spinner');
    const text = getElementBySelector('.submit-text');

    if (showLoader) {
      spinner.setAttribute('src', `${spinnerSvg}`);
      spinner.setAttribute('style', 'display: block;');
      text.setAttribute('style', 'display: none;');
    } else {
      spinner.setAttribute('style', 'display: none;');
      text.setAttribute('style', 'display: block;');
    }
  };
}

export default IndexView;
