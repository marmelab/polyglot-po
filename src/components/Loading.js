import React from 'react';
import PropTypes from 'prop-types';
import { Color, Box } from 'ink';
import Spinner from 'ink-spinner';

const Loading = ({ children }) => (
    <Color gray>
        <Box>
            <Spinner />
            <Box marginLeft={1}>{children}</Box>
        </Box>
    </Color>
);

Loading.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Loading;
