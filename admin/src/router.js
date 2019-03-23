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
import Article from './containers/article'
import newArticle from './containers/article/article'
import Comment from './containers/comment'

class RootRouter extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login" component={Login} />
          <Route
            path="/"
            render={props => (
              <Layout {...props}>
                <Switch>
                  <Route
                    path="/home"
                    component={props => requireAuth(Home, props)}
                  />
                  <Route
                    path="/articles"
                    component={props => requireAuth(Article, props)}
                  />
                  <Route
                    path="/tags"
                    component={props => requireAuth(Tags, props)}
                  />
                  <Route
                    path="/comments"
                    component={props => requireAuth(Comment, props)}
                  />
                  <Route
                    path="/test"
                    component={props => requireAuth(Tags, props)}
                  />
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
