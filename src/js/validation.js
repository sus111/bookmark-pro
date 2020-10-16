import 'regenerator-runtime/runtime';

export const asyncValidation = async (url) => {
  // using proxy server in local development to get around CORS issue
  const isDev = process.env.NODE_ENV === 'development';
  const devUrlPrefix = 'https://cors-anywhere.herokuapp.com/';
  const prefixedUrl = isDev ? `${devUrlPrefix}${url}` : `${url}`;

  await fetch(prefixedUrl).then((response) => {
    // if HTTP-status is 200-299
    if (!response.ok) {
      throw 'url cannot be verified';
    }
  });
  return true;
};
