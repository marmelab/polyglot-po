import { Machine } from 'xstate';
import { findFiles } from './lib';
import assignEventData from './assignEventData';

export const States = {
    AskingPattern: 'AskingPattern',
    Searching: 'Searching',
    AskingConfirmation: 'AskingConfirmation',
    Converting: 'Converting',
    ShowingResults: 'ShowingResults',
    ShowingError: 'ShowingError',
    Exiting: 'Exiting',
};

export const Actions = {
    SelectPattern: 'SelectPattern',
    Confirm: 'Confirm',
    Cancel: 'Cancel',
};

const InternalActions = {
    AskConfirmation: 'AskConfirmation',
    ShowError: 'ShowError',
};

export const getMachine = ({ convertFiles, pattern, exit }) =>
    Machine({
        id: 'json-to-po',
        initial:
            pattern && pattern.length > 0
                ? States.Searching
                : States.AskingPattern,
        context: {
            pattern,
            exit,
            files: undefined,
            conversionResults: undefined,
            error: undefined,
        },
        states: {
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
                    src: (context, event) => callback => {
                        findFiles(context.pattern)
                            .then(files => {
                                if (files.length > 0) {
                                    context.files = files;
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
                    src: context => convertFiles(context.files),
                    onDone: {
                        target: States.ShowingResults,
                        actions: assignEventData('conversionResults'),
                    },
                    onError: {
                        target: States.ShowingError,
                    },
                },
            },
            [States.ShowingResults]: {
                src: assignEventData('error'),
            },
            [States.Exiting]: {
                src: () => context.exit(),
            },
            [States.ShowingError]: {},
        },
    });
