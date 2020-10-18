require('../../css/main.css');
require('./main.css');
import { parsedBookmarksFromLocalStorage } from '../../js/helpers/localStorage';
import { getElementById } from '../../js/helpers/dom';

class Pagination {
  constructor(bookmarks, deleteHandler, validationHandler, editHandler) {
    this.deleteBookmarkHandler = deleteHandler;
    this.bookmarkValidationHandler = validationHandler;
    this.bookmarkEditHandler = editHandler;
    this.bookmarks = bookmarks;
    this.paginationComponent = document.querySelectorAll('.pagination');
    this.prevButton = getElementById('button-prev');
    this.nextButton = getElementById('button-next');

    this.pageNumber = getElementById('page-number');

    this.currentPage = 1;
    this.itemsPerPage = 3;
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
    this.handleEditBlur();
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

    if (page < 1) {
      page = 1;
    }
    if (page > this.returnPagesTotal() - 1) {
      page = this.returnPagesTotal();
    }

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
      <div contenteditable="false">
        ${url}
      </div>
      <div>
        <span><button class="edit-button" id="${currentIndex}">edit</button></span>
        <span><button class="delete-button" id="${currentIndex}">delete</button></span>
      </div>
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

  handleEditBlur = () => {};

  setActiveBookmark = (buttonIndex) => {
    const bookmarkItems = document.querySelectorAll('.bookmark-item');
    const bookmarkId = bookmarkItems[buttonIndex].id;
    this.activeBookmark = parsedBookmarksFromLocalStorage().filter(
      (bookmark) => bookmark.id === parseInt(bookmarkId)
    )[0];
  };

  handleEditClick = (event) => {
    const buttonIndex = parseInt(event.target.id);
    this.setActiveBookmark(buttonIndex);
    this.setActiveListItem(buttonIndex);

    // make text content editable
    const activeTextItem = this.activeListItem.children[0];
    activeTextItem.setAttribute('contenteditable', 'true');
    activeTextItem.setAttribute('class', 'contenteditable');
    activeTextItem.focus();

    // make edit button a save button and add event listener
    const activeEditButton = this.activeListItem.querySelectorAll(
      '.edit-button'
    )[0];
    activeEditButton.textContent = 'Save';
    activeEditButton.setAttribute('class', 'save-button');
    this.handleSaveClick();
  };

  handleSaveClick = () => {
    const saveButton = document.querySelectorAll('.save-button')[0];
    saveButton.addEventListener('click', (event) => {
      //   validate text
      const updatedUrl = this.updatedUrl();
      // try {
      //   this.bookmarkValidationHandler(updatedUrl);
      // } catch (error) {
      //   // keep contenteditable
      //   // underline red
      //   // keep saved button enabled
      // }
      this.bookmarkEditHandler(this.activeBookmark, updatedUrl);
    });
  };
}

export default Pagination;
