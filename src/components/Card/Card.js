import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import styles from '../../assets/jss/material-dashboard-react/components/cardStyle';

const useStyles = makeStyles(styles);

const Card = (props) => {
  const classes = useStyles();
  const {
    className, children, plain, profile, chart, ...rest
  } = props;
  const cardClasses = classNames({
    [classes.card]: true,
    [classes.cardPlain]: plain,
    [classes.cardProfile]: profile,
    [classes.cardChart]: chart,
    [className]: className !== undefined,
  });
  return (
    <div className={cardClasses} {...rest}>
      {children}
    </div>
  );
};

Card.propTypes = {
  chart: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  plain: PropTypes.bool,
  profile: PropTypes.bool,
};

Card.defaultProps = {
  chart: false,
  children: undefined,
  className: '',
  plain: false,
  profile: false,
};

export default Card;
