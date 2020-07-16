# Tools

- `eslint`: checks javascript files for both logic and formatting issues. We use
  `eslint-plugin-prettier` to implement the prettier ruleset as `eslint` errors
  allow us to use a single tool for both logic and formatting.
- `stylelint`: checks sass files for logic
- `prettier`: used for formatting on any non-JavaScript files (css, scss, josn,
  html, markdown, and yaml)

# Husky

- We use a combination of [`husky`](https://www.npmjs.com/package/husky), and
  [`lint-staged`](https://www.npmjs.com/package/lint-staged) to run our linting
  tools on staged files before commit
- Husky is used to hook into the `pre-commit` hook of git
- `lint-staged` takes over from there and determines which tool to run based on
  the staged file's file type

# Setting up a new project

1. Install the dependencies

```bash
yarn add --dev eslint prettier husky lint-staged stylelint stylelint-config-recommended-scss stylelint-scss prettier-config-carbon
```

1. Add the a `prettier.config.js` file with the following

```js
module.exports = require('prettier-config-carbon');
```

1. Add a `.stylelintrc` file with the following

```json
{
  "extends": "stylelint-config-recommended-scss",
  "rules": {
    "selector-pseudo-class-no-unknown": [
      true,
      {
        "ignorePseudoClasses": ["global", "local"]
      }
    ],
    "property-no-unknown": [
      true,
      {
        "ignoreProperties": ["composes"]
      }
    ]
  }
}
```

1. TODO: add eslint and vscode task settings

1. Add the following husky/lint-staged config to your `package.json`

   ```json
     "husky": {
       "hooks": {
         "pre-commit": "lint-staged"
       }
     },
     "lint-staged": {
       "*.js": [
         "eslint --fix"
       ],
       "*.{css,scss,json,html,yaml}": [
         "prettier --write"
       ],
       "*.{css,scss}": [
         "stylelint --fix"
       ]
     },
   ```

1. Add some scripts `package.json` to run the linting tools outside of just git
   commits

   ```json
     "scripts": {
       "format": "prettier --write \"**/*.{css,scss,json,html,yaml,md}\"",
       "lint:js": "eslint . --fix",
       "lint:styles": "stylelint \"packages/**/*.scss\" --fix",
     },
   ```
