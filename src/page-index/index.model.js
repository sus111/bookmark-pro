import {
  parsedBookmarksFromLocalStorage,
  setBookmarksLocalStorage,
} from '../js/helpers/localStorage';

/**
 * IndexModel
 * @class
 */
class IndexModel {
  /**
   * @constructor
   * @return {void}
   */
  constructor() {
    this.bookmarks = parsedBookmarksFromLocalStorage() || [];
    this.error = '';
  }

  /**
   * setBookmarks - add to local storage
   * @function
   * @return {void}
   */
  setBookmarks = () => setBookmarksLocalStorage(this.bookmarks);

  /**
   * checkForExistingBookmark
   * @function
   * @param {string} bookmarkText
   * @return {object} bookmark
   */
  checkForExistingBookmark = (bookmarkText) => {
    return this.bookmarks.find((bookmark) => bookmark.text === bookmarkText);
  };

  /**
   * addBookmark - add to this.bookmarks
   * @function
   * @param {string} text
   * @return {void}
   */
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

  /**
   * setFormError - set on this.error
   * @function
   * @param {string} error
   * @param {function} renderError
   * @return {void}
   */
  setFormError = (error, renderError) => {
    this.error = error;
    renderError();
  };

  /**
   * deleteBookmark - remove bookmark from this.bookmarks
   * @function
   * @param {string} bookmarkDeleted
   * @param {function} renderBookmarks
   * @return {void}
   */
  deleteBookmark = (bookmarkDeleted, renderBookmarks) => {
    this.bookmarks = this.bookmarks.filter(
      (bookmark) => bookmark.text !== bookmarkDeleted
    );
    this.setBookmarks(this.bookmarks);
    renderBookmarks(this.bookmarks);
  };

  /**
   * editBookmark - map over this.bookmarks and replace text of bookmarkEdited
   * @function
   * @param {string} bookmarkEdited
   * @param {string} updatedText
   * @param {function} renderBookmarks
   * @return {void}
   */
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
