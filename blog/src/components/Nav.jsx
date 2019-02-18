import React from 'react'
import ClassNames from 'classnames'
import './Nav.less'
import { Link } from "react-router-dom";

import { withRouter } from 'react-router'

class Nav extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentDidMount(){
        console.log('nav props:', this.props);
    }

    render(){
        return(
            <div className="nav" id="nav">
                <div className="avatar-name">
                    <div className="avatar">
                        <img src={require('../resource/avatar.jpg')} />
                    </div>
                    <div className="name">
                        <i>
                            iconie
                        </i>
                    </div>
                </div>
                <div className="contents" id="nav-content">
                    <ul>
                        <li className={ClassNames({'active': this.props.location.pathname === '/'})}>
                            <Link to={'/'}>
                                <i className="iconfont icon-shouye1"></i>
                                <span>首页</span>
                            </Link>
                        </li>
                        <li className={ClassNames({'active': this.props.location.pathname === '/tagList'})}>
                            <Link to={'/tagList'}>
                                <i className="iconfont icon-biaoqian1"></i>
                                <span>标签</span>
                            </Link>
                        </li>
                        <li className={ClassNames({'active': this.props.location.pathname === '/archive'})}>
                            <Link to={'/archive'}>
                                <i className="iconfont icon-guidang1"></i>
                                <span>归档</span>
                            </Link>
                        </li>
                        <li className={ClassNames({'active': this.props.location.pathname === '/about'})}>
                            <Link to={'/about'}>
                                <i className="iconfont icon-guanyu1"></i>
                                <span>关于</span>
                            </Link>
                        </li>
                        <li className={ClassNames({'active': this.props.location.pathname === '/feedback'})}>
                            <Link to={'/feedback'}>
                                <i className="iconfont icon-guanyu1"></i>
                                <span>反馈</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}

export default withRouter(Nav)