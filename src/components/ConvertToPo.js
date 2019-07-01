import React from 'react';
import PropTypes from 'prop-types';
import { useMachine } from '@xstate/react';
import { Color, Box, Text } from 'ink';

import Loading from './Loading';
import Error from './Error';
import AskConfirmation from './AskConfirmation';
import ConversionResults from './ConversionResults';
import TextInput from './TextInput';
import { getMachine, States, Actions } from '../conversionMachine';
import { convertFilesToPo } from '../lib';

const ConvertToPo = ({ pattern, exit }) => {
    const [current, send] = useMachine(
        getMachine({ pattern, exit, convertFiles: convertFilesToPo })
    );

    const handlePatternSubmit = value => {
        send({
            type: Actions.SelectPattern,
            data: value,
        });
    };

    const handleConfirm = () => {
        send(Actions.Confirm);
    };

    const handleCancel = () => {
        send(Actions.Cancel);
    };

    switch (current.value) {
        case States.AskingPattern:
            return (
                <TextInput onSubmit={handlePatternSubmit}>
                    <Text>
                        Enter a glob pattern to search for the files to convert:
                    </Text>
                </TextInput>
            );
        case States.Searching:
            return <Loading>Searching...</Loading>;
        case States.AskingConfirmation:
            return (
                <AskConfirmation
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                >
                    <Box marginBottom={1}>
                        <Color green>Found the following files: </Color>
                    </Box>
                    {current.context.files.map(file => (
                        <Text key={file}>{file}</Text>
                    ))}
                </AskConfirmation>
            );
        case States.Converting:
            return <Loading>Converting to PO...</Loading>;
        case States.ShowingResults:
            return (
                <ConversionResults
                    conversionResults={current.context.conversionResults}
                />
            );
        default:
            if (current.context.error) {
                return <Error>{current.context.error.message}</Error>;
            }
            return null;
    }
};

ConvertToPo.propTypes = {
    exit: PropTypes.func.isRequired,
    pattern: PropTypes.string.isRequired,
};

export default ConvertToPo;
