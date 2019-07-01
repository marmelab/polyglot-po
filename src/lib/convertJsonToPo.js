import path from 'path';
import PO from 'pofile';

const DefaultHeaders = {
    'Project-Id-Version': '1.0',
    'Report-Msgid-Bugs-To': '',
    'Last-Translator': '',
    'Language-Team': '',
    'Content-Type': 'text/plain; charset=utf-8',
    'Content-Transfer-Encoding': '8bit',
    'MIME-Version': '1.0',
};

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
                input: path.relative(process.cwd(), localeWithPo.filePath),
                output: path.relative(process.cwd(), poFilePath),
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
        filePath: fullFilePath,
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
    const json = require(filePath);
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
    const file = path.parse(filePath);
    return `${file.dir}${path.sep}${file.name}.po`;
};
