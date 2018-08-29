import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

import { Delete } from '@material-ui/icons';

import auth from '../auth/auth-helper';
import { remove } from './api-user';

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

class DeleteUser extends Component {
  state = {
    redirect: false,
    open: false
  };

  clickButton = () => {
    this.setState({open: true})
  };

  handleRequestClose = () => {
    this.setState({open: false})
  };

  deleteAccount = () => {
    const jwt = auth.isAuthenticated();
    remove({
      userId: this.props.userId
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        auth.signout(() => console.log('deleted'));
        this.setState({
          redirect: true
        })
      }
    })
  };

  render() {
    const redirect = this.state.redirect;
    if (redirect) {
      return <Redirect to='/'/>
    }
    return (<span>
      <IconButton aria-label="Delete" onClick={this.clickButton}
                  color="secondary">
        <Delete/>
      </IconButton>
      <Dialog open={this.state.open} onClose={this.handleRequestClose}>
        <DialogTitle>{"Delete Account"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm to delete your account.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleRequestClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.deleteAccount} color="secondary"
                  autoFocus="autoFocus">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </span>)
  }
}

DeleteUser.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(DeleteUser);
