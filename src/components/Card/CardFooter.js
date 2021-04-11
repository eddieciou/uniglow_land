import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import styles from '../../assets/jss/material-dashboard-react/components/cardFooterStyle';

const useStyles = makeStyles(styles);

const CardFooter = (props) => {
  const classes = useStyles();
  const {
    className, children, plain, profile, stats, chart, ...rest
  } = props;
  const cardFooterClasses = classNames({
    [classes.cardFooter]: true,
    [classes.cardFooterPlain]: plain,
    [classes.cardFooterProfile]: profile,
    [classes.cardFooterStats]: stats,
    [classes.cardFooterChart]: chart,
    [className]: className !== undefined,
  });
  return (
    <div className={cardFooterClasses} {...rest}>
      {children}
    </div>
  );
};

CardFooter.propTypes = {
  chart: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  plain: PropTypes.bool,
  profile: PropTypes.bool,
  stats: PropTypes.bool,
};

export default CardFooter;

CardFooter.defaultProps = {
  chart: false,
  children: undefined,
  className: '',
  plain: false,
  profile: false,
  stats: false,
};
