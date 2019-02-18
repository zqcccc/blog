import React, { Component } from 'react'
import './index.less'
import { Input, Form, message, Button } from 'antd'

const TextArea = Input.TextArea
const FormItem = Form.Item
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
class tag extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  handleSubmit = () => {
    this.props.form.validateFields((err, value) => {
      if (!err) {
        // message.success('后台服务接入中...')
        this.props.handleSubmit()
      } else {
        message.warning('请检查你的填写内容哦')
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { tagInfo, type } = this.props
    return (
      <Form>
        <FormItem label="标签名" {...formItemLayout}>
          {getFieldDecorator('name', {
            initialValue: tagInfo.name || '',
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
        <FormItem label="标签描述" {...formItemLayout}>
          {getFieldDecorator('descript', {
            initialValue: tagInfo.descript || '',
            rules: [
              {
                required: true,
                message: '标签描述不能为空'
              }
            ]
          })(<TextArea defaultValue='请输入标签描述' onPressEnter={this.handleSubmit}/>)}
        </FormItem>
        <FormItem {...offsetLayout}>
          <Button type="primary" onClick={this.handleSubmit}>
            确认{type === 'add' ? '创建' : '修改'}
          </Button>
        </FormItem>
      </Form>
    )
  }
}

export default Form.create()(tag)
