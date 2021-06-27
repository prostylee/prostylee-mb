import React from 'react';
import PropTypes from 'prop-types';

const NewFeedItemBody = ({top, slider, bottom}) => {
  return (
    <>
      {top}
      {slider}
      {bottom}
    </>
  );
};

NewFeedItemBody.propTypes = {
  top: PropTypes.any,
  slider: PropTypes.any.isRequired,
  bottom: PropTypes.any,
};

export default NewFeedItemBody;
