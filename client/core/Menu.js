import React from 'react';

import { withRouter, Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';

import { Home } from '@material-ui/icons';

import auth from '../auth/auth-helper';

const isActive = (history, path) => {
  if (history.location.pathname === path)
    return {color: '#ff4081'};
  else
    return {color: '#ffffff'}
};

const Menu = withRouter(({history}) => (
  <div>
    <AppBar position="static">
      <Toolbar>
        <Typography type="title" color="inherit">
          MERN Skeleton
        </Typography>
        <Link to="/">
          <IconButton aria-label="Home" style={isActive(history, "/")}>
            <Home/>
          </IconButton>
        </Link>
        <Link to="/users">
          <Button style={isActive(history, "/users")}>Users</Button>
        </Link>
        {!auth.isAuthenticated() && (<span>
          <Link to="/signup">
            <Button style={isActive(history, "/signup")}> Sign Up </Button>
          </Link>
          <Link to="/signin">
            <Button style={isActive(history, "/signin")}> Sign In </Button>
          </Link>
        </span>)}
        {auth.isAuthenticated() && (<span>
          <Link to={"/user/" + auth.isAuthenticated().user._id}>
            <Button style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>
              My Profile
            </Button>
          </Link>
          <Button color="inherit" onClick={() => { auth.signout(() => history.push('/')) }}>
            Sign out
          </Button>
        </span>)}
      </Toolbar>
    </AppBar>
  </div>
));

export default Menu;
