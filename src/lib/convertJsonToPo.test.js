import { convertJSONToPo, flattenJsonEntries } from './convertJsonToPo';

describe('convertJSONToPo', () => {
    const en = {
        root: {
            key1: 'englishForKey1',
            key2: 'englishForKey2',
            deep: {
                deepKey1: 'englishForDeepKey1',
                deepKey2: 'englishForDeepKey2',
            },
            plural: 'englishForOne||||englishForMany',
        },
    };

    describe('flattenJsonEntries', () => {
        test('flattens a json object into a key/value array', () => {
            expect(flattenJsonEntries(en)).toEqual([
                { key: 'root.key1', value: 'englishForKey1' },
                { key: 'root.key2', value: 'englishForKey2' },
                { key: 'root.deep.deepKey1', value: 'englishForDeepKey1' },
                { key: 'root.deep.deepKey2', value: 'englishForDeepKey2' },
                {
                    key: 'root.plural',
                    value: 'englishForOne||||englishForMany',
                },
            ]);
        });
    });

    test('convert complex JSON with plurals to PO', () => {
        expect(
            convertJSONToPo(
                [
                    { key: 'root.key1', value: 'frenchForKey1' },
                    { key: 'root.key2', value: 'frenchForKey2' },
                    { key: 'root.deep.deepKey1', value: 'frenchForDeepKey1' },
                    { key: 'root.deep.deepKey2', value: 'frenchForDeepKey2' },
                    {
                        key: 'root.plural',
                        value: 'frenchForOne||||frenchForMany',
                    },
                ],
                [
                    { key: 'root.key1', value: 'englishForKey1' },
                    { key: 'root.key2', value: 'englishForKey2' },
                    { key: 'root.deep.deepKey1', value: 'englishForDeepKey1' },
                    { key: 'root.deep.deepKey2', value: 'englishForDeepKey2' },
                    {
                        key: 'root.plural',
                        value: 'englishForOne||||englishForMany',
                    },
                ]
            ).toString()
        ).toEqual(
            `msgid ""
msgstr ""

#. key: root.key1
msgid "englishForKey1"
msgstr "frenchForKey1"

#. key: root.key2
msgid "englishForKey2"
msgstr "frenchForKey2"

#. key: root.deep.deepKey1
msgid "englishForDeepKey1"
msgstr "frenchForDeepKey1"

#. key: root.deep.deepKey2
msgid "englishForDeepKey2"
msgstr "frenchForDeepKey2"

#. key: root.plural
msgid "englishForOne"
msgid_plural "englishForMany"
msgstr[0] "frenchForOne"
msgstr[1] "frenchForMany"
`
        );
    });
});
