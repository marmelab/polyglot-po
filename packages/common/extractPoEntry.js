export default poEntry => {
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
