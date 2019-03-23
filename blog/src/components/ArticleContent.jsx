import React from 'react'
const queryString = require('query-string');
import "./ArticleContent.less"
import axios from "axios/index";
import {preURL, publicURL} from "../config";
import moment from "moment/moment";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import { getContent } from 'action/action'
const ReactMarkdown = require('react-markdown')

class ArticleContent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            post:{}
        }
    }

    componentDidMount(){

        const query = this.props.match.params;
        const { contentList, getContent } = this.props
        // TODO: 可以先采用 redux 中的信息
        if(!contentList.get(query.pathName)) {
            getContent(query.pathName)
        } // 如果 store 里有文章的内容就不请求了
        // fetchData(`post?pathName=${query.pathName}`).then(() => {
        //     content = this.props.contentList.get(query.pathName)
        //     this.setState({
        //         post: content || {}
        //     })
        // })
        // axios.get(`${preURL}/post?pathName=${query.pathName}`).then((response) => {
        //     console.log('%c content response', 'color: #898989', response.data)
        //     this.setState({
        //         post:response.data
        //     })
        // },(error) => {
        //     alert('拉取数据失败，请配置后端博客服务！')
        // })
    }

    render(){
        const query = this.props.match.params
        // 先用列表页的元数据
        const contentMeta = this.props.list.get(query.pathName) || {}
        const content = this.props.contentList.get(query.pathName) || {}

        return(
            <div className={'post-container'}>

                <div className={'post-title'}>
                    {content.title || contentMeta.title}
                </div>

                <div className={'post-meta'}>

                    <span className={'attr'}>
                        发布于：
                        {moment(content.date || contentMeta.date).format('YYYY-MM-DD hh:mm:ss')}
                    </span>

                    <span className={'attr'}>
                        标签：/
                        {(content.tags || contentMeta.tags || []).map((item, index) =>
                            " " + item + " /"
                        )}
                    </span>

                    <span className={'attr'}>
                        访问：

                    </span>

                </div>


                <div className={'post-content'}>
                    <ReactMarkdown source={content._content || ''} />
                </div>

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const { status, contentList, list } = state
    return { status, contentList, list }
}
// const mapDispatchToProps = dispatch => ({
//     // 例如：yourAction:bindActionCreators(yourAction, dispatch),
//     fetchData
// })
const mapDispatchToProps = {
    getContent
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleContent)
