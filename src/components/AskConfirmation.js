import React from 'react';
import { Color, Box } from 'ink';
import SelectInput from 'ink-select-input';

const confirmChoices = [
    {
        label: 'Yes',
        value: true,
    },
    {
        label: 'No',
        value: false,
    },
];

const AskConfirmation = ({
    children,
    onConfirm,
    onCancel,
    label = 'Proceed?',
}) => {
    const handleConfirmationSelected = ({ value }) => {
        if (value) {
            onConfirm();
        } else {
            onCancel();
        }
    };

    return (
        <Box flexDirection="column">
            {children}
            <Box marginTop={1} flexDirection="column">
                <Color green>{label}</Color>
                <SelectInput
                    items={confirmChoices}
                    onSelect={handleConfirmationSelected}
                />
            </Box>
        </Box>
    );
};

export default AskConfirmation;
