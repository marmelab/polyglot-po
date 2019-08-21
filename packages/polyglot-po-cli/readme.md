# polyglot-po-cli

## Install

```bash
$ npm install -g polyglot-po-cli
# or
$ yarn global add polyglot-po-cli
```

## Usage

Starts the CLI in interactive mode, allowing you to select the type of conversion and the files to convert:

```bash
polyglot-po-cli
```

Starts the CLI in interactive mode for converting json files to po, allowing you to select the files to convert:

```bash
polyglot-po-cli --input-type json
# or
polyglot-po-cli -i json

```

Starts the CLI in interactive mode for converting json files to po, selecting the files to convert from the specified glob pattern:

```bash
polyglot-po-cli --input-type json --pattern ./i18n/*.json --defaultFile ui.en.json
# or
polyglot-po-cli -i json -p "./i18n/*.json" -d ui.en.json
```

Starts the CLI in interactive mode for converting po files to json, allowing you to select the files to convert:

```bash
polyglot-po-cli --input-type po
# or
polyglot-po-cli -i po

```

Starts the CLI in interactive mode for converting po files to json, selecting the files to convert from the specified glob pattern:

```bash
polyglot-po-cli --input-type po --pattern ./i18n/*.po
# or
polyglot-po-cli -i po -p "./i18n/*.po"
```

## JSON to PO

Note that the msgid of the PO entries will be the text of the default file entries.
By default, this default file is `en.json` but you can override this with the `defaultFile` argument.

```bash
polyglot-po-cli --input-type json --pattern ./i18n/*.json --defaultFile ui.en.json
# or
polyglot-po-cli -i json -p "./i18n/*.json" -d ui.en.json
```
