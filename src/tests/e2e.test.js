import React from 'react';
import { render } from 'ink-testing-library';
import {
    pathExistsSync,
    removeSync,
    readFileSync,
    readJsonSync,
} from 'fs-extra';

import { wait } from './test-utils';
import MainCommand from '../../commands/index';

const expectedEnPo = `msgid ""
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
`;

const expectedFrPo = `msgid ""
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
`;

const expectedEnJson = {
    root: {
        welcome: 'Welcome',
        goodbye: 'Goodbye',
        action: {
            edit: 'Edit',
            create: 'Create',
        },
        items_created: 'Item created||||Items created',
    },
};

const expectedFrJson = {
    root: {
        welcome: 'Bienvenue',
        goodbye: 'Au revoir',
        action: {
            edit: 'Editer',
            create: 'Créer',
        },
        items_created: 'Élément créé||||Éléments créés',
    },
};

const ARROW_DOWN = '\u001B[B';
const ENTER = '\r';

describe('Main command', () => {
    describe('Convert To PO files', () => {
        beforeEach(() => {
            removeSync('./fixtures/json-to-po/en.po');
            removeSync('./fixtures/json-to-po/fr.po');
        });

        test('Executes immediately if it has all the necessary arguments', async () => {
            const { lastFrame } = render(
                <MainCommand
                    inputType="json"
                    pattern={['./fixtures/json-to-po/*.json']}
                    yes
                />
            );
            expect(lastFrame()).toMatch(/.+Searching.+/);
            await wait(100);
            expect(lastFrame()).toMatch(/Conversion results:/);
            expect(lastFrame()).toMatch(
                /.*\.\/fixtures\/json-to-po\/en\.json => \.\/fixtures\/json-to-po\/en\.po/
            );
            expect(lastFrame()).toMatch(
                /.*\.\/fixtures\/json-to-po\/fr\.json => \.\/fixtures\/json-to-po\/fr\.po/
            );

            expect(pathExistsSync('./fixtures/json-to-po/en.po')).toEqual(true);
            expect(
                readFileSync('./fixtures/json-to-po/en.po', {
                    encoding: 'utf-8',
                })
            ).toEqual(expectedEnPo);
            expect(pathExistsSync('./fixtures/json-to-po/fr.po')).toEqual(true);
            expect(
                readFileSync('./fixtures/json-to-po/fr.po', {
                    encoding: 'utf-8',
                })
            ).toEqual(expectedFrPo);
        });

        test('Asks for required arguments', async () => {
            const { lastFrame, stdin } = render(<MainCommand />);
            expect(lastFrame()).toMatch(/.*Convert JSON files to PO files.*/);
            expect(lastFrame()).toMatch(/.*Convert PO files to JSON files.*/);

            stdin.write(ENTER);
            await wait(100);
            expect(lastFrame()).toMatch(
                /Enter a glob pattern to search for the files to convert:/
            );

            stdin.write('./fixtures/json-to-po/*json');
            stdin.write(ENTER);
            await wait(100);
            expect(lastFrame()).toMatch(/Proceed?/);
            expect(lastFrame()).toMatch(/Yes/);
            expect(lastFrame()).toMatch(/No/);
            stdin.write(ENTER);
            await wait(100);

            expect(lastFrame()).toMatch(
                /.*\.\/fixtures\/json-to-po\/en\.json => \.\/fixtures\/json-to-po\/en\.po/
            );
            expect(lastFrame()).toMatch(
                /.*\.\/fixtures\/json-to-po\/fr\.json => \.\/fixtures\/json-to-po\/fr\.po/
            );

            expect(pathExistsSync('./fixtures/json-to-po/en.po')).toEqual(true);
            expect(
                readFileSync('./fixtures/json-to-po/en.po', {
                    encoding: 'utf-8',
                })
            ).toEqual(expectedEnPo);
            expect(pathExistsSync('./fixtures/json-to-po/fr.po')).toEqual(true);
            expect(
                readFileSync('./fixtures/json-to-po/fr.po', {
                    encoding: 'utf-8',
                })
            ).toEqual(expectedFrPo);
        });
    });
    describe('Convert To JSON files', () => {
        beforeEach(() => {
            removeSync('./fixtures/po-to-json/en.json');
            removeSync('./fixtures/po-to-json/fr.json');
        });

        test('Executes immediately if it has all the necessary arguments', async () => {
            const { lastFrame } = render(
                <MainCommand
                    inputType="po"
                    pattern={['./fixtures/po-to-json/*.po']}
                    yes
                />
            );
            expect(lastFrame()).toMatch(/.+Searching.+/);
            await wait(100);
            expect(lastFrame()).toMatch(/Conversion results:/);
            expect(lastFrame()).toMatch(
                /.*\.\/fixtures\/po-to-json\/en\.po => \.\/fixtures\/po-to-json\/en\.json.*/
            );
            expect(lastFrame()).toMatch(
                /.*\.\/fixtures\/po-to-json\/fr\.po => \.\/fixtures\/po-to-json\/fr\.json.*/
            );

            expect(pathExistsSync('./fixtures/po-to-json/en.json')).toEqual(
                true
            );
            expect(
                readJsonSync('./fixtures/po-to-json/en.json', {
                    encoding: 'utf-8',
                })
            ).toEqual(expectedEnJson);
            expect(pathExistsSync('./fixtures/po-to-json/fr.json')).toEqual(
                true
            );
            expect(
                readJsonSync('./fixtures/po-to-json/fr.json', {
                    encoding: 'utf-8',
                })
            ).toEqual(expectedFrJson);
        });

        test('Asks for required arguments', async () => {
            const { lastFrame, stdin } = render(<MainCommand />);
            expect(lastFrame()).toMatch(/.*Convert JSON files to PO files.*/);
            expect(lastFrame()).toMatch(/.*Convert PO files to JSON files.*/);

            stdin.write(ARROW_DOWN);
            stdin.write(ENTER);
            await wait(100);
            expect(lastFrame()).toMatch(
                /Enter a glob pattern to search for the files to convert:/
            );

            stdin.write('./fixtures/po-to-json/*po');
            stdin.write(ENTER);
            await wait(100);
            expect(lastFrame()).toMatch(/Proceed?/);
            expect(lastFrame()).toMatch(/Yes/);
            expect(lastFrame()).toMatch(/No/);
            stdin.write(ENTER);
            await wait(100);

            expect(lastFrame()).toMatch(
                /.*\.\/fixtures\/po-to-json\/en\.po => \.\/fixtures\/po-to-json\/en\.json.*/
            );
            expect(lastFrame()).toMatch(
                /.*\.\/fixtures\/po-to-json\/fr\.po => \.\/fixtures\/po-to-json\/fr\.json.*/
            );

            expect(pathExistsSync('./fixtures/po-to-json/en.json')).toEqual(
                true
            );
            expect(
                readJsonSync('./fixtures/po-to-json/en.json', {
                    encoding: 'utf-8',
                })
            ).toEqual(expectedEnJson);

            expect(pathExistsSync('./fixtures/po-to-json/fr.json')).toEqual(
                true
            );
            expect(
                readJsonSync('./fixtures/po-to-json/fr.json', {
                    encoding: 'utf-8',
                })
            ).toEqual(expectedFrJson);
        });
    });
});
