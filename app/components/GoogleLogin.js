import React, { Component } from 'react';

export default class GoogleLogin extends Component {
  constructor(props) {
    super(props)

    this.handleSignOut = this.handleSignOut.bind(this)
  }
  componentDidMount() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '967595388414-md1jol7e2elna94fo5j23ig8stl63mmv.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
      });
      this.attachSignin(document.getElementById('customBtn'));
    });
  }

  checkIsSignedIn() {
    if (localStorage.getItem('email') !== null) {
      return true
    }
    return false
  }

  attachSignin(element) {
    this.auth2.attachClickHandler(
      element,
      {},
      (googleUser) => {
        localStorage.setItem('email', googleUser.getBasicProfile().getEmail())
        this.setState({
          userData: {
            email: googleUser.getBasicProfile().getEmail()
          }
        })
        this.props.history.push('/todos')
      },
      (error) => {
        alert(JSON.stringify(error, undefined, 2));
      }
    );
  }

  handleSignOut() {
    localStorage.removeItem('email')
    this.props.history.push('/')
  }

  render() {
    const email = localStorage.getItem('email')
    return (
      <div>
        <div>
          {this.checkIsSignedIn() &&
            <p>{email}</p>
          }
          <button  className="btn" id="customBtn" style={this.checkIsSignedIn() ? { display: 'none '} : {}} >
            Login via Google
          </button>
          <button
            className="btn"
            style={!this.checkIsSignedIn() ? { display: 'none '} : {} }
            onClick={this.handleSignOut}
          >
            Sign out
          </button>
        </div>
      </div>
    )
  }
}
