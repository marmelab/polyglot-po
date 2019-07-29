import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box } from 'ink';
import InkTextInput from 'ink-text-input';

const TextInput = ({ children, onSubmit }) => {
    const [value, setValue] = useState('');

    const handlePatternChange = value => {
        setValue(value);
    };

    return (
        <Box flexDirection="column" marginTop={1}>
            {children}

            <InkTextInput
                value={value}
                onChange={handlePatternChange}
                onSubmit={onSubmit}
            />
        </Box>
    );
};

TextInput.propTypes = {
    children: PropTypes.node.isRequired,
    onSubmit: PropTypes.func.isRequired,
};

export default TextInput;
