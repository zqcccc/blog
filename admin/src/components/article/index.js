import React from 'react'
import './index.less'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getArtList, postTag, editTag, deleteTag } from '../../redux/action'
import { Button, Modal, Table } from 'antd'
class ArticleList extends React.Component {
  state = {
    type: 'new',
    title: '添加文章'
  }
  columns = [
    {
      title: 'id',
      key: '_id',
      dataIndex: '_id',
      width: 10
    },
    {
      title: '文章名',
      key: 'title',
      dataIndex: 'title'
    },
    {
      title: '标签',
      key: 'tag',
      dataIndex: 'tag'
    },
    // {
    //   title: '描述',
    //   key: 'descript',
    //   dataIndex: 'descript'
    // },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (text, record) => {
        return (
          <div>
            <Button
              type="primary"
              style={{ marginRight: 5 }}
              onClick={() => {
                this.handleEdit(record)
              }}
            >
              编辑
            </Button>
            <Button
              onClick={() => {
                this.handleDelete(record)
              }}
            >
              删除
            </Button>
          </div>
        )
      }
    }
  ]
  componentDidMount() {
    this.props.init({})
  }
  render() {
    const { article: list = [], status } = this.props
    return (
      <div className="article-wrap">
        <Button style={{ marginBottom: 10 }} type="primary">
          <Link
            to={{
              pathname: '/newArticle',
              state: { type: 'new', title: '添加文章' }
            }}
          >
            添加文章
          </Link>
        </Button>
        <Table
          bordered
          loading={status.isLoading}
          columns={this.columns}
          dataSource={list}
          pagination={false}
        />
      </div>
    )
  }
}

export default connect(
  ({ article, tag, status }) => ({ article, tag, status }),
  {
    init: k => getArtList(k)
  }
)(ArticleList)
