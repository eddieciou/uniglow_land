import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse/Collapse';
import List from '@material-ui/core/List';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import VerifyPermission from '../VerifyPermission';

const SideBarItem = ({ menusItem, band }) => {
  // console.log(band)
  const classes = useStyles({ band });
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  if (menusItem.href) {
    return (
      <ListItem
        button
        className={classes.item}
        onClick={() => { window.location.href = `/${band}${menusItem.href}`; }}
      >
        <ListItemText primary={menusItem.itemName} />
      </ListItem>
    );
  }
  return (
    <div>
      <ListItem button onClick={handleClick} className={classes.item}>
        <ListItemText primary={menusItem.itemName} />
        {open
          ? <ExpandLess style={{ color: 'rgba(253,100,122,0.89)' }} />
          : <ExpandMore style={{ color: 'rgba(253,100,122,0.89)' }} />}
      </ListItem>
      { menusItem.childItem.map((menu) => {
        const item = (
          <Collapse key={menu.itemName} in={open} timeout="auto" unmountOnExit className={classes.item}>
            <List component="div" disablePadding>
              <ListItem
                button
                className={classes.item}
                onClick={() => { window.location.href = `${menu.href}`; }}
              >
                <ListItemText primary={menu.itemName} />
              </ListItem>
            </List>
          </Collapse>
        );
        return (
          <VerifyPermission
            key={menu.itemName}
            perform={menu.itemKey}
            yes={() => item}
          />
        );
      })}
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  item: {
    color: (props) => (props.band === 'aroceb' ? 'rgba(253,100,122,0.89)' : 'rgb(64,60,70)'),
    '&:hover': {
      color: (props) => (props.band === 'aroceb' ? 'rgb(64,60,70)' : 'rgba(253,100,122,0.89)'),
    },
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

SideBarItem.propTypes = {
  menusItem: PropTypes.shape({
    itemKey: PropTypes.string.isRequired,
    itemName: PropTypes.string.isRequired,
    childItem: PropTypes.arrayOf(PropTypes.shape({})),
    href: PropTypes.string,
  }).isRequired,
  band: PropTypes.string.isRequired,
};

export default SideBarItem;
