import React from 'react';
import PropTypes from 'prop-types';
import { AppContext } from 'ink';
import App from '../src/components/App';

/// Convert files from json to po or po to json
const Index = ({ inputType, pattern, yes }) => {
    return (
        <AppContext.Consumer>
            {({ exit }) => (
                <App
                    exit={exit}
                    inputType={inputType}
                    pattern={pattern}
                    autoAccept={yes}
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
};

Index.shortFlags = {
    inputType: 'i',
    pattern: 'p',
    yes: 'y',
};

export default Index;
