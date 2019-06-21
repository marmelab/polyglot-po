import { convertJSONToPo } from './convertJsonToPo';

describe('convertJSONToPo', () => {
    test('Convert simple keys', () => {
        expect(
            convertJSONToPo({
                key1: 'key1Value',
                key2: 'key2Value',
            })
        ).toEqual(`
msgid "key1"
msgstr "key1Value"


msgid "key2"
msgstr "key2Value"
`);
    });

    test('Convert deep keys', () => {
        expect(
            convertJSONToPo({
                deep: {
                    key1: 'key1Value',
                    key2: 'key2Value',
                },
            })
        ).toEqual(`
msgid "deep.key1"
msgstr "key1Value"


msgid "deep.key2"
msgstr "key2Value"
`);
    });
});
