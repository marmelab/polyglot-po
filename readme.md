# polyglot-po

> CLI, library and loader to convert [polyglot](https://airbnb.io/polyglot.js/) json files to po and vice-versa

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

## polyglot-po

Library to convert [polyglot](https://airbnb.io/polyglot.js/) json files to po and vice-versa
[readme](https://github.com/marmelab/polyglot-po/blob/master/packages/polyglot-po/readme.md)

## polyglot-po-cli

CLI to convert [polyglot](https://airbnb.io/polyglot.js/) json files to po and vice-versa
[readme](https://github.com/marmelab/polyglot-po/blob/master/packages/polyglot-po-cli/readme.md)

## polyglot-po-loader

Webpack loader to load po file and convert them to polyglot json format
[readme](https://github.com/marmelab/polyglot-po/blob/master/packages/polyglot-po-loader/readme.md)

## Development

Commands are available both in makefile and package.json
