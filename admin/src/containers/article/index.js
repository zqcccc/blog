import React from 'react'
import './index.less'
// import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import {
  getArtList,
  postArticle,
  editArticle,
  deleteArticle
} from '../../redux/action'
import { Button, Modal, Table, Tag, message } from 'antd'
// import Item from 'antd/lib/list/Item'
import moment from 'moment'
import Article from './article'


class ArticleList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      type: '',
      title: '',
      artInfo: {},
      isVisible: false
    }
    this.columns = [
      // {
      //   title: 'id',
      //   key: '_id',
      //   dataIndex: '_id',
      //   width: 10
      // },
      {
        title: '文章名',
        key: 'title',
        dataIndex: 'title'
      },
      {
        title: '发布时间',
        key: 'create_at',
        dataIndex: 'create_at',
        // width: 10,
        render: time => (
          <span key={time}>
            {moment(time).format("YYYY-MM-DD h:mm:ss A")}
          </span>
        )
      },
      {
        title: '标签',
        key: 'tag',
        dataIndex: 'tag',
        render: arr => (
          <span>
            {arr.map(i => (
              <Tag color="cyan" key={i._id}>
                {i.name}
              </Tag>
            ))}
          </span>
        )
      },
      // {
      //   title: '描述',
      //   key: 'descript',
      //   dataIndex: 'descript'
      // },
      {
        title: '操作',
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
  }

  handleSubmit = () => {
    const data = this.artForm.props.form.getFieldsValue()
    console.log('data: ', data)
    this.artForm.props.form.resetFields()
    if (this.state.type === 'add') {
      this.props.postArt(data)
    } else {
      data._id = this.state.artInfo._id
      this.props.editArt(data)
    }
    this.setState({
      isVisible: false,
      artInfo: {}
    })
  }

  // 添加操作
  handleAdd = () => {
    this.setState({
      title: '新添文章',
      isVisible: true,
      type: 'add'
    })
  }
  // 编辑操作
  handleEdit = record => {
    this.setState({
      title: '编辑标签',
      isVisible: true,
      type: 'edit',
      artInfo: record
    })
  }
  // 删除操作
  handleDelete = record => {
    let id = record._id
    Modal.confirm({
      title: '删除数据',
      content: '您确认要删除此条数据吗？',
      onOk: () => {
        console.log(id)
        this.props.deleteArt(id)
      }
    })
  }

  componentDidMount() {
    this.props.init({})
  }
  componentWillUpdate() {
    const { status } = this.props
    if (status.isSuccess && status.msg) {
      message.success(status.msg)
    } else if (status.isFail && status.msg) {
      message.error(status.msg)
    }
  }
  render() {
    const { article: list = [], status, tag } = this.props
    // console.log(list)
    return (
      <div className="article-wrap">
        <Button
          style={{ marginBottom: 10 }}
          type="primary"
          onClick={() => {
            this.handleAdd()
          }}
        >
          添加文章
        </Button>
        <Table
          bordered
          loading={status.isLoading}
          columns={this.columns}
          dataSource={list}
          pagination={{ hideOnSinglePage: true, showQuickJumper: true }}
        />
        <Modal
          width={1000}
          title={this.state.title}
          visible={this.state.isVisible}
          Loading={this.props.status.isLoading}
          footer={null}
          onCancel={() => {
            this.artForm.props.form.resetFields()
            this.setState({
              isVisible: false,
              artInfo: {}
            })
          }}
        >
          <Article
            type={this.state.type}
            artInfo={this.state.artInfo}
            handleSubmit={this.handleSubmit}
            wrappedComponentRef={inst => (this.artForm = inst)}
          />
        </Modal>
      </div>
    )
  }
}

export default connect(
  ({ article, tag, status }) => ({ article, tag, status }),
  {
    init: x => getArtList(x),
    postArt: article => postArticle(article),
    editArt: article => editArticle(article),
    deleteArt: id => deleteArticle(id)
  }
)(ArticleList)
