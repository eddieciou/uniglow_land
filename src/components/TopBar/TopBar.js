import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar/AppBar';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const drawerWidth = 240;

const TopBar = (props) => {
  const classes = useStyles();
  const [anchorUser, setAnchorUser] = useState(null);

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={props.handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          摯善美學庫存系統
        </Typography>
        <Button className={classes.userButton} onClick={(e) => { setAnchorUser(e.currentTarget); }}>
          {props.name}
        </Button>
        <Menu
          anchorEl={anchorUser}
          keepMounted
          open={Boolean(anchorUser)}
          onClose={() => { setAnchorUser(null); }}
        >
          <MenuItem
            style={{ color: 'rgba(253,100,122,0.89)' }}
            onClick={() => {
              setAnchorUser(null);
              window.location.href = '/reservation/personal_setting';
            }}
          >
            修改使用者資料
          </MenuItem>
          <MenuItem
            style={{ color: 'rgba(253,100,122,0.89)' }}
            onClick={() => {
              setAnchorUser(null);
              window.location.href = '/reservation/reset_password';
            }}
          >
            更換密碼
          </MenuItem>
        </Menu>

        <div className={classes.userButton}>|</div>
        <Button className={classes.userButton} href="/reservation/login" endIcon={<ExitToAppIcon />}>登出</Button>
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
    backgroundColor: '#ffffff',
    color: 'black',
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  title: {
    flexGrow: 1,
    color: 'grey',
  },
  userButton: {
    marginLeft: 10,
    textTransform: 'none',
    color: 'rgba(253,100,122,0.89)',
  },
}));

export default TopBar;
