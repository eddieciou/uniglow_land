import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Hidden } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import sideBarMenus from '../../constants/sideBarMenus.constants';
import SideBarItem from './SideBarItem';
import arocebLogoImg from '../../assets/img/aroceb_logo.png';
import uniglowLandImg from '../../assets/img/uniglow_land_logo.png';

const drawerWidth = 240;

const SideBar = ({ mobileOpen, handleDrawerToggle, band }) => {
  const classes = useStyles({ band });
  const drawer = (
    <div className={classes.sideBackground}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img alt="logo" src={band === 'aroceb' ? arocebLogoImg : uniglowLandImg} className={classes.sideImg} />
      </div>
      <Divider variant="middle" />

      <ListItem
        button
        onClick={() => { window.location.href = `/${band === 'aroceb' ? 'uniglow_land' : 'aroceb'}/product`; }}
      >
        <ListItemText
          primary={(
            <Typography className={classes.changeBand}>
              {'< '}
              切換至
              {band === 'aroceb' ? 'Uniglow Land' : 'Aroce\'b'}
              {' >'}
            </Typography>
          )}
        />
      </ListItem>

      {
        sideBarMenus.map((menu) => (
          <SideBarItem
            key={menu.itemKey}
            band={band}
            menusItem={menu}
          />
        ))
      }
    </div>
  );

  return (
    <nav className={classes.drawer}>
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          anchor={classes.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleDrawerToggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </Drawer>
      </Hidden>
    </nav>
  );
};

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  sideBackground: {
    backgroundColor: 'white',
    minHeight: '100vh',
  },
  sideImg: {
    width: '70%',
    height: 80,
    cursor: 'pointer',
    marginTop: 30,
    marginBottom: 30,
  },
  changeBand: {
    textAlign: 'center',
    color: (props) => (props.band === 'aroceb' ? 'rgb(64,60,70)' : 'rgba(253,100,122,0.89)'),
  },
}));

SideBar.propTypes = {
  mobileOpen: PropTypes.bool.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
};

export default SideBar;
