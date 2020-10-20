/**
 * getElementById - return DOM element with matching id
 * @function
 * @param {string} id
 * @return {HTMLElement}
 */
export const getElementById = (id) => document.getElementById(id);

/**
 * getElementBySelector - return DOM element with matching selector
 * @function
 * @param {string} className
 * @return {HTMLElement}
 */
export const getElementBySelector = (className) =>
  document.querySelector(className);

/**
 * createElement - create an element with an optional CSS class
 * @function
 * @param {string} elementType
 * @param {string} className
 * @return {HTMLElement}
 */
export const createElement = (elementType, className) => {
  const element = document.createElement(elementType);

  return className && element.classList.add(className);
};

/**
 * returnQueryParameter - return passed in query parameter
 * @function
 * @param {string} parameter
 * @return {string} paramater value
 */
export const returnQueryParameter = (parameter) => {
  const params = new URLSearchParams(document.location.search);
  return params.get(parameter);
};
