import React from 'react'
import { Form, Icon, Input, Button, Checkbox, Col, message } from 'antd'
import './index.less'
import axios from '../../axios'

const LoginLayout = {
  xs: {
    span: 20,
    offset: 2
  },
  sm: {
    span: 10,
    offset: 7
  },
  md: {
    span: 8,
    offset: 8
  }
}
class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const res = await axios.api_post_login(values)
        console.log('res.data: ', res.data);
        window.sessionStorage.setItem("userInfo", JSON.stringify(res.data))
        window.location.href = '/'
      }
    })
  }
  handleUnOpen = e => {
    e.preventDefault()
    message.warning('功能暂不开放')
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div className="login-wrapper">
        <Col {...LoginLayout}>
          <h1 className="login-title">博客管理后台</h1>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Form.Item>
              {getFieldDecorator('name', {
                rules: [
                  { required: true, message: 'Please input your username!' }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="Username"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('password', {
                rules: [
                  { required: true, message: 'Please input your Password!' }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true
              })(<Checkbox>Remember me</Checkbox>)}
              <a className="login-form-forgot" href="" onClick={this.handleUnOpen}>
                Forgot password
              </a>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
              Or{' '}
              <a href="" onClick={this.handleUnOpen}>
                register now!
              </a>
            </Form.Item>
          </Form>
        </Col>
      </div>
    )
  }
}

export default Form.create({ name: 'normal_login' })(NormalLoginForm)
