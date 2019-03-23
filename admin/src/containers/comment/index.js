import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button, Table, message } from 'antd'
import axios from '../../axios'

class CommentList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      isLoading: true
    }
    this.columns = [
      {
        title: '标题',
        key: 'title',
        dataIndex: 'title'
      },
      {
        title: '内容',
        key: 'content',
        dataIndex: 'content'
      },
      {
        title: '邮箱',
        key: 'mail',
        dataIndex: 'mail'
      },
      {
        title: '来自文章',
        key: 'article',
        dataIndex: 'article.title'
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (text, record) => (
          <div>
            <Button
              type="primary"
              onClick={() => {
                this.handleDelete(record)
              }}
            >
              删除
            </Button>
          </div>
        )
      }
    ]
  }

  async handleDelete(record) {
    this.setState({
      isLoading: true
    })
    const res = await axios.api_delete_comment(record._id)
    const { code, msg } = res.data
    if (code) {
      message.success(msg)
      this.initData()
    } else {
      console.log('删除失败了', msg)
      message.error(msg)
    }
  }
  async initData() {
    const res = await axios.api_get_comment()
    const { code, data = [], msg } = res.data
    if (code) {
      const temp = data.map(i => {
        i.key = i._id
        return i
      })

      this.setState({
        dataSource: temp,
        isLoading: false
      })
      return 1
    } else {
      message.error(msg)
    }
  }
  componentDidMount() {
    const s = this.initData()
    if (s) message.success('获取评论成功')
  }
  componentWillUpdate() {
    const { status } = this.props
    if (status.isSuccess && status.msg) {
    } else if (status.isFail && status.msg) {
    }
  }
  render() {
    const { dataSource, isLoading } = this.state
    return (
      <div>
        <Table
          bordered
          columns={this.columns}
          dataSource={dataSource}
          loading={isLoading}
          pagination={{ hideOnSinglePage: true, showQuickJumper: true }}
        />
      </div>
    )
  }
}

export default connect(
  ({ status }) => ({ status }),
  { init: () => {} }
)(CommentList)
