import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';

//Import Image 
import SoftLogo from "./includes/imgs/logo/Only_arrow.png"

const loading = (
  <div className="loadingBox">
      <div className="loadingArea">
          <img src={SoftLogo} alt="SoftWiders" />
          <div>
            Loading...
          </div>
      </div>
  </div>
)

// Containers
// const TheLayout = React.lazy(() => import('./containers/TheLayout'));
const TheMainLayout = React.lazy(() => import('./deskPage/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

class App extends Component {

  render() {
    return (
      <HashRouter>
          <React.Suspense fallback={loading}>
            <Switch>
              {/* <Route exact path="/dashboard" name="Dashboard" render={props => <TheLayout {...props}/>} /> */}
              <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              <Route path="/" name="HomePage" render={props => <TheMainLayout {...props}/>} />
            </Switch>
            {/* <Redirect from="/" to="/homepage" /> */}
          </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
