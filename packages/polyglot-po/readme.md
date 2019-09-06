# polyglot-po

## Install

```bash
$ npm install -g polyglot-po
# or
$ yarn global add polyglot-po
```

## Usage


### convertFilesToPo


Convert JSON files to PO files

Takes three arguments:

 - `filePaths`: The paths of the files to convert (eg: `['home/node/myProject/i18n/en.json', 'home/node/myProject/i18n/fr.json']`)
 - `defaultLocaleFile`: The locale from which the po msgid entries will be extracted (default to 'en')
 - `defaultHeaders`: The PO files headers. See https://www.gnu.org/software/trans-coord/manual/gnun/html_node/PO-Header.html

Returns a promise of an array of input/output object, 
 - input: the filePath of the json file
 - outputput: the filePath of the new po file

Example:
```js
import { convertFilesToPo } as polygloPo from 'polyglot-po';

convertFilesToPo(
    ['home/node/myProject/i18n/en.json', 'home/node/myProject/i18n/fr.json'],
    'fr'
).then((results) => {
    console.log({ results });
    //  [
    //      { 
    //          input: 'home/node/myProject/i18n/en.json', 
    //          output: 'home/node/myProject/i18n/en.po' 
    //      },
    //      { 
    //          input: 'home/node/myProject/i18n/fr.json', 
    //          output: 'home/node/myProject/i18n/fr.po' 
    //      },
    //  ]
});
```

### convertFilesToJson

Convert PO files to JSON files

Takes one argument

 - filePaths: the list of the po files to convert


Returns a promise of an array of input/output object

 - input: the filePath of the po file
 - outputput: the filePath of the new json file

Example:
```js
import { convertFilesToJson } as polygloPo from 'polyglot-po';

convertFilesToPo(
    ['home/node/myProject/i18n/en.po', 'home/node/myProject/i18n/fr.po'],
).then((results) => {
    console.log({ results });
    //  [
    //      { 
    //          input: 'home/node/myProject/i18n/en.po', 
    //          output: 'home/node/myProject/i18n/en.json' 
    //      },
    //      { 
    //          input: 'home/node/myProject/i18n/fr.po', 
    //          output: 'home/node/myProject/i18n/fr.json' 
    //      },
    //  ]
});
```

### convertPoStringToJson

Convert a po string to json.

Take a po string and returns the parsed json object. (This operation is synchronous.)

Example:

```js
import { convertPoStringToJson } from 'polyglot-po';

const json = convertPoStringToJson(poString);
```

### loadJsonFromPoFile

Load a po file convert it to json and returns the parse json.
Useful if you want to load the po file and use the json directly.

Take the file path to the po file and returns a promise holding the parsed json

Example:

```js
import { loadJsonFromPoFile } from 'polyglot-po';

loadJsonFromPoFile('home/node/myProject/i18n/en.po').then(json => {
    // do something with the json
})
```
