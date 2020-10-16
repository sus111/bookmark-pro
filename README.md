# Bookmarked

## Prerequisites

- [Install `node` (comes with `npm`)](https://nodejs.org/). Suggested version expressed in [.nvmrc](./.nvmrc) file.

## Development

- `npm i` - install dependencies
- `npm start` - start development server. project running on http://localhost:3000/
- `npm test` - run minimal tests (eg: lint javascript files)

## Production

- `npm run build` to prepare `html`, `css`, `js` files in `dist/` directory
- `npm run preview` - run build and serve production files locally

## Linting

This project is using `eslint-config-google` https://github.com/google/eslint-config-google to adhere to Google linting guidelines, in conjunction with ESLint's recommended rule set
