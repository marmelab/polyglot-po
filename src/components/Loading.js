import React from 'react';
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

export default Loading;
