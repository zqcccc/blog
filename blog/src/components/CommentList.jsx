import React, { Component } from 'react'
import axios from 'axios'
import { preURL } from '../config'
import moment from 'moment'

import './CommentList.less'

moment.locale('zh-cn')

export default class FeedbackList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      list: []
    }
  }
  // componentDidMount() {
  //   this.getNewComents()
  // }

  // async componentDidMount() {
  //   if(!this.props.id) {
  //     console.log(11111111111111)
  //     return
  //   }
  //   const id = this.props.id
  //   const result = await axios.get(`/api/comment/${id}`)
  //   const { code, data } = result.data
  //   console.log('result.data: ', result.data);

  //   if(code) {
  //     return
  //   }
  //   // const sortedData = datas.sort((a, b) => {
  //   //   return a.updateTime >= b.updateTime ? -1 : 1
  //   // })
  //   this.setState({
  //     list: sortedData
  //   })
  // }
  listRender(list) {
    return (
      <ul>
        {list.map(({ update_at, mail, nickname, content, _id: id }) => {
          return (
            <li key={id} className="fb-item">
              <div>
                <span className={'fb-time'}>{moment(update_at).format("YYYY-MM-DD HH:mm:ss")}</span>
                <span className={'fb-mail'}>
                  {mail}
                </span>
                <span className={'fb-name'}>
                  {nickname}
                </span>
              </div>
              <p className="fb-content">{content}</p>
            </li>
          )
        })}
      </ul>
    )
  }

  render() {
    const list = this.props.commentList || []
    return (
      <div className={'post-container'}>
        <div className={'post-title'}>最新留言</div>
        <div className={'fb-list'}>
          {list.length ? this.listRender(list) : <p>暂无留言。</p>}
        </div>
      </div>
    )
  }
}
