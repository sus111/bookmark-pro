require('../../css/main.css');
require('./main.css');
import { parsedBookmarksFromLocalStorage } from '../../js/helpers/localStorage';
import { getElementById } from '../../js/helpers/dom';
import { validation } from '../../js/helpers/validation';

class Pagination {
  constructor(bookmarks, deleteHandler, editHandler) {
    this.deleteBookmarkHandler = deleteHandler;
    this.bookmarkEditHandler = editHandler;
    this.bookmarks = bookmarks;
    this.paginationComponent = document.querySelectorAll('.pagination');
    this.prevButton = getElementById('button-prev');
    this.nextButton = getElementById('button-next');

    this.currentPage = 1;
    this.itemsPerPage = 20;
    this.activeBookmark;
    this.activeListItem;
    this.init();
  }

  init = () => {
    this.setupPaginationComponent();
    this.addEventListeners();
  };

  setupPaginationComponent = () => {
    this.showPagination();
    this.renderCurrentPage(1);
    this.renderPageButtons();
    this.updateNumberButtonOpacity();
  };

  addEventListeners = () => {
    this.prevButton.addEventListener('click', this.handlePreviousPageClick);
    this.nextButton.addEventListener('click', this.handleNextPageClick);
    this.handleNumberClick();
    // TODO: create func. for these 2:
    document
      .querySelectorAll('.delete-button')
      .forEach((button) =>
        button.addEventListener('click', (event) =>
          this.handleDeleteClick(event)
        )
      );
    document
      .querySelectorAll('.edit-button')
      .forEach((button) =>
        button.addEventListener('click', (event) => this.handleEditClick(event))
      );
  };

  showPagination = () =>
    this.paginationComponent[0].classList.remove('pagination--hide');

  returnPagesTotal = () => Math.ceil(this.bookmarks.length / this.itemsPerPage);

  renderCurrentPage = (page) => {
    const bookmarkList = document.querySelectorAll('.bookmark-list')[0];
    bookmarkList.innerHTML = '';
    page < 1 ? 1 : this.returnPagesTotal();

    // TODO: rewrite using forEach
    for (
      var i = (page - 1) * this.itemsPerPage;
      i < page * this.itemsPerPage && i < this.bookmarks.length;
      i++
    ) {
      bookmarkList.innerHTML += this.renderBookmarkItem(
        this.bookmarks[i].text,
        i,
        this.bookmarks[i].id
      );
    }

    this.updateChevronButtonsOpacity();
    this.updateNumberButtonOpacity();
  };

  renderPageButtons = () => {
    let pageNumber = document.getElementById('page-number');
    pageNumber.innerHTML = '';

    [...Array(this.returnPagesTotal())].forEach((item, index) => {
      pageNumber.innerHTML += `<span class="click-page-number">${
        index + 1
      }</span>`;
    });
  };

  updateNumberButtonOpacity = () => {
    let pageNumber = document
      .getElementById('page-number')
      .getElementsByClassName('click-page-number');

    for (let i = 0; i < pageNumber.length; i++) {
      if (i == this.currentPage - 1) {
        pageNumber[i].style.opacity = '1.0';
      } else {
        pageNumber[i].style.opacity = '0.5';
      }
    }
  };

  updateChevronButtonsOpacity = () => {
    this.currentPage == 1
      ? this.prevButton.classList.add('opacity')
      : this.prevButton.classList.remove('opacity');

    this.currentPage == this.returnPagesTotal()
      ? this.nextButton.classList.add('opacity')
      : this.nextButton.classList.remove('opacity');
  };

  renderBookmarkItem = (url, currentIndex, bookmarkId) => `
    <div class='bookmark-item' id="${bookmarkId}">
      <span id="bookmark-text" class="bookmark-text" contenteditable="false">
        <a href=//${url} target="_blank" rel=”noreferrer noopener">${url}</a>
      </span>
      <span class="button-wrapper">
        <span><button class="edit-button" id="${currentIndex}"><img src="./src/img/svg/edit.svg" id="${currentIndex}" /></button></span>
        <span><button class="delete-button" id="${currentIndex}"><img src="./src/img/svg/delete.svg" id="${currentIndex}" /></button></span>
      </span>
    </div>`;

  handlePreviousPageClick = () => {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.renderCurrentPage(this.currentPage);
    }
  };

  handleNextPageClick = () => {
    if (this.currentPage < this.returnPagesTotal()) {
      this.currentPage++;
      this.renderCurrentPage(this.currentPage);
    }
  };

  handleNumberClick = () => {
    const pageNumber = document.getElementById('page-number');

    pageNumber.addEventListener('click', (event) => {
      this.currentPage = event.target.textContent;
      this.renderCurrentPage(this.currentPage);
    });
  };

  setActiveListItem = (buttonIndex) => {
    this.activeListItem = document.querySelectorAll('.bookmark-item')[
      buttonIndex
    ];
  };

  updatedUrl = () => this.activeListItem.children[0].textContent.trim();

  handleDeleteClick = (event) => {
    const buttonIndex = parseInt(event.target.id);
    this.setActiveListItem(buttonIndex);
    this.deleteBookmarkHandler(this.updatedUrl());
  };

  setActiveBookmark = (buttonIndex) => {
    const bookmarkItems = document.querySelectorAll('.bookmark-item');
    const bookmarkId = bookmarkItems[buttonIndex].id;
    this.activeBookmark = parsedBookmarksFromLocalStorage().filter(
      (bookmark) => bookmark.id === parseInt(bookmarkId)
    )[0];
  };

  handleEditBlur = (activeTextItem, activeEditButton, activeDeleteButton) => {
    activeTextItem.addEventListener('blur', (event) => {
      // TODO: refactor all repeated code from handleEditClick
      // check targetsToIgnore

      const targetsToIgnore = ['save-button', 'edit-button', 'delete-button'];
      if (!targetsToIgnore.includes(event.target.class)) {
        const urlMatchesPattern = validation(activeTextItem.textContent);

        if (urlMatchesPattern) {
          activeTextItem.removeAttribute('contenteditable', 'true');
          activeTextItem.removeAttribute('class', 'contenteditable');
          activeEditButton.setAttribute('class', 'edit-button');
          activeDeleteButton.disabled = false;

          this.bookmarkEditHandler(this.activeBookmark, this.updatedUrl());
        }
      }
    });
  };

  handleEditClick = (event) => {
    const buttonIndex = parseInt(event.target.id);
    this.setActiveBookmark(buttonIndex);
    this.setActiveListItem(buttonIndex);

    // make text content editable
    const activeTextItem = this.activeListItem.children[0];
    const activeEditButton = this.activeListItem.querySelectorAll(
      '.edit-button'
    )[0];
    const activeDeleteButton = this.activeListItem.querySelectorAll(
      '.delete-button'
    )[0];
    activeDeleteButton.disabled = true;

    // TODO: refactor into toggle attributes func.
    activeTextItem.setAttribute('contenteditable', 'true');
    activeTextItem.setAttribute('class', 'contenteditable');
    // make edit button a save button and add event listener
    if (activeEditButton) {
      activeEditButton.textContent = 'save';
      activeEditButton.setAttribute('class', 'save-button');
    }
    activeTextItem.focus();

    this.handleEditBlur(activeTextItem, activeEditButton, activeDeleteButton);
  };
}

export default Pagination;
