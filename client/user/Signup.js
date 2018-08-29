import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import Icon from '@material-ui/core/Icon';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';

import { create } from './api-user';

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

class Signup extends Component {

  state = {
    name: '',
    password: '',
    email: '',
    open: false,
    error: '',
  };

  handleChange = name => event => {
    this.setState({[name]: event.target.value})
  };

  clickSubmit = () => {
    const user = {
      name: this.state.name || undefined,
      email: this.state.email || undefined,
      password: this.state.password || undefined
    };
    create(user).then((data) => {
      if (data.error)
        this.setState({
          error: data.error
        });
      else
        this.setState({
          error: '', open: true
        });
    })
  };

  render() {
    const {classes} = this.props;
    return (
      <div>
      <Card className={classes.card}>
        <CardContent>
          <Typography
            type='headline'
            component='h2'
            className={classes.title}
          >
            Sign Up
          </Typography>
          <TextField id='name'
                     label='Name'
                     value={this.state.name}
                     onChange={this.handleChange('name')}
                     margin='normal'
          />
          <br/>
          <TextField id='email'
                     type='email'
                     label='Email'
                     value={this.state.email}
                     onChange={this.handleChange('email')}
                     margin='normal'
          />
          <br/>
          <TextField id='password'
                     type='password'
                     label='Password'
                     value={this.state.password}
                     onChange={this.handleChange('password')}
                     margin='normal'
          />
          <br/>
          {this.state.error && (
            <Typography component='p' color='error'>
              <Icon color='error'>error</Icon>
              {this.state.error}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          <Button color='primary' raised='raised' onClick={this.clickSubmit}>Submit</Button>
        </CardActions>
      </Card>
      <Dialog open={this.state.open} disableBackdropClick={true}>
        <DialogTitle>New Account</DialogTitle>
        <DialogContent>
          <DialogContentText>
            New account successfully created.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link to='/signin'>
            <Button color='primary' autoFocus='autoFocus' variant='raised'>
              Sign In
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
    )
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Signup);
