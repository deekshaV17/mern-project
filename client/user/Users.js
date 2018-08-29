import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { ArrowForward, Person } from '@material-ui/icons';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import { list } from './api-user';

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


class Users extends Component {
  state = {
    users: [],
  };

  componentDidMount() {
    list().then(data => {
      if(data.error) {
        console.log(data.error);
      }
      else {
        this.setState({
          users: data
        });
      }
    })
  };

  render() {
    const {classes} = this.props;
    return (
      <Paper  elevation={4}>
        <Typography type='title' >
          All Users
        </Typography>
        <List dense>
          {this.state.users.map(function(item, i) {
            return <Link to={'/user/' + item._id} key={i}>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar>
                    <Person/>
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={item.name}/>
                <ListItemSecondaryAction>
                  <IconButton>
                    <ArrowForward/>
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </Link>
          })}
        </List>
      </Paper>
    )
  }
}

Users.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Users);
