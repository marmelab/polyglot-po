import path from 'path';
import PO from 'pofile';
import fs from 'fs-extra';

import dictionaryToObject from './dictionaryToObject';
import extractPoEntry from './extractPoEntry';

/**
 * Convert PO files to JSON files
 * @param {string[]} filePaths The paths of the files to convert (eg: ['home/node/myProject/i18n/en.json', 'home/node/myProject/i18n/fr.json'])
 */
export const convertFilesToJson = filePaths =>
    Promise.all(filePaths.map(convertPoToJson));

export const convertPoStringToJson = content => {
    const po = PO.parse(content);
    const entries = po.items.map(extractPoEntry);

    return dictionaryToObject(entries);
};

export const loadJsonFromPoFile = async filePath => {
    const fullFilePath = path.resolve(filePath);
    const po = await loadLocaleFile(fullFilePath);
    const entries = po.items.map(extractPoEntry);

    return dictionaryToObject(entries);
};

const convertPoToJson = async filePath => {
    const fullFilePath = path.resolve(filePath);
    const po = await loadLocaleFile(fullFilePath);
    const entries = po.items.map(extractPoEntry);

    const json = dictionaryToObject(entries);

    const jsonFullFilePath = fullFilePath.replace('.po', '.json');
    fs.writeJsonSync(jsonFullFilePath, json);

    const jsonFilePath = filePath.replace('.po', '.json');

    return {
        input: filePath,
        output: jsonFilePath,
    };
};

const loadLocaleFile = filePath =>
    new Promise((resolve, reject) => {
        PO.load(filePath, (error, po) => {
            if (error) {
                return reject(error);
            }

            return resolve(po);
        });
    });
