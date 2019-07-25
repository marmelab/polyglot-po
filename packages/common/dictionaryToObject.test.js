import dictionaryToObject from './dictionaryToObject';

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
