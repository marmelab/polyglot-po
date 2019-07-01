import React from 'react';
import PropTypes from 'prop-types';
import { AppContext } from 'ink';

import ConvertToPo from '../src/components/ConvertToPo';

/// Convert json files to po files
const FromJson = ({ yes = false, pattern }) => {
    return (
        <AppContext.Consumer>
            {({ exit }) => (
                <ConvertToPo pattern={pattern} autoAccept={yes} exit={exit} />
            )}
        </AppContext.Consumer>
    );
};

FromJson.propTypes = {
    /// glob pattern to find the files to convert
    pattern: PropTypes.string,
    /// Boolean indicating wether to auto accept conversions
    yes: PropTypes.bool,
};

FromJson.shortFlags = {
    pattern: 'p',
    yes: 'y',
};

export default FromJson;
