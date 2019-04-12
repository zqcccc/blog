import React from 'react'
import axios from 'axios'
import './CommentForm.less'
// import './ArticleContent.less'

export default class FeedbackForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {
        nickname: '',
        mail: '',
        title: '',
        content: ''
      }
    }
  }

  componentDidMount() {}

  setForm(obj = {}) {
    let form = this.state.form
    let newForm = Object.assign({}, form, obj)
    this.setState({
      form: newForm
    })
  }

  async submitFeedback() {
    if (this.state.form.mail && this.state.form.content && this.props.id) {
      const data = Object.assign({}, this.state.form, {
        article: this.props.id
      })
      console.log('data: ', data)
      const res = await axios.post('/api/comment', data)
      if(res.data.code) {
        alert('评论发送成功')
      } else {
        alert('评论发送失败，请检查网络情况或联系管理员')
      }
    }
    // console.log(this.props.id)
    // alert('提交留言的接口已经完成，但是由于某些原因暂未开放（iconie）')
  }

  render() {
    return (
      <div className={'post-container'}>
        <div className={'post-title'}>给我留言</div>

        <div className={'form-item'}>
          <label htmlFor="name">昵称：</label>
          <input
            id={'name'}
            autoComplete="off"
            value={this.state.form.nickname}
            onChange={e => {
              this.setForm({
                nickname: e.target.value
              })
            }}
          />
        </div>

        <div className={'form-item'}>
          <label htmlFor="mail">邮箱：</label>
          <input
            id={'mail'}
            autoComplete="off"
            value={this.state.form.mail}
            onChange={e => {
              this.setForm({
                mail: e.target.value
              })
            }}
          />
        </div>

        <div className={'form-item'}>
          <label htmlFor="title">标题：</label>
          <input
            id={'title'}
            autoComplete="off"
            value={this.state.form.title}
            onChange={e => {
              this.setForm({
                title: e.target.value
              })
            }}
          />
        </div>

        <div className={'form-item'}>
          <label htmlFor="detail">详情：</label>
          <textarea
            id={'detail'}
            autoComplete="off"
            value={this.state.form.content}
            onChange={e => {
              this.setForm({
                content: e.target.value
              })
            }}
          />
        </div>

        <div className={'form-item'}>
          <button
            onClick={() => {
              this.submitFeedback()
            }}
          >
            提交留言
          </button>
        </div>
      </div>
    )
  }
}
