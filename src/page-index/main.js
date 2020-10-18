require('normalize.css/normalize.css');
require('../css/main.css');
require('./page.css');
import { validation, asyncValidation } from '../js/validation';
import IndexView from './index.view';
import IndexModel from './index.model';

document.addEventListener('DOMContentLoaded', () => {
  new IndexController(new IndexModel(), new IndexView());
});

class IndexController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.onBookmarkListChanged(this.model.bookmarks);

    this.view.bindAddBookmark(
      this.handleAddBookmark.bind(this),
      this.setFormError.bind(this)
    );
    this.view.bindFocusInput(this.setFormError.bind(this));
  }

  async handleValidation(bookmarkText, handleError) {
    return await asyncValidation(
      bookmarkText,
      this.handleToggleLoader
    ).catch((error) => handleError(error));
  }

  async handleAddBookmark(bookmarkText) {
    if (!validation(bookmarkText)) {
      return this.setFormError('please enter url in valid format');
    }
    if (this.model.checkForExistingBookmark(bookmarkText)) {
      return this.setFormError('oops! that bookmark is already in your list');
    }
    this.handleToggleLoader({ showLoader: true });
    const validUrl = await asyncValidation(bookmarkText);
    this.handleToggleLoader({ showLoader: false });
    if (!validUrl) {
      return this.setFormError('url cannot be verified');
    }

    history.pushState({}, 'results', `results.html?saved-url=${bookmarkText}`);
    location.reload();
  }

  setFormError = (error) => {
    this.model.setFormError(error, this.renderFormError.bind(this));
  };

  renderFormError = () => {
    this.view.renderErrorMessage(this.model.error);
  };

  handleToggleLoader = (showLoader) => {
    console.log(showLoader);
    this.view.toggerLoader(showLoader);
  };

  onBookmarkListChanged = (bookmarks) => {
    this.view.displayBookmarks(
      bookmarks,
      this.handleDeleteBookmark.bind(this),
      this.handleValidation.bind(this),
      this.handleEditBookmark.bind(this)
    );
  };

  handleDeleteBookmark = (bookmark) => {
    this.model.deleteBookmark(bookmark, this.onBookmarkListChanged);
  };

  handleEditBookmark = (bookmark, bookmarkText) => {
    this.model.editBookmark(bookmark, bookmarkText, this.onBookmarkListChanged);
  };
}
