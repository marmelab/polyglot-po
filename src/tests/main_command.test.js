import React from 'react';
import { render } from 'ink-testing-library';
import { wait } from './test-utils';
import MainCommand from '../../commands/index';

describe('Main command', () => {
    test('Executes immediately if it has all the necessary arguments', async () => {
        const { lastFrame } = render(
            <MainCommand
                inputType="json"
                pattern={['./src/tests/json-to-po/*json']}
                yes
            />
        );
        expect(lastFrame()).toMatch(/.+Searching.+/);
        await wait(100);
        expect(lastFrame()).toMatch(/Conversion results:/);
        expect(lastFrame()).toMatch(
            /src\/tests\/json-to-po\/en\.json => src\/tests\/json-to-po\/en\.po/
        );
        expect(lastFrame()).toMatch(
            /src\/tests\/json-to-po\/fr\.json => src\/tests\/json-to-po\/fr\.po/
        );
    });

    test('Asks for required arguments', async () => {
        const { lastFrame, stdin } = render(<MainCommand />);
        expect(lastFrame()).toMatch(/.*Convert JSON files to PO files.*/);
        expect(lastFrame()).toMatch(/.*Convert PO files to JSON files.*/);

        stdin.write('\r');
        await wait(100);
        expect(lastFrame()).toMatch(
            /Enter a glob pattern to search for the files to convert:/
        );

        stdin.write('./src/tests/json-to-po/*json');
        stdin.write('\r');
        await wait(100);
        expect(lastFrame()).toMatch(/Proceed?/);
        expect(lastFrame()).toMatch(/Yes/);
        expect(lastFrame()).toMatch(/No/);
        stdin.write('\r');
        await wait(100);

        expect(lastFrame()).toMatch(
            /src\/tests\/json-to-po\/en\.json => src\/tests\/json-to-po\/en\.po/
        );
        expect(lastFrame()).toMatch(
            /src\/tests\/json-to-po\/fr\.json => src\/tests\/json-to-po\/fr\.po/
        );
    });
});
