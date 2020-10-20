/**
 * validation - validate if paseed url is valid
 * @function
 * @param {string} url
 * @return {boolean}
 */
export const validation = (url) => {
  /* eslint-disable */
  const urlRegex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  /* eslint-enable */
  return url.match(urlRegex);
};
