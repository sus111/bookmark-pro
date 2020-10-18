import randomWords from 'random-words';

export const urlGenerator = (number) =>
  randomWords(parseInt(number)).map((word) => `www.${word}.com`);
