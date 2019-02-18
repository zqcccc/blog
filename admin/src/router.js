import React, { Component } from 'react'
import Layout from './components/layout'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import Home from './components/home'
import Login from './components/Login'
import Tags from './containers/tags'
import tag from './containers/tags/tag'
import Article from './components/article'
import newArticle from './components/article/article'

class RootRouter extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/newArticle" component={newArticle} />
          <Route
            path="/"
            render={props => (
              <Layout {...props}>
                <Switch>
                  <Route path="/home" component={Home} />
                  <Route path="/articles" component={Article} />
                  <Route path="/tags" component={Tags} />
                  <Route path="/addTag" component={tag} />
                  <Route path="/test" component={Tags} />
                  <Redirect to="/home" />
                </Switch>
              </Layout>
            )}
          />
        </Switch>
      </Router>
    )
  }
}
function requireAuth(Component, props) {
  const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo')) || {}
  const { token = '' } = userInfo
  const auth = token !== '' ? false : true
  if (auth) {
    return <Redirect to="/login" />
  } else {
    return <Component {...props} />
  }
}
export default RootRouter
