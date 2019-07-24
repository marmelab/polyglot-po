const PO = require('pofile');
const { extractPoEntry, dictionaryToObject } = require('../common');

module.exports = function convertPoStringToJson(content) {
    const po = PO.parse(content);
    const entries = po.items.map(extractPoEntry);
    const json = dictionaryToObject(entries);
    return `module.exports = ${JSON.stringify(json)}`;
};
