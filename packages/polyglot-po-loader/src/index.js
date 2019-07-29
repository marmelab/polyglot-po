const { convertPoStringToJson } = require('polyglot-po');

module.exports = function polygloPoLoader(content) {
    const json = convertPoStringToJson(content);
    return `module.exports = ${JSON.stringify(json)}`;
};
