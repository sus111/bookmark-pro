// get elements from DOM
export const getElementById = (id) => document.getElementById(id);
export const getElementByClass = (className) =>
  document.querySelector(className);

// Create an element with an optional CSS class
export const createElement = (tag, className) => {
  const element = document.createElement(tag);
  if (className) element.classList.add(className);

  return element;
};

export const returnQueryParameter = (parameter) => {
  const params = new URLSearchParams(document.location.search);
  return params.get(parameter);
};
