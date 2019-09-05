import extractPoEntry from './extractPoEntry';

describe('extractPoEntry', () => {
    test('handle simple entries', () => {
        expect(
            extractPoEntry({
                extractedComments: ['key: root.key'],
                msgstr: ['englishForKey1'],
            })
        ).toEqual({
            key: 'root.key',
            value: 'englishForKey1',
        });
    });

    test('handle entries with plural forms', () => {
        expect(
            extractPoEntry({
                extractedComments: ['key: root.key'],
                msgstr: ['englishForOne', 'englishForMany'],
            })
        ).toEqual({
            key: 'root.key',
            value: 'englishForOne||||englishForMany',
        });
    });

    test('handle entries with many plural forms', () => {
        expect(
            extractPoEntry({
                extractedComments: ['key: root.key'],
                msgstr: ['englishForOne', 'englishForTwo', 'englishForMany'],
            })
        ).toEqual({
            key: 'root.key',
            value: 'englishForOne||||englishForTwo||||englishForMany',
        });
    });

    test('handle entries with empty msgstr by using msgid instead', () => {
        expect(
            extractPoEntry({
                extractedComments: ['key: root.key'],
                msgid: 'english default text',
                msgstr: [''],
            })
        ).toEqual({
            key: 'root.key',
            value: 'english default text',
        });
    });
});
