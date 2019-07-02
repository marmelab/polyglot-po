import React from 'react';
import PropTypes from 'prop-types';
import { Color, Box, Text } from 'ink';
import SelectInput from 'ink-select-input';
import { useMachine } from '@xstate/react';
import { Machine } from 'xstate';

import assignEventData from '../assignEventData';
import { convertFilesToPo, convertFilesToJson, findFiles } from '../lib';
import AskConfirmation from './AskConfirmation';
import ConversionResults from './ConversionResults';
import Error from './Error';
import Loading from './Loading';
import TextInput from './TextInput';

const App = ({ inputType, pattern, autoAccept, exit }) => {
    const [current, send] = useMachine(
        getMachine({ autoAccept, exit, mode: inputType, pattern })
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

    const handleModeSelected = ({ value }) => {
        send({
            type: Actions.SelectMode,
            data: value,
        });
    };

    switch (current.value) {
        case States.AskingMode:
            return (
                <Box flexDirection="column">
                    <SelectInput
                        items={modeChoices}
                        onSelect={handleModeSelected}
                    />
                </Box>
            );

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
            if (current.context.mode === ConversionModes.JsonToPo) {
                return <Loading>Converting to PO...</Loading>;
            }
            return <Loading>Converting to JSON...</Loading>;

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

App.propTypes = {
    exit: PropTypes.func.isRequired,
    inputType: PropTypes.oneOf(['json', 'po']),
    pattern: PropTypes.string,
    autoAccept: PropTypes.bool,
};

export default App;

const ConversionModes = {
    JsonToPo: 'json',
    PoToJson: 'po',
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
    Searching: 'Searching',
    AskingConfirmation: 'AskingConfirmation',
    Converting: 'Converting',
    ShowingResults: 'ShowingResults',
    ShowingError: 'ShowingError',
    Exiting: 'Exiting',
};

const Actions = {
    SelectMode: 'SelectMode',
    SelectPattern: 'SelectPattern',
    Cancel: 'Cancel',
    Confirm: 'Confirm',
};

const InternalActions = {
    Convert: 'Convert',
    AskConfirmation: 'AskConfirmation',
    ShowError: 'ShowError',
};

export const getMachine = ({ autoAccept, exit, mode, pattern = '' }) =>
    Machine({
        id: 'root',
        initial:
            mode && pattern
                ? States.Searching
                : mode
                ? States.AskingPattern
                : States.AskingMode,
        context: {
            autoAccept,
            mode,
            pattern,
            exit,
        },
        states: {
            [States.AskingMode]: {
                on: {
                    [Actions.SelectMode]: {
                        target: pattern
                            ? States.Processing
                            : States.AskingPattern,
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
            [States.AskingPattern]: {
                on: {
                    [Actions.SelectPattern]: {
                        target: States.Searching,
                        actions: assignEventData('pattern'),
                    },
                },
            },
            [States.Searching]: {
                invoke: {
                    id: 'findFiles',
                    src: context => callback => {
                        findFiles(context.pattern)
                            .then(files => {
                                if (files.length > 0) {
                                    context.files = files;

                                    if (autoAccept) {
                                        callback(InternalActions.Convert);
                                        return;
                                    }
                                    callback(InternalActions.AskConfirmation);
                                    return;
                                }

                                callback({
                                    type: InternalActions.ShowError,
                                    data: new Error(
                                        'Could not find any files matching your patterns'
                                    ),
                                });
                                return;
                            })
                            .catch(error => {
                                callback({
                                    type: InternalActions.ShowError,
                                    data: error,
                                });
                            });
                    },
                },
                on: {
                    [InternalActions.Convert]: States.Converting,
                    [InternalActions.AskConfirmation]:
                        States.AskingConfirmation,
                    [InternalActions.ShowError]: States.ShowingError,
                },
            },
            [States.AskingConfirmation]: {
                on: {
                    [Actions.Confirm]: States.Converting,
                    [Actions.Cancel]: States.Exiting,
                },
            },
            [States.Converting]: {
                invoke: {
                    id: 'convert',
                    src: context =>
                        context.mode === ConversionModes.JsonToPo
                            ? convertFilesToPo(context.files)
                            : convertFilesToJson(context.files),
                    onDone: {
                        target: States.ShowingResults,
                        actions: assignEventData('conversionResults'),
                    },
                    onError: {
                        target: States.ShowingError,
                    },
                },
            },
            [States.ShowingResults]: {},
            [States.ShowingError]: {
                src: assignEventData('error'),
            },
            [States.Exiting]: {},
        },
    });
