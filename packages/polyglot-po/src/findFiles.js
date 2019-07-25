import globby from 'globby';

export const findFiles = async patterns =>
    globby(patterns, {
        gitignore: false,
        expandDirectories: false,
    });
