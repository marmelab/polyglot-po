import fs from 'fs';
import path from 'path';

export const convertFilesToPo = async filePaths =>
    Promise.all(filePaths.map(convertFileToPo));

export const convertFileToPo = async filePath => {
    try {
        const fullFilePath = path.resolve(filePath);
        const json = require(fullFilePath);

        const poLines = convertJSONToPo(json);
        const poFilePath = getPoFilePath(fullFilePath);
        const fileContent = poLines.map(getPoText).join('\n');
        await writePoFile(poFilePath, fileContent);

        return {
            file: filePath,
            output: path.relative(process.cwd(), poFilePath),
        };
    } catch (error) {
        console.error(error);
        return { file: filePath, error };
    }
};

export const convertJSONToPo = json => reduceJSONToPo('', json);

const reduceJSONToPo = (prefix, json) =>
    Object.keys(json).reduce((acc, key) => {
        const fullKey = `${prefix}${key}`;
        if (typeof json[key] === 'object') {
            return acc.concat(reduceJSONToPo(`${fullKey}.`, json[key]));
        }

        return acc.concat({
            key: fullKey,
            value: json[key],
        });
    }, []);

const getPoFilePath = filePath => {
    const file = path.parse(filePath);
    return `${file.dir}${path.sep}${file.name}.po`;
};

const writePoFile = (poFilePath, content) =>
    new Promise((resolve, reject) => {
        fs.writeFile(poFilePath, content, err => {
            if (err) {
                return reject(err);
            }
            return resolve();
        });
    });

const getPoText = poLine => `
msgid "${poLine.key}"
msgstr "${poLine.value}"
`;
