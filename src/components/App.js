import React from 'react';
import PropTypes from 'prop-types';
import { Text, Box } from 'ink';
import SelectInput from 'ink-select-input';
import { useMachine } from '@xstate/react';
import { Machine } from 'xstate';

import assignEventData from '../assignEventData';
import ConvertToPo from './ConvertToPo';
import Error from './Error';
import TextInput from './TextInput';

const App = ({ exit }) => {
    const [current, send] = useMachine(getMachine(exit));

    const handleModeSelected = ({ value }) => {
        send({
            type: Actions.SelectMode,
            data: value,
        });
    };

    const handlePatternSubmit = value => {
        send({
            type: Actions.SelectPattern,
            data: value,
        });
    };

    switch (current.value) {
        case States.Processing:
            if (current.context.mode === ConversionModes.JsonToPo) {
                return (
                    <ConvertToPo
                        pattern={current.context.pattern}
                        exit={exit}
                    />
                );
            } else {
                return (
                    <Error>
                        Sorry, conversion to PO files is not implemented yet...
                    </Error>
                );
            }

        case States.AskingPattern:
            return (
                <TextInput onSubmit={handlePatternSubmit}>
                    <Text>
                        Enter a glob pattern to search for the files to convert:
                    </Text>
                </TextInput>
            );

        default:
            return (
                <Box flexDirection="column">
                    <SelectInput
                        items={modeChoices}
                        onSelect={handleModeSelected}
                    />
                </Box>
            );
    }
};

App.propTypes = {
    exit: PropTypes.func.isRequired,
};

export default App;

const ConversionModes = {
    JsonToPo: 'json-to-po',
    PoToJson: 'po-to-json',
};

const modeChoices = [
    {
        label: 'Convert JSON files to PO files',
        value: ConversionModes.JsonToPo,
    },
    {
        label: 'Convert PO files to JSON files',
        value: ConversionModes.PoToJson,
    },
];

const States = {
    AskingMode: 'AskingMode',
    AskingPattern: 'AskingPattern',
    Processing: 'Processing',
    Exiting: 'Exiting',
};

const Actions = {
    SelectMode: 'SelectMode',
    SelectPattern: 'SelectPattern',
    Cancel: 'Cancel',
};

export const getMachine = () =>
    Machine({
        id: 'root',
        initial: States.AskingMode,
        context: {
            mode: undefined,
            pattern: '',
        },
        states: {
            [States.AskingMode]: {
                on: {
                    [Actions.SelectMode]: {
                        target: States.AskingPattern,
                        actions: assignEventData('mode'),
                    },
                    [Actions.Cancel]: States.Exiting,
                },
            },
            [States.AskingPattern]: {
                on: {
                    [Actions.SelectPattern]: {
                        target: States.Processing,
                        actions: assignEventData('pattern'),
                    },
                },
            },
            [States.Processing]: {},
            [States.Exiting]: {},
        },
    });
