import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Redirect, Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import { Edit, Person } from '@material-ui/icons';

import auth from '../auth/auth-helper';
import { read } from './api-user';

import DeleteUser from './DeleteUser';

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing.unit * 5
  },
  title: {
    padding:`${theme.spacing.unit * 3}px ${theme.spacing.unit * 2.5}px ${theme.spacing.unit * 2}px`,
    color: theme.palette.text.secondary
  },
  media: {
    minHeight: 330
  }
});

class Profile extends Component {
  constructor({match}) {
    super();
    this.state = {
      user: '',
      redirectToSignin: false
    };
    this.match = match;
  }

  init = (userId) => {
    const jwt = auth.isAuthenticated();
    read({
      userId: userId
    }, {t: jwt.token}).then((data) => {
      if (data.error)
        this.setState({
          redirectToSignin: true
        });
      else
        this.setState({
          user: data
        })
    })
  };

  componentDidMount() {
    this.init(this.match.params.userId)
  };
  componentWillReceiveProps(props) {
    this.init(props.match.params.userId)
  };

  render(){
    const {classes} = this.props;
    const redirectToSignin = this.state.redirectToSignin;
    if (redirectToSignin)
      return <Redirect to='/signin'/>;
    return (
      <div>
        <Paper elevation={4}>
          <Typography type="title" className={classes.title}> Profile </Typography>
          <List dense>
            <ListItem>
              { auth.isAuthenticated().user && auth.isAuthenticated().user._id === this.state.user._id &&
              (<ListItemSecondaryAction>
                <Link to={"/user/edit/" + this.state.user._id}>
                  <IconButton color="primary">
                    <Edit/>
                  </IconButton>
                </Link>
                <DeleteUser userId={this.state.user._id}/>
              </ListItemSecondaryAction>
              )}
              <ListItemAvatar>
                <Avatar>
                  <Person/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={this.state.user.name} secondary={this.state.user.email}/></ListItem>
            <Divider/>
            <ListItem>
              <ListItemText primary={"Joined: " + (new Date(this.state.user.created)).toDateString()}/>
            </ListItem>
          </List>
        </Paper>
      </div>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
