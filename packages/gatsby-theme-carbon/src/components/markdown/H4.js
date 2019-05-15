import React from 'react';
import responsiveStyles from '../shared/responsiveStyles';

const h4Css = ({ typeStyles, spacing }) => [
  typeStyles.heading02,
  responsiveStyles,
  {
    marginBottom: 0,
  },
];

const H4 = ({ children, ...rest }) => (
  <h4 css={h4Css} {...rest}>
    {children}
  </h4>
);

export default H4;
