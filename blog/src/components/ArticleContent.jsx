import React from 'react'
const queryString = require('query-string')
import './ArticleContent.less'
import axios from 'axios/index'
import { preURL, publicURL } from '../config'
import moment from 'moment/moment'
import { connect } from 'react-redux'
import CodeBlock from './code-block'
import { getContent, getList } from 'action/action'
import CommentForm from './CommentForm'
import CommentList from './CommentList'
const ReactMarkdown = require('react-markdown')

class ArticleContent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // post: {},
      commentList: []
    }
  }

  async componentDidMount() {
    const query = this.props.match.params
    const { list, getList } = this.props
    const article = list.get(query.id)
    if (!article) {
      getList()
    } // 如果 store 里有文章的内容就不请求了
    axios.get(`/api/comment/${query.id}`).then(res => {
      if (res.data && res.data.code && res.data.data) {
        console.log(res)
        this.setState({
          commentList: res.data.data
        })
      }
    })
    // fetchData(`post?pathName=${query.pathName}`).then(() => {
    //     content = this.props.contentList.get(query.pathName)
    //     this.setState({
    //         post: content || {}
    //     })
    // })
    // axios.get(`${preURL}/post?pathName=${query.pathName}`).then((response) => {
    //
    //     this.setState({
    //         post:response.data
    //     })
    // },(error) => {
    //     alert('拉取数据失败，请配置后端博客服务！')
    // })
  }

  render() {
    const query = this.props.match.params
    // 先用列表页的元数据
    const { list } = this.props

    // const contentMeta = list.get(query.title) || {}

    const content = list.get(query.id) || {}

    return (
      <div className={'post-container'}>
        <div className={'post-title'}>
          {content.title || 'contentMeta.title'}
        </div>

        <div className={'post-meta'}>
          <span className={'attr'}>
            发布于：
            {moment(content.date || content.update_at || '').format(
              'YYYY-MM-DD hh:mm:ss'
            )}
          </span>

          <span className={'attr'}>
            标签：/
            {(content.tag || []).map((item, index) => ' ' + item.name + ' /')}
          </span>

          {/* <span className={'attr'}>访问：</span> */}
        </div>

        <div className={'post-content'}>
          <ReactMarkdown
            source={content.content || ''}
            renderers={{
              code: CodeBlock
            }}
          />
        </div>
        <CommentList commentList={this.state.commentList || []} />
        <CommentForm id={content._id} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  const { status, contentList, list } = state
  return { status, contentList, list }
}
// const mapDispatchToProps = dispatch => ({
//     // 例如：yourAction:bindActionCreators(yourAction, dispatch),
//     fetchData
// })
const mapDispatchToProps = {
  getContent,
  getList
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArticleContent)
