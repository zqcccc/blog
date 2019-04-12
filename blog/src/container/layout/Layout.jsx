import React from 'react'

import Nav from '../../components/Nav'

import './Layout.less'

export default class Main extends React.Component{
    constructor(props){
        super(props);
        this.state = {

        }
    }

    componentDidMount(){

    }

    render(){
        return(
            <div>
                <div className="site-nav-toggle" id="site-nav-toggle">
                    <button>
                        <span className="btn-bar"></span>
                        <span className="btn-bar"></span>
                        <span className="btn-bar"></span>
                    </button>
                </div>

                <div className="index-about">
                    <i>The react blog</i>
                </div>

                <div className="index-container">
                    <div className="index-left">
                        <Nav activeTag={this.props.activeTag}/>
                        <div className="index-about-mobile">
                            <i>The blog for react-course</i>
                        </div>
                    </div>
                    <div className="index-middle">
                        {this.props.children}
                    </div>
                </div>

                <footer className="footer">
                    <p>Created By react@2018</p>
                </footer>

            </div>
        )
    }
}
