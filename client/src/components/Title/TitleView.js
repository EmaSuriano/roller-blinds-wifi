import React from 'react';
import PropTypes from 'prop-types';

const Title = ({ message }) => <h1 className="title">{message}</h1>;

Title.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Title;
