import path from 'path';
import PO from 'pofile';
import fs from 'fs-extra';

const DefaultHeaders = {
    'Project-Id-Version': '1.0',
    'Report-Msgid-Bugs-To': '',
    'Last-Translator': '',
    'Language-Team': '',
    'Content-Type': 'text/plain; charset=utf-8',
    'Content-Transfer-Encoding': '8bit',
    'MIME-Version': '1.0',
};

/**
 * Convert JSON files to PO files
 * @param {string[]} filePaths The paths of the files to convert (eg: ['home/node/myProject/i18n/en.json', 'home/node/myProject/i18n/fr.json'])
 * @param {string} defaultLocale The locale from which the po msgid entries will be extracted (default to 'en')
 * @param {object} defaultHeaders The PO files headers. See https://www.gnu.org/software/trans-coord/manual/gnun/html_node/PO-Header.html
 */
export const convertFilesToPo = async (
    filePaths,
    defaultLocale = 'en',
    defaultHeaders = DefaultHeaders
) => {
    const locales = filePaths.map(getLocaleDescriptor);
    const defaultLocaleDescriptor = locales.find(
        locale => locale.name === defaultLocale
    );

    const localesWithPo = await Promise.all(
        locales.map(convertLocaleToPo(defaultLocaleDescriptor, defaultHeaders))
    );

    return Promise.all(
        localesWithPo.map(async localeWithPo => {
            const poFilePath = getPoFilePath(localeWithPo.filePath);
            await savePoFile(localeWithPo.po, poFilePath);
            return {
                input: localeWithPo.filePath,
                output: poFilePath,
            };
        })
    );
};

const extractLocaleFromFilePath = filePath =>
    path.basename(filePath).split('.')[0];

const getLocaleDescriptor = filePath => {
    const locale = extractLocaleFromFilePath(filePath);
    const fullFilePath = path.resolve(filePath);
    const json = loadLocaleFile(fullFilePath);
    const entries = flattenJsonEntries(json);

    return {
        name: locale,
        filePath,
        entries,
    };
};

export const flattenJsonEntries = json => reduceJSONToPo('', json);

const convertLocaleToPo = (defaultLocale, defaultHeaders) => locale => {
    const po = convertJSONToPo(locale.entries, defaultLocale.entries);
    const date = new Date().toDateString();
    po.headers = {
        ...defaultHeaders,
        'POT-Creation-Date': date,
        'PO-Revision-Date': date,
    };

    return {
        ...locale,
        po,
    };
};

export const convertJSONToPo = (entries, defaultEntries) => {
    const po = new PO();
    const poItems = defaultEntries.map(convertToPoItem(entries));
    po.items = poItems;
    return po;
};

const convertToPoItem = entries => defaultEntry => {
    const entry = entries.find(entry => entry.key === defaultEntry.key);
    const variants = entry.value.split('||||');
    const defaultVariants = defaultEntry.value.split('||||');

    const item = new PO.Item();
    item.msgid = defaultVariants[0];
    item.msgid_plural =
        defaultVariants.length > 1
            ? defaultVariants[variants.length - 1]
            : null;
    item.extractedComments = [`key: ${defaultEntry.key}`];
    item.msgstr = variants;
    return item;
};

const loadLocaleFile = filePath => {
    const json = fs.readJsonSync(filePath);
    return json;
};

const savePoFile = (po, poFilePath) =>
    new Promise((resolve, reject) =>
        po.save(poFilePath, err => {
            if (err) {
                return reject(err);
            }
            return resolve();
        })
    );

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
    return filePath.replace('.json', '.po');
};
