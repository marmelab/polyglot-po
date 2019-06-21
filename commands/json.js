import React from 'react';
import PropTypes from 'prop-types';
import { AppContext } from 'ink';

import ConvertToPo from '../src/components/ConvertToPo';

/// Convert json files to po files
const FromJson = ({ inputArgs }) => {
    return (
        <AppContext.Consumer>
            {({ exit }) => (
                <ConvertToPo pattern={inputArgs.slice(1)} exit={exit} />
            )}
        </AppContext.Consumer>
    );
};

FromJson.propTypes = {
    inputArgs: PropTypes.array,
};

export default FromJson;
