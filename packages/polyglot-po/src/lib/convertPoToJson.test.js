import { dictionaryToObject, extractPoEntry } from './convertPoToJson';

describe('convertPoToJson', () => {
    describe('dictionaryToObject', () => {
        test('convert a dictionary to an object', () => {
            const dictionary = [
                { key: 'root.key1', value: 'englishForKey1' },
                { key: 'root.key2', value: 'englishForKey2' },
                { key: 'root.deep.deepKey1', value: 'englishForDeepKey1' },
                { key: 'root.deep.deepKey2', value: 'englishForDeepKey2' },
                {
                    key: 'root.plural',
                    value: 'englishForOne||||englishForMany',
                },
            ];

            expect(dictionaryToObject(dictionary)).toEqual({
                root: {
                    key1: 'englishForKey1',
                    key2: 'englishForKey2',
                    deep: {
                        deepKey1: 'englishForDeepKey1',
                        deepKey2: 'englishForDeepKey2',
                    },
                    plural: 'englishForOne||||englishForMany',
                },
            });
        });
    });

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
                    msgstr: [
                        'englishForOne',
                        'englishForTwo',
                        'englishForMany',
                    ],
                })
            ).toEqual({
                key: 'root.key',
                value: 'englishForOne||||englishForTwo||||englishForMany',
            });
        });
    });
});
