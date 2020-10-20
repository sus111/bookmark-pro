# Bookmark Pro 📕📗📘

Bookmark your favourite websites like a pro 💃🏻

## View live: **https://secure-badlands-98686.herokuapp.com/**

This app is build in (plain html/css/javascript), compiled with Babel and assembled with webpack. It makes use of native technologies wherever possible (no JQuery! and no frameworks), uses html form validation and animated svgs. It is using MVC (model, view, controller) architecture.

## Prerequisites

- [Install `node` (comes with `npm`)](https://nodejs.org/). Suggested version in [.nvmrc](./.nvmrc) file, (set with `nvm use` if you have nvm installed)

## Development

- `npm i` - install dependencies
- `npm run dev` - start development server. project running on **http://localhost:3000/**
- `npm test` - run minimal tests (eg: lint javascript files)

## Production

- `npm run build` to prepare `html`, `css`, `js` files in `public/` directory
- `npm start` - run build and serve production files locally. runs on **http://localhost:5000/**

## Linting

- fix simple linting issues and view those needing more attention using `npm run lint:fix`
  This project is using `eslint-config-google` https://github.com/google/eslint-config-google to adhere to Google linting guidelines, in conjunction with ESLint's recommended rule set

## Manual Testing

Use query parameter ?bulk-add={number} at the end of the index url in order to bulk add random bookmarks (unvalidated, max. 50). It's not recommended to click on these links as their content / origin is unknown.

## Deployment

This project is hosted with Heroku, deploy by doing the following:

- install Heroku cli tool `brew tap heroku/brew && brew install heroku`
- `heroku create` if deploying for first time, create empty app on Heroku
- `git push heroku master` to update the build from master, or prefix master with another branch name to deploy code from another branch `git push heroku deploy:master`
- view build logs with `heroku logs --tail`

## Updates needed
- Links saved with http:// or https:// prefixes don’t work when you click from list. The colon is being stripped out by the browser, so this character needs to be encoded correctly
- When edit update fails validation, needs to be handled better in the UI
- Bulk adding urls doesn’t update UI when there are no bookmarks
- Enable saving after editing link using enter key up down event
