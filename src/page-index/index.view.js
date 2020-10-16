class IndexView {
  constructor() {
    this.input = this.getElement('#text');
    this.form = this.getElement('#form-add-bookmark');
  }

  getElement(selector) {
    const element = document.querySelector(selector);

    return element;
  }

  bindAddBookmark(handler) {
    this.form.addEventListener('submit', (event) => {
      event.preventDefault();

      const urlText = this.input.value;
      handler(urlText);
    });
  }

  bindFormValidationError(handler) {
    this.form.addEventListener(
      'invalid',
      function (e) {
        e.preventDefault();
        handler('Please enter url in valid format');
      },
      true
    );
  }

  renderBookmarkError(error) {
    alert(error);
  }
}

export default IndexView;
