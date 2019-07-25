# polyglot-po-loader

Webpack loader to load po file and convert them to polyglot json format
[readme](https://github.com/marmelab/polyglot-po/blob/master/packages/polyglot-po-loader/readme.md)

## Install

```bash
$ npm install -g polyglot-po-loader
# or
$ yarn global add polyglot-po-loader
```

## Usage

Add the csv-loader to your webpack configuration:

```js
const config = {
    module: {
        rules: [{
            test: /\.po$/,
            loader: 'polyglot-po-loader',
        }]
    }
```

### With create-react-app

You will need [react-app-rewired](https://github.com/timarney/react-app-rewired) to add the loader into the webpack-config.

With react-app-rewired, you can edit the webpack config inside the `config-overrides.js`.

There is a gotcha though, the create-react-app [default webpack configuration](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/config/webpack.config.js#L546) possess a catch all `file-loader`.

For polyglot-po-loader to properly work, you need to pass it before this loader, like so:

```js
// config-overrides.js
const path = require('path');

module.exports = config => {
    const lastLoader = config.module.rules.pop();

    lastLoader.oneOf.unshift({
        test: /\.po$/,
        use: [{
            loader: 'polyglot-po-loader',
        }],
    });

    config.module.rules.push(lastLoader);

    return config;
};
```