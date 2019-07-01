import path from 'path';
import PO from 'pofile';
import set from 'lodash/set';
import { writeJsonSync } from 'fs-extra';

/**
 * Convert PO files to JSON files
 * @param {string[]} filePaths The paths of the files to convert (eg: ['home/node/myProject/i18n/en.json', 'home/node/myProject/i18n/fr.json'])
 */
export const convertFilesToJson = filePaths =>
    Promise.all(filePaths.map(convertPoToJson));

const convertPoToJson = async filePath => {
    const fullFilePath = path.resolve(filePath);
    const po = await loadLocaleFile(fullFilePath);
    const entries = po.items.map(extractPoEntry);

    const json = entries.reduce(
        (acc, entry) => set(acc, entry.key, entry.value),
        {}
    );

    const jsonFullFilePath = fullFilePath.replace('.po', '.json');
    writeJsonSync(jsonFullFilePath, json);

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
