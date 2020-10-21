require('../../css/main.css');
require('./main.css');
import { parsedBookmarksFromLocalStorage } from '../../js/helpers/localStorage';
import {
  getElementById,
  getElementBySelector,
  addClickHandlerMulipleElements } from '../../js/helpers/dom';
import { urlValidation } from '../../js/helpers/validation';
import { httpsRegex } from '../../js/helpers/regex';
import editSvg from '../../img/svg/edit.svg';
import deleteSvg from '../../img/svg/delete.svg';

/**
 * Pagination UI component
 * @class
 */
class Pagination {
  /**
   * @constructor
   * @param {array} bookmarks saved bookmarks
   * @param {function} deleteHandler
   * @param {function} editHandler
   * @return {void}
   */
  constructor(bookmarks, deleteHandler, editHandler) {
    this.deleteBookmarkHandler = deleteHandler;
    this.bookmarkEditHandler = editHandler;
    this.bookmarks = bookmarks;

    this.paginationComponent = getElementBySelector('.pagination');
    this.prevButton = getElementById('button-prev');
    this.nextButton = getElementById('button-next');

    // set state
    this.currentPage = 1;
    this.itemsPerPage = 20;
    this.activeBookmark;
    this.activeListItem;

    this.init();
  }

  /**
   * init - initialise pagination UI
   * @function
   * @return {void}
   */
  init = () => {
    this.setupPaginationComponent();
    this.addEventListeners();
  };

  /**
   * setupPaginationComponent - render pagination elements
   * @function
   * @return {void}
   */
  setupPaginationComponent = () => {
    this.showPagination();
    this.renderCurrentPage(1);
    this.renderPageButtons();
    this.updateNumberButtonOpacity();
  };

  /**
   * addEventListeners
   * @function
   * @return {void}
   */
  addEventListeners = () => {
    this.prevButton.addEventListener('click', this.handleIncrementPageClick);
    this.nextButton.addEventListener('click', this.handleDecrementPageClick);
    this.handleNumberClick();

    addClickHandlerMulipleElements('.edit-button', this.handleEditClick);
    addClickHandlerMulipleElements(
      '.delete-button',
      this.handleDeleteClick
    );
  };

  /**
   * showPagination - render pagination component in DOM
   * @function
   * @return {void}
   */
  showPagination = () =>
    this.paginationComponent.classList.remove('pagination--hide');

  /**
   * returnPagesTotal
   * @function
   * @return {number} pages total
   */
  returnPagesTotal = () => Math.ceil(this.bookmarks.length / this.itemsPerPage);

  /**
   * renderCurrentPage
   * @function
   * @param {number} page current page
   * @return {void}
   */
  renderCurrentPage = (page) => {
    const bookmarkList = getElementBySelector('.bookmark-list');
    bookmarkList.innerHTML = '';
    page < 1 ? 1 : this.returnPagesTotal();

    for (
      let index = (page - 1) * this.itemsPerPage;
      index < page * this.itemsPerPage && index < this.bookmarks.length;
      index++
    ) {
      bookmarkList.innerHTML += this.renderBookmarkItem(
        this.bookmarks[index].text,
        index,
        this.bookmarks[index].id
      );
    }

    this.updateChevronButtonsOpacity();
    this.updateNumberButtonOpacity();
  };

  /**
   * renderPageButtons
   * @function
   * @return {void}
   */
  renderPageButtons = () => {
    const pageNumber = getElementById('page-number');
    pageNumber.innerHTML = '';

    [...Array(this.returnPagesTotal())].forEach((item, index) => {
      pageNumber.innerHTML += `<span class="click-page-number">${
        index + 1
      }</span>`;
    });
  };

  /**
   * updateNumberButtonOpacity
   * @function
   * @return {void}
   */
  updateNumberButtonOpacity = () => {
    const pageNumber = document
      .getElementById('page-number')
      .getElementsByClassName('click-page-number');
    const pageNumberTotal = pageNumber.length;

    [...Array(pageNumberTotal)].forEach((item, index) => {
      if (index == this.currentPage - 1) {
        pageNumber[index].style.opacity = '1.0';
      } else {
        pageNumber[index].style.opacity = '0.5';
      }
    });
  };

  /**
   * updateChevronButtonsOpacity
   * @function
   * @return {void}
   */
  updateChevronButtonsOpacity = () => {
    this.currentPage == 1
      ? this.prevButton.classList.add('opacity')
      : this.prevButton.classList.remove('opacity');

    this.currentPage == this.returnPagesTotal()
      ? this.nextButton.classList.add('opacity')
      : this.nextButton.classList.remove('opacity');
  };

  /**
   * renderBookmarkItem
   * @function
   * @param {string} url
   * @param {number} currentIndex
   * @param {number} bookmarkId
   * @return {string}
   */
  renderBookmarkItem = (url, currentIndex, bookmarkId) => {
    const formattedUrl = !url.match(httpsRegex) ? `https://${url}` : url;

    return `
      <div class='bookmark-item' id="${bookmarkId}">
        <span id="bookmark-text" class="bookmark-text" contenteditable="false">
          <a href=${formattedUrl} target="_blank" rel=”noreferrer noopener">
            ${url}
          </a>
        </span>
        <span class="button-wrapper">
          <span><button class="edit-button" id="${currentIndex}">
            <img src=${editSvg} id="${currentIndex}" />
          </button></span>
          <span><button class="delete-button" id="${currentIndex}">
            <img src=${deleteSvg} id="${currentIndex}" />
          </button></span>
        </span>
      </div>`;
};

  /**
   * handleIncrementPageClick
   * @function
   * @return {void}
   */
  handleIncrementPageClick = () => {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.renderCurrentPage(this.currentPage);
    }
  };

  /**
   * handleDecrementPageClick
   * @function
   * @return {void}
   */
  handleDecrementPageClick = () => {
    if (this.currentPage < this.returnPagesTotal()) {
      this.currentPage++;
      this.renderCurrentPage(this.currentPage);
    }
  };

  /**
   * handleNumberClick
   * @function
   * @return {void}
   */
  handleNumberClick = () => {
    const pageNumber = getElementById('page-number');

    pageNumber.addEventListener('click', (event) => {
      this.currentPage = event.target.textContent;
      this.renderCurrentPage(this.currentPage);
    });
  };

  /**
   * setActiveListItem - set this.activeListItem from button click
   * @function
   * @param {number} buttonIndex
   * @return {void}
   */
  setActiveListItem = (buttonIndex) => {
    this.activeListItem = document.querySelectorAll('.bookmark-item')[
      buttonIndex
    ];
  };

  /**
   * updatedUrl - return updated url from text element
   * @function
   * @return {string} updatedUrl
   */
  updatedUrl = () => this.activeListItem.children[0].textContent.trim();

  /**
   * handleDeleteClick
   * @function
   * @param {Event} event
   * @return {void}
   */
  handleDeleteClick = (event) => {
    const buttonIndex = parseInt(event.target.id);
    this.setActiveListItem(buttonIndex);
    this.deleteBookmarkHandler(this.updatedUrl());
  };

  /**
   * setActiveBookmark - set this.activeBookmark with bookmark from
   * local storage
   * @function
   * @param {number} buttonIndex
   * @return {void}
   */
  setActiveBookmark = (buttonIndex) => {
    const bookmarkItems = document.querySelectorAll('.bookmark-item');
    const bookmarkId = bookmarkItems[buttonIndex].id;
    this.activeBookmark = parsedBookmarksFromLocalStorage().filter(
      (bookmark) => bookmark.id === parseInt(bookmarkId)
    )[0];
  };

  /**
   * handleEditBlur - save updated text on blur
   * @function
   * @param {HTMLElement} activeTextItem
   * @return {void}
   */
  handleEditBlur = (activeTextItem) => {
    activeTextItem.addEventListener('blur', () => {
      const urlMatchesPattern = urlValidation(activeTextItem.textContent);

      if (urlMatchesPattern) {
        this.bookmarkEditHandler(this.activeBookmark, this.updatedUrl());
      }
    });
  };

  /**
   * handleEditClick - make UI updates and add onblur event listener
   * @function
   * @param {event} event
   * @return {void}
   */
  handleEditClick = (event) => {
    const buttonIndex = parseInt(event.target.id);
    this.setActiveBookmark(buttonIndex);
    this.setActiveListItem(buttonIndex);

    // make text content editable
    const activeTextItem = this.activeListItem.children[0];
    const activeEditButton = this.activeListItem.querySelector(
      '.edit-button'
    );
    const activeDeleteButton = this.activeListItem.querySelector(
      '.delete-button'
    );

    // UI updates to edit & delete buttons and text element
    activeDeleteButton.disabled = true;
    if (activeEditButton) {
      activeEditButton.textContent = 'save';
      activeEditButton.setAttribute('class', 'save-button');
    }
    activeTextItem.setAttribute('contenteditable', 'true');
    activeTextItem.setAttribute('class', 'contenteditable');
    activeTextItem.focus();

    this.handleEditBlur(activeTextItem);
  };
}

export default Pagination;
