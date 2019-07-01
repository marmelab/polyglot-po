import React from 'react';
import PropTypes from 'prop-types';
import { Color } from 'ink';

const Error = ({ children }) => <Color red>{children}</Color>;

Error.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Error;
