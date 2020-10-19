require('normalize.css/normalize.css');
require('../css/main.css');
require('./page.css');
import { validation, asyncValidation } from '../js/helpers/validation';
import { returnQueryParameter } from '../js/helpers/dom';
import { urlGenerator } from '../js/helpers/urlGenerator';
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
    this.bulkAddBookmarks();

    this.view.bindAddBookmark(
      this.handleAddBookmark.bind(this),
      this.setFormError.bind(this)
    );
    this.view.bindFocusInput(this.setFormError.bind(this));
  }

  setFormError = (error) => {
    this.model.setFormError(error, this.renderFormError.bind(this));
  };

  renderFormError = () => {
    this.view.renderErrorMessage(this.model.error);
  };

  handleToggleLoader = (showLoader) => {
    this.view.toggerLoader(showLoader);
  };

  onBookmarkListChanged = (bookmarks) => {
    this.view.displayBookmarks(
      bookmarks,
      this.handleDeleteBookmark.bind(this),
      this.handleEditBookmark.bind(this)
    );
  };

  handleDeleteBookmark = (bookmark) => {
    this.model.deleteBookmark(bookmark, this.onBookmarkListChanged);
  };

  handleEditBookmark = (bookmark, bookmarkText) => {
    this.model.editBookmark(bookmark, bookmarkText, this.onBookmarkListChanged);
  };

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

    this.addBookmark(bookmarkText);
    // TODO: fix
    const devSuffix = process.env === 'development' ? '.html' : '';

    window.location.href = `results.html?saved-url=${bookmarkText}`;
    // window.location.href = `results?saved-url=${bookmarkText}`;
  }

  addBookmark = (bookmarkText) => {
    this.model.addBookmark(bookmarkText);
  };

  bulkAddBookmarks() {
    const numberOfBookmarks = returnQueryParameter('bulk-add');
    if (numberOfBookmarks < 51) {
      urlGenerator(numberOfBookmarks).forEach((url) => this.addBookmark(url));
      this.onBookmarkListChanged(this.model.bookmarks);
    }
  }
}
