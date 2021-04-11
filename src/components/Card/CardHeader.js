import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import styles from '../../assets/jss/material-dashboard-react/components/cardHeaderStyle';

const useStyles = makeStyles(styles);

const CardHeader = (props) => {
  const classes = useStyles();
  const {
    className, children, color, plain, stats, icon, ...rest
  } = props;
  const cardHeaderClasses = classNames({
    [classes.cardHeader]: true,
    [classes[`${color}CardHeader`]]: color,
    [classes.cardHeaderPlain]: plain,
    [classes.cardHeaderStats]: stats,
    [classes.cardHeaderIcon]: icon,
    [className]: className !== undefined,
  });
  return (
    <div className={cardHeaderClasses} {...rest}>
      {children}
    </div>
  );
};

CardHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.oneOf([
    'warning',
    'success',
    'danger',
    'info',
    'primary',
    '']),
  icon: PropTypes.bool,
  plain: PropTypes.bool,
  stats: PropTypes.bool,
};

export default CardHeader;

CardHeader.defaultProps = {
  children: undefined,
  className: undefined,
  color: 'primary',
  icon: false,
  plain: false,
  stats: false,
};
