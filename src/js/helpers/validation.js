import 'regenerator-runtime/runtime';

export const validation = (url) => {
  const urlRegex = /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/;
  if (url.match(urlRegex)) {
    return true;
  }
};

export const asyncValidation = async (url) => {
  // using proxy server to get around CORS issue
  const urlPrefix = 'https://cors-anywhere.herokuapp.com/';

  // strip out http:// or https://
  // TODO: put in helper file
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
