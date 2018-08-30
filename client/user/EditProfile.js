import PropTypes from 'prop-types';
import React, { Component } from 'react';

import { Redirect } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';

import Icon from '@material-ui/core/Icon';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import auth from '../auth/auth-helper';
import { read, update } from "./api-user";

const styles = theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 2
  },
  title: {
    margin: theme.spacing.unit * 2,
    color: theme.palette.protectedTitle
  },
  error: {
    verticalAlign: 'middle'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing.unit * 2
  }
});

class EditProfile extends Component {
  constructor({ match }) {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      photo: '',
      redirectToProfile: false,
      error: ''
    };
    this.match = match
  }

  componentDidMount() {

    this.userData = new FormData();
    const jwt = auth.isAuthenticated();
    read({
      userId: this.match.params.userId
    }, {t: jwt.token}).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({name: data.name, email: data.email})
      }
    })
  };
  clickSubmit = () => {
    const jwt = auth.isAuthenticated();
    const user = {
      name: this.state.name || undefined,
      email: this.state.email || undefined,
      password: this.state.password || undefined,
      about: this.state.about || undefined
    };
    update({
      userId: this.match.params.userId
    }, {
      t: jwt.token
    }, user).then((data) => {
      if (data.error) {
        this.setState({error: data.error})
      } else {
        this.setState({'userId': data._id, 'redirectToProfile': true})
      }
    })
  };

  handleChange = name => event => {
    const value = name === 'photo'
      ? event.target.files[0]
      : event.target.value;
    this.userData.set(name, value);
    this.setState({ [name]: value })
  };

  render() {
    const {classes} = this.props;
    if (this.state.redirectToProfile) {
      return (<Redirect to={'/user/' + this.state.userId}/>)
    }
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography type="headline" component="h2" className={classes.title}>
            Edit Profile
          </Typography>
          <br/>
          <input accept="image/*" type="file"
                 onChange={this.handleChange('photo')}
                 style={{display:'none'}}
                 id="icon-button-file"
          />
          <TextField
            id="name"
            label="Name"
            className={classes.textField}
            value={this.state.name}
            onChange={this.handleChange('name')}
            margin="normal"
          />
          <label htmlFor="icon-button-file">
            <Button variant="raised" color="default" component="span">
              Upload <FileUpload/>
            </Button>
          </label>
          <span className={classes.filename}>{this.state.photo ? this.state.photo.name : ''}</span><br/>
          <TextField
            id="multiline-flexible"
            label="About"
            multiline
            rows="2"
            value={this.state.about}
            onChange={this.handleChange('about')}
          />
          <br />
          <TextField
            id="email"
            type="email"
            label="Email"
            className={classes.textField}
            value={this.state.email}
            onChange={this.handleChange('email')}
            margin="normal"
          />
          <br/>
          <TextField
            id="password"
            type="password"
            label="Password"
            className={classes.textField}
            value={this.state.password}
            onChange={this.handleChange('password')}
            margin="normal"
          />
          <br/> {
          this.state.error && (<Typography component="p" color="error">
            <Icon color="error" className={classes.error}>error</Icon>
            {this.state.error}
          </Typography>)
        }
        </CardContent>
        <CardActions>
          <Button color="primary" variant="raised" onClick={this.clickSubmit} className={classes.submit}>Submit</Button>
        </CardActions>
      </Card>
    )
  }
}

EditProfile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditProfile);
