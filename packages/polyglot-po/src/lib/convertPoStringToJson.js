import PO from 'pofile';
import set from 'lodash/set';

export default async function convertPoStringToJson(poString) {
    const callback = this.async();
    const po = await PO.parse(poString);
    const entries = po.items.map(extractPoEntry);
    const json = dictionaryToObject(entries);

    callback(`module.exporst=${JSON.stringify(json)}`);
}

export const dictionaryToObject = dictionary =>
    dictionary.reduce((acc, entry) => set(acc, entry.key, entry.value), {});

export const extractPoEntry = poEntry => {
    const key = poEntry.extractedComments.find(comment =>
        comment.includes('key: ')
    );

    if (!key) {
        console.warn(
            `Invalid PO entry (${poEntry.msgid}): it does not contain the key comment`
        );
        return [];
    }

    return {
        key: key.replace('key: ', ''),
        value: poEntry.msgstr.join('||||'),
    };
};
