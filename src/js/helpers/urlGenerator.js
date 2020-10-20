import randomWords from 'random-words';

/**
 * urlGenerator - return array of url strings containing random words
 * @function
 * @param {number} number
 * @return {array} string urls
 */
export const urlGenerator = (number) =>
  randomWords(parseInt(number)).map((word) => `www.${word}.com`);
