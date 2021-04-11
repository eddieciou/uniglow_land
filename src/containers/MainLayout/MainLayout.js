import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CssBaseline, withStyles } from '@material-ui/core';
import SideBar from '../../components/SideBar/SideBar';
import TopBar from '../../components/TopBar/TopBar';

class MainLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
    };
  }

    handleDrawerToggle = () => {
      const { mobileOpen } = this.state;
      this.setState({
        mobileOpen: !mobileOpen,
      });
    };

    render() {
      const { user, classes, band } = this.props;

      let logInComponent;
      if (user) {
        logInComponent = (
          <div>
            <TopBar name={user.name} handleDrawerToggle={this.handleDrawerToggle} />
            <SideBar
              band={band}
              mobileOpen={this.state.mobileOpen}
              handleDrawerToggle={this.handleDrawerToggle}
            />
          </div>
        );
      }

      return (
        <div className={classes.root}>
          <CssBaseline />
          {logInComponent}
          <main className={classes.content}>
            <div className={classes.toolbar} />
            {this.props.children}
          </main>
        </div>
      );
    }
}

function mapStateToProps(state) {
  const { user } = state.authentication;
  return {
    user,
  };
}

const styles = (theme) => ({
  root: {
    display: 'flex',
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    padding: (props) => theme.spacing(props.padding),
  },
});

const styleWithMainLayout = withStyles(styles)(MainLayout);

MainLayout.propTypes = {
  // 傳到withStyles
  // eslint-disable-next-line react/no-unused-prop-types
  padding: PropTypes.number,
  band: PropTypes.string.isRequired,
};

MainLayout.defaultProps = {
  padding: 3,
};

export default connect(mapStateToProps)(styleWithMainLayout);
