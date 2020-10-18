export const parsedBookmarksFromLocalStorage = () =>
  JSON.parse(localStorage.getItem('bookmarks'));

export const setBookmarksLocalStorage = (bookmarks) =>
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
