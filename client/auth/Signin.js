import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import auth from './auth-helper';
import { signin } from './api-auth';

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

class Signin extends Component {

  state = {
    email: '',
    password: '',
    error: '',
    redirectToReferrer: false
  };

  clickSubmit = () => {
    const user = {
      email: this.state.email || undefined,
      password: this.state.password || undefined
    };
    signin(user).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        auth.authenticate(data, () => {
          this.setState({redirectToReferrer: true})
        })
      }
    })
  };

  handleChange = name => event => {
    this.setState({[name]: event.target.value})
  };

  render() {
    const {classes} = this.props;
    const {from} = this.props.location.state || {
      from: {pathname: '/' }
    };
    const {redirectToReferrer} = this.state;
    if (redirectToReferrer)
      return (<Redirect to={from}/>);
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography
            type='headline'
            component='h2'
            className={classes.title}
          >
            Sign Up
          </Typography>
          <TextField id='email' type='email' label='Email'
                     className={classes.textField} value=
                       {this.state.email}
                     onChange={this.handleChange('email')}
                     margin='normal'/><br/>
          <TextField id='password' type='password'
                     label='Password' className={classes.textField}
                     value={this.state.password}
                     onChange={this.handleChange('password')}
                     margin='normal'/><br/>
          {this.state.error && ( <Typography component='p'
                                             color='error'>
            <Icon color='error'
                  className={classes.error}>error</Icon>
            {this.state.error}</Typography>)}
        </CardContent>
        <CardActions>
          <Button color='primary' raised='raised'
                  onClick={this.clickSubmit}
                  className={classes.submit}>Submit</Button>
        </CardActions>
      </Card>
    );
  }
}

Signin.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Signin);
