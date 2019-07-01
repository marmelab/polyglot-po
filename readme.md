# polyglot-po

> CLI and library to convert [polyglot](https://airbnb.io/polyglot.js/) json files to po and vice-versa

This tool assumes the JSON file are named with their locale. For example:

- en.json
- en-GB.json
- en.po
- en-GB.po

Example of a JSON file to convert:

```json
{
    "home": {
        "welcome": "Welcome",
        "goodbye": "Goodbye",
        "action": {
            "edit": "Edit",
            "create": "Create"
        },
        "items_created": "Item created||||Items created"
    }
}
```

Would be converted to the following PO file:

```po
msgid ""
msgstr ""
"Project-Id-Version: 1.0\n"
"Report-Msgid-Bugs-To: \n"
"Last-Translator: \n"
"Language-Team: \n"
"Content-Type: text/plain; charset=utf-8\n"
"Content-Transfer-Encoding: 8bit\n"
"MIME-Version: 1.0\n"
"POT-Creation-Date: Mon Jul 01 2019\n"
"PO-Revision-Date: Mon Jul 01 2019\n"

#. key: root.welcome
msgid "Welcome"
msgstr "Welcome"

#. key: root.goodbye
msgid "Goodbye"
msgstr "Goodbye"

#. key: root.action.edit
msgid "Edit"
msgstr "Edit"

#. key: root.action.create
msgid "Create"
msgstr "Create"

#. key: root.items_created
msgid "Item created"
msgid_plural "Items created"
msgstr[0] "Item created"
msgstr[1] "Items created"
```

## Usage as a CLI

### Install

```bash
$ npm install -g polyglot-po
# or
$ yarn global add polyglot-po
```

### CLI

```bash
polyglot-po
```

Starts the CLI in interactive mode, allowing you to select the type of conversion and the files to convert.

```bash
polyglot-po --input-type json
# or
polyglot-po -i json

```

Starts the CLI in interactive mode for converting json files to po, allowing you to select the files to convert.

```bash
polyglot-po --input-type json --pattern ./i18n/*.json
# or
polyglot-po -i json -p "./i18n/*.json"
```

Starts the CLI in interactive mode for converting json files to po, selecting the files to convert from the specified glob pattern.

## Development

Commands are available both in makefile and package.json
