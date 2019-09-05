import { convertPoStringToJson } from './convertPoToJson';

const enPo = `msgid ""
msgstr ""
"Project-Id-Version: 1.0\\n"
"Report-Msgid-Bugs-To: \\n"
"Last-Translator: \\n"
"Language-Team: \\n"
"Content-Type: text/plain; charset=utf-8\\n"
"Content-Transfer-Encoding: 8bit\\n"
"MIME-Version: 1.0\\n"
"POT-Creation-Date: ${new Date().toDateString()}\\n"
"PO-Revision-Date: ${new Date().toDateString()}\\n"

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

#. key: root.not_yet_translated
msgid "Not yet translated"
msgstr ""
`;

const frPo = `msgid ""
msgstr ""
"Project-Id-Version: 1.0\\n"
"Report-Msgid-Bugs-To: \\n"
"Last-Translator: \\n"
"Language-Team: \\n"
"Content-Type: text/plain; charset=utf-8\\n"
"Content-Transfer-Encoding: 8bit\\n"
"MIME-Version: 1.0\\n"
"POT-Creation-Date: ${new Date().toDateString()}\\n"
"PO-Revision-Date: ${new Date().toDateString()}\\n"

#. key: root.welcome
msgid "Welcome"
msgstr "Bienvenue"

#. key: root.goodbye
msgid "Goodbye"
msgstr "Au revoir"

#. key: root.action.edit
msgid "Edit"
msgstr "Editer"

#. key: root.action.create
msgid "Create"
msgstr "Créer"

#. key: root.items_created
msgid "Item created"
msgid_plural "Items created"
msgstr[0] "Élément créé"
msgstr[1] "Éléments créés"

#. key: root.not_yet_translated
msgid "Not yet translated"
msgstr ""
`;

describe('convertPoToJson', () => {

    describe('convertPoStringToJson', () => {
        test('convert po file to json', () => {
            expect(
                convertPoStringToJson(frPo)
            ).toEqual({
                root: {
                    not_yet_translated: 'Not yet translated',
                    action: {
                        create: 'Créer',
                        edit: 'Editer',
                    },
                    goodbye: 'Au revoir',
                    items_created: 'Élément créé||||Éléments créés',
                    welcome: 'Bienvenue',
                },
            });
            expect(
                convertPoStringToJson(enPo)
            ).toEqual({
                root: {
                    not_yet_translated: 'Not yet translated',
                    action: {
                        create: 'Create',
                        edit: 'Edit',
                    },
                    goodbye: 'Goodbye',
                    items_created: 'Item created||||Items created',
                    welcome: 'Welcome',
                },
            });
        });
    });
});
