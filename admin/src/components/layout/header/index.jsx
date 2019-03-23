import React, { Component } from 'react'
import { Row, Col, Layout, Popconfirm, message } from 'antd'
import './index.less'

const Header = Layout.Header

export default class TopBar extends Component {
  state = {}
  handleLoginOut = e => {
    e.preventDefault()
    window.sessionStorage.removeItem('userInfo')
    message.success('退出成功!')
    window.location.href = '/login'
  }
  componentDidMount() {
    const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo')) || {}
    if (userInfo.user) {
      const {
        user: { id = 'xxx', name = 'c9cu' }
      } = userInfo
      this.setState({ id, name })
    }
  }
  render() {
    return (
      <Header style={{ background: '#fff', textAlign: 'center', padding: 0 }}>
        <Row>
          <Col span={20}>{this.props.title}</Col>
          <Col span={4}>
            <span className="user-name">{this.state.name}</span>
            &nbsp;
            <span className="user-exit" />
            <Popconfirm
              okText="Yes"
              placement="bottomLeft"
              title="确定要退出吗?"
              onConfirm={this.handleLoginOut}
            >
              <a>退出</a>
            </Popconfirm>
          </Col>
        </Row>
      </Header>
    )
  }
}
