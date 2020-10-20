import 'regenerator-runtime/runtime';

/**
 * urlValidation - validate if paseed url is valid
 * @function
 * @param {string} url
 * @return {boolean}
 */
export const urlValidation = (url) => {
  /* eslint-disable */
  const urlRegex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  /* eslint-enable */
  return !!url.match(urlRegex);
};

/**
 * asyncValidation - check if url exists
 * @function
 * @param {string} url
 * @return {boolean}
 */
export const asyncValidation = async (url) => {
  // HACK: using proxy server to get around CORS issue
  // TODO: come up with better workaround
  const urlPrefix = 'https://cors-anywhere.herokuapp.com/';

  // strip out http:// or https://
  const httpsRegex = /^https?:\/\//;
  let formattedUrl = url;
  formattedUrl = url.match(httpsRegex) ? url.replace(httpsRegex, '') : url;

  const prefixedUrl = `${urlPrefix}${formattedUrl}`;

  return await fetch(prefixedUrl).then((response) => {
    // if HTTP-status is 200-299
    if (response.ok) {
      return true;
    }
  });
};
