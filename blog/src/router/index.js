import React from "react";
import Layout from '../container/layout/Layout'
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";

import ArticleContent from '../components/ArticleContent'
import ArticleList from '../components/ArticleList'
import CommentForm from '../components/CommentForm'
import TagList from "../components/TagList";
import ArchiveList from "../components/ArchiveList";
import AboutMe from "../components/AboutMe";

const EnterRouter = () => (
    <Router>
        <Layout>
        <Switch>
            <Route exact path="/" component={ArticleList} />
            <Route path="/article/:id" component={ArticleContent} />
            {/* TODO: 在这里增加必要的路由 */}
            <Route path="/tagList" component={TagList} />
            <Route path="/archive" component={ArchiveList} />
            <Route path="/about" component={AboutMe} />
            <Route path="/feedback" component={CommentForm} />
        </Switch>
        </Layout>
    </Router>
);

export default EnterRouter
