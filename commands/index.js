import React from 'react';
import PropTypes from 'prop-types';
import { AppContext } from 'ink';
import App from '../src/components/App';

/// Convert files from json to po or po to json
const Index = ({ inputType, pattern, yes, defaultLocaleFile }) => {
    return (
        <AppContext.Consumer>
            {({ exit }) => (
                <App
                    exit={exit}
                    inputType={inputType}
                    pattern={pattern}
                    autoAccept={yes}
                    defaultLocaleFile={defaultLocaleFile}
                />
            )}
        </AppContext.Consumer>
    );
};

Index.propTypes = {
    /// The format of the files to convert: either json or po
    inputType: PropTypes.oneOf(['json', 'po']),
    /// glob pattern to find the files to convert
    pattern: PropTypes.string,
    /// Boolean indicating wether to auto accept conversions
    yes: PropTypes.bool,
    /// The name of the file to use as the default when converting json to po ("en.json" by default)
    defaultLocaleFile: PropTypes.string,
};

Index.shortFlags = {
    inputType: 'i',
    pattern: 'p',
    yes: 'y',
    defaultLocaleFile: 'd',
};

export default Index;
