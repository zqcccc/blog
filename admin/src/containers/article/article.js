import React from 'react'
import { connect } from 'react-redux'
import { getTagList, postArticle, editTag, deleteTag } from '../../redux/action'
import { Input, Form, message, Button, Select } from 'antd'
import SimpleMDE from 'react-simplemde-editor'
import 'easymde/dist/easymde.min.css'

const TextArea = Input.TextArea
const FormItem = Form.Item
const Option = Select.Option
const formItemLayout = {
  labelCol: {
    xs: 24,
    sm: {
      span: 3,
      offset: 0
    }
  },
  wrapperCol: {
    xs: 24,
    sm: 19
  }
}
const offsetLayout = {
  wrapperCol: {
    xs: 24,
    sm: {
      span: 12,
      offset: 3
    }
  }
}
class Article extends React.Component {
  state = {}
  componentDidMount() {
    // if (!this.props.tag.length) {
    //   this.props.init()
    // }
    // this.tag = this.renderTag()
  }
  // renderTag = () => this.props.tag.map()
  handleSubmit = () => {
    this.props.form.validateFields((err, value) => {
      if (!err) {
        // message.success('后台服务接入中...')
        console.log(value)
        // this.props.postArt(value)
        this.props.handleSubmit()
      } else {
        message.warning('请检查你的填写内容哦')
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const { artInfo = {}, type, tag = [] } = this.props
    const tagOptions = tag.map(item => (
      <Option key={item._id} value={item._id}>
        {item.name}
      </Option>
    ))
    return (
      <Form>
        <FormItem label="文章标题" {...formItemLayout}>
          {getFieldDecorator('title', {
            initialValue: artInfo.title || '',
            rules: [
              {
                required: true,
                message: '标签名不能为空'
              },
              {
                max: 12,
                message: '名称过长'
              }
            ],
            validateTrigger: 'onBlur'
          })(<Input placeholder="请输入标题名" />)}
        </FormItem>
        <FormItem label="文章描述" {...formItemLayout}>
          {getFieldDecorator('descript', {
            initialValue: artInfo.descript || '',
            rules: [
              // {
              //   required: true,
              //   message: '文章描述不能为空'
              // }
            ]
          })(<Input placeholder="请输入文章描述" />)}
        </FormItem>
        <FormItem label="文章内容" {...formItemLayout}>
          {getFieldDecorator('content', {
            initialValue: artInfo.content || '',
            rules: [
              {
                required: true,
                message: '文章内容不能为空'
              }
            ]
          })(
            <SimpleMDE
              id="text-md-editor"
              options={{
                autofocus: true
              }}
            />
          )}
          {/* <TextArea placeholder="请输入文章内容" /> */}
        </FormItem>
        <FormItem label="文章标签" {...formItemLayout}>
          {getFieldDecorator('tag', {
            initialValue: artInfo.tag ? artInfo.tag.map(i => i._id) : [],
            rules: [
              // {
              //   required: true,
              //   message: '文章标签不能为空'
              // }
            ]
          })(
            <Select
              mode="multiple"
              // defaultValue={artInfo.tag || []}
              placeholder="Please select"
            >
              {tagOptions}
            </Select>
          )}
        </FormItem>
        <FormItem {...offsetLayout}>
          <Button type="primary" onClick={this.handleSubmit}>
            确认{type === 'edit' ? '修改' : '创建'}
          </Button>
        </FormItem>
      </Form>
    )
  }
}
export default connect(
  ({ tag, status }) => ({ tag, status }),
  {
    init: () => getTagList()
  }
)(Form.create()(Article))
