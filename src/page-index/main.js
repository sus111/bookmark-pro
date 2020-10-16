require('normalize.css/normalize.css');
require('../css/main.css');
require('./page.css');
import { asyncValidation } from '../js/validation';
import IndexView from './index.view';
import IndexModel from './index.model';

document.addEventListener('DOMContentLoaded', () => {
  new IndexController(new IndexModel(), new IndexView());
});

class IndexController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.bindAddBookmark(this.handleAddBookmark.bind(this));
    this.view.bindFormValidationError(
      this.handleFormValidationError.bind(this)
    );
  }

  async handleAddBookmark(bookmarkText) {
    const urlIsValid = await asyncValidation(bookmarkText).catch((error) =>
      this.view.renderBookmarkError(error)
    );

    if (urlIsValid) {
      this.model.addBookmark(bookmarkText);

      history.pushState(
        {},
        'results',
        `results.html?saved-url=${bookmarkText}`
      );
      location.reload();
    }
  }

  handleFormValidationError(error) {
    this.view.renderBookmarkError(error);
  }
}
