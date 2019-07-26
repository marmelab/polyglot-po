import set from 'lodash/set';

export default dictionary =>
    dictionary.reduce((acc, entry) => set(acc, entry.key, entry.value), {});
