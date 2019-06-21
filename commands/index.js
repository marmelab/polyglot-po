import React from 'react';
import { AppContext } from 'ink';
import App from '../src/components/App';

/// Convert json files to po files
const Index = () => {
    return (
        <AppContext.Consumer>
            {({ exit }) => <App exit={exit} />}
        </AppContext.Consumer>
    );
};

export default Index;
