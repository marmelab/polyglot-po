export const wait = (timeout = 10) =>
    new Promise(resolve => setTimeout(resolve, timeout));
