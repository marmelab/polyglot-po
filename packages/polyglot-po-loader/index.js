const PO = require('pofile');
const set = require('lodash/set');

module.exports = function convertPoStringToJson(content) {
    const po = PO.parse(content);
    const entries = po.items.map(extractPoEntry);
    const json = dictionaryToObject(entries);
    return `module.exports = ${JSON.stringify(json)}`;
};

const dictionaryToObject = dictionary =>
    dictionary.reduce((acc, entry) => set(acc, entry.key, entry.value), {});

const extractPoEntry = poEntry => {
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
