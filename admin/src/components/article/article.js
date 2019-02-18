import React from 'react'
import { connect } from 'react-redux'
import { getTagList, postTag, editTag, deleteTag } from '../../redux/action'
import { Input, Form, message, Button,Select  } from 'antd'

const TextArea = Input.TextArea
const FormItem = Form.Item
const Option = Select.Option
const formItemLayout = {
  labelCol: {
    xs: 24,
    sm: {
      span: 4,
      offset: 2
    }
  },
  wrapperCol: {
    xs: 24,
    sm: 16
  }
}
const offsetLayout = {
  wrapperCol: {
    xs: 24,
    sm: {
      span: 12,
      offset: 6
    }
  }
}
class NewArticle extends React.Component {
  state = {}
  componentDidMount() {
    const { tag } = this.props
    const tagList = tag.map(i=><Option key={i._id}>{i.name}</Option>)
    this.setState({
      tagList
    })
  }
  handleSubmit = () => {
    this.props.form.validateFields((err, value) => {
      if (!err) {
        message.success('后台服务接入中...')
        // this.props.handleSubmit()
      } else {
        message.warning('请检查你的填写内容哦')
      }
    })
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const { articleInfo, type, } = this.props
    return (
      <Form>
        <FormItem label="文章标题" {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: articleInfo.title || '',
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
          })(<Input placeholder="请输入标签名" />)}
        </FormItem>
        <FormItem label="文章描述" {...formItemLayout}>
          {getFieldDecorator('descript', {
            initialValue: articleInfo.descript || '',
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
            initialValue: articleInfo.content || '',
            rules: [
              {
                required: true,
                message: '文章内容不能为空'
              }
            ]
          })(<TextArea  defaultValue='请输入文章内容' />)}
        </FormItem>
        <FormItem label="文章标签" {...formItemLayout}>
          {getFieldDecorator('content', {
            initialValue: articleInfo.tag || [],
            rules: [
              {
                required: true,
                message: '文章内容不能为空'
              }
            ]
          })(<Select  mode="multiple"
          placeholder="Please select"
          defaultValue={[]} >{this.state.tagList}</Select>)}
        </FormItem>
        <FormItem label="文章标签" {...formItemLayout}>
        <Button type="primary" onClick={this.handleSubmit}>
            确认{type === 'add' ? '创建' : '修改'}
          </Button>
        </FormItem>
      </Form>
    )
  }
}
export default connect(
  ({ tag, status }) => ({ tag, status }),
  {
    init: () => getTagList(),
  }
)(Form.create()(NewArticle))