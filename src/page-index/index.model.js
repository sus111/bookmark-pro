import {
  parsedBookmarksFromLocalStorage,
  setBookmarksLocalStorage,
} from '../js/helpers/localStorage';

class IndexModel {
  constructor() {
    this.bookmarks = parsedBookmarksFromLocalStorage() || [];
    this.error = '';
  }

  setBookmarks = () => setBookmarksLocalStorage(this.bookmarks);

  checkForExistingBookmark = (bookmarkText) => {
    return this.bookmarks.find((bookmark) => bookmark.text === bookmarkText);
  };

  addBookmark = (text) => {
    const id =
      this.bookmarks.length > 0
        ? this.bookmarks[this.bookmarks.length - 1].id + 1
        : 1;
    this.bookmarks.push({
      id,
      text,
    });

    this.setBookmarks();
  };

  setFormError = (error, renderError) => {
    this.error = error;
    renderError();
  };

  deleteBookmark = (bookmarkDeleted, renderBookmarks) => {
    this.bookmarks = this.bookmarks.filter(
      (bookmark) => bookmark.text !== bookmarkDeleted
    );
    this.setBookmarks(this.bookmarks);
    renderBookmarks(this.bookmarks);
  };

  // Map through all bookmarks, and replace the text of the bookmark with the specified id
  editBookmark = (bookmarkEdited, updatedText, renderBookmarks) => {
    this.bookmarks = this.bookmarks.map((bookmark) =>
      bookmark.text === bookmarkEdited.text
        ? { id: bookmark.id, text: updatedText }
        : bookmark
    );
    this.setBookmarks(this.bookmarks);
    renderBookmarks(this.bookmarks);
  };
}

export default IndexModel;
