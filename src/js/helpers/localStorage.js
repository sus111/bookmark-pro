/**
 * parsedBookmarksFromLocalStorage - return parsed bookmarks object
 * @function
 * @return {array} bookmarks
 */
export const parsedBookmarksFromLocalStorage = () =>
  JSON.parse(localStorage.getItem('bookmarks'));

/**
 * setBookmarksLocalStorage - set bookmarks on local storage object
 * @function
 * @param {array} bookmarks
 * @return {void}
 */
export const setBookmarksLocalStorage = (bookmarks) =>
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
