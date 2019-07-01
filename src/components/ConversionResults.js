import React from 'react';
import { Text, Color, Box } from 'ink';

const ConversionResults = ({ conversionResults }) => (
    <Box flexDirection="column">
        <Box marginBottom={1}>
            <Color gray>Conversion results: </Color>
        </Box>
        {conversionResults.map(result => (
            <Box key={result.input} flexDirection="column">
                <Box>
                    {result.error ? (
                        <Color red>❌</Color>
                    ) : (
                        <Color green>✔️</Color>
                    )}
                    <Box marginLeft={1}>
                        <Text>
                            {result.input} {'=>'} {result.output}
                        </Text>
                    </Box>
                    {result.error ? <Color red>{result.error}</Color> : null}
                </Box>
            </Box>
        ))}
    </Box>
);

export default ConversionResults;
