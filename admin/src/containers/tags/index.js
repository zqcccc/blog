import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getTagList, postTag, editTag, deleteTag } from '../../redux/action'
import './index.less'
import {
  Table,
  Form,
  Button,
  message,
  Modal,
} from 'antd'
import Tag from './tag'

const FormItem = Form.Item

class tagList extends Component {
  constructor(props) {
    super(props)
    this.state = { title: '', type: '', tagInfo: {}, isVisible: false }
    this.columns = [
      {
        title: 'id',
        key: '_id',
        dataIndex: '_id',
        width: '10'
      },
      {
        title: '标签名',
        key: 'name',
        dataIndex: 'name',
        editable: true,
        width: '20%'
      },
      {
        title: '描述',
        key: 'descript',
        dataIndex: 'descript',
        editable: true,
        width: '30%'
      },
      {
        title: '文章数',
        key: 'num',
        dataIndex: 'num',
        width: '10%'
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        width: '30%',
        render: (text, record) => {
          return (
            <div>
              <Button
                type="primary"
                onClick={() => {
                  this.handleEdit(record)
                }}
              >
                编辑
              </Button>
              <Button
                style={{ marginLeft: 5 }}
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
    const data = this.tagForm.props.form.getFieldsValue()
    this.tagForm.props.form.resetFields()
    console.log(data)
    if (this.state.type === 'add') {
      this.props.postTag(data)
    } else {
      data._id = this.state.tagInfo._id
      this.props.editTag(data)
    }
    this.setState({
      isVisible: false,
      tagInfo: {}
    })
  }
  handleAdd = () => {
    this.setState({
      title: '创建标签',
      isVisible: true,
      type: 'add'
    })
  }
  handleEdit = record => {
    this.setState({
      title: '编辑标签',
      isVisible: true,
      type: 'edit',
      tagInfo: record
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
        this.props.deleteTag(id)
      }
    })
  }
  componentDidMount() {
    this.props.init()
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
    const { tag: list = [], status } = this.props
    if (list.length) {
      list.map(i => {
        i.key = i._id
      })
    }
    return (
      <div>
        <Button
          type="primary"
          style={{ marginBottom: 10 }}
          onClick={() => {
            this.handleAdd()
          }}
        >
          添加标签
        </Button>
        <Table
          bordered
          loading={this.props.status.isLoading}
          columns={this.columns}
          dataSource={list}
          pagination={false}
          scroll={{ x: true }}
        />
        <Modal
          title={this.state.title}
          visible={this.state.isVisible}
          footer={null}
          Loading={this.props.status.isLoading}
          onCancel={() => {
            this.tagForm.props.form.resetFields()
            this.setState({
              isVisible: false,
              tagInfo: {}
            })
          }}
        >
          <Tag
            type={this.state.type}
            tagInfo={this.state.tagInfo}
            handleSubmit={this.handleSubmit}
            wrappedComponentRef={inst => (this.tagForm = inst)}
          />
        </Modal>
      </div>
    )
  }
}
export default connect(
  ({ tag, status }) => ({ tag, status }),
  {
    init: () => getTagList(),
    postTag: data => postTag(data),
    editTag: data => editTag(data),
    deleteTag: id => deleteTag(id)
  }
)(tagList)
