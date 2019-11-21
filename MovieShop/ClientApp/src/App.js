import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import Form from './components/Form';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';



import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
     
     
    <Layout>
      <AuthorizeRoute exact path='/' component={Home} />
      <AuthorizeRoute exact path='/form' component={Form} />
      <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
    </Layout>
    //</div>
    );
  }
}
