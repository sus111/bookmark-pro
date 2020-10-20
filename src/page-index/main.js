require('normalize.css/normalize.css');
require('../css/main.css');
require('./page.css');
import { isDev } from '../js/helpers/environment';
import { returnQueryParameter } from '../js/helpers/dom';
import { urlGenerator } from '../js/helpers/urlGenerator';
import { asyncValidation } from '../js/helpers/validation';
import IndexView from './index.view';
import IndexModel from './index.model';

document.addEventListener('DOMContentLoaded', () => {
  new IndexController(new IndexModel(), new IndexView());
});

/**
 * IndexController
 * @class
 */
class IndexController {
  /**
   * @constructor
   * @param {function} model
   * @param {function} view
   * @return {void}
   */
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // intialise page
    this.onBookmarkListChanged(this.model.bookmarks);
    this.bulkAddBookmarks();

    // add event listeners
    this.view.bindAddBookmark(
      this.addBookmark.bind(this),
      this.setFormError.bind(this)
    );
    this.view.bindFocusInput(this.setFormError.bind(this));
    this.view.bindFormValidationError(this.setFormError.bind(this));
  }

  /**
   * renderFormError - call view to render error message
   * @function
   * @return {void}
   */
  renderFormError = () => this.view.renderErrorMessage(this.model.error);

  /**
   * handleToggleLoader - call view to toggle spinner loader
   * @function
   * @param {function} showLoader
   * @return {void}
   */
  handleToggleLoader = (showLoader) => this.view.toggerLoader(showLoader);

  /**
   * onBookmarkListChanged - call view to render updated bookmarks
   * @function
   * @param {array} bookmarks
   * @return {void}
   */
  onBookmarkListChanged = (bookmarks) => {
    this.view.displayBookmarks(
      bookmarks,
      this.handleDeleteBookmark.bind(this),
      this.handleEditBookmark.bind(this)
    );
  };

  /**
   * setFormError - call model to update error message
   * @function
   * @param {string} error
   * @return {void}
   */
  setFormError = (error) =>
    this.model.setFormError(error, this.renderFormError.bind(this));

  /**
   * handleDeleteBookmark - call model to delete bookmark active bookmark
   * @function
   * @param {string} bookmark
   * @return {void}
   */
  handleDeleteBookmark = (bookmark) =>
    this.model.deleteBookmark(bookmark, this.onBookmarkListChanged);

  /**
   * handleEditBookmark - call model to edit bookmark with updated bookmarkText
   * @function
   * @param {object} bookmark
   * @param {string} bookmarkText
   * @return {void}
   */
  handleEditBookmark = (bookmark, bookmarkText) =>
    this.model.editBookmark(bookmark, bookmarkText, this.onBookmarkListChanged);

  /**
   * addBookmark - call model to add bookmark and push user to results page
   * @function
   * @param {string} bookmarkText
   * @param {boolean} isBulkAdd - no async validation or redirect
   * @return {void}
   */
  async addBookmark(bookmarkText, isBulkAdd = false) {
    if (this.model.checkForExistingBookmark(bookmarkText)) {
      this.handleToggleLoader({ showLoader: false });
      return this.setFormError('oops! that bookmark is already in your list');
    }

    if (!isBulkAdd) {
      this.handleToggleLoader({ showLoader: true });
      const validUrl = await asyncValidation(bookmarkText);
      this.handleToggleLoader({ showLoader: false });
      if (!validUrl) {
        return this.setFormError('url cannot be verified');
      }
    }

    this.model.addBookmark(bookmarkText);

    const devSuffix = isDev() ? '.html' : '';
    if (!isBulkAdd) {
      window.location.href = `results${devSuffix}?saved-url=${bookmarkText}`;
    }
  }

  /**
   * bulkAddBookmarks - call model to add bookmarks and view to render updated
   * bookmarks based on bulk-add query param
   * @function
   * @return {void}
   */
  bulkAddBookmarks = () => {
    const numberOfBookmarks = returnQueryParameter('bulk-add');
    if (numberOfBookmarks < 51) {
      urlGenerator(numberOfBookmarks).forEach((url) =>
        this.addBookmark(url, true)
      );
      this.onBookmarkListChanged(this.model.bookmarks);
    }
  };
}
