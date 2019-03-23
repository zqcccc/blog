import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd'
import { NavLink } from 'react-router-dom'
import Header from './header'
import './index.less'

const { Content, Footer, Sider } = Layout
const SubMenu = Menu.SubMenu

const menuConfig = [
  {
    title: '首页',
    key: '/home',
    icon: 'compass'
  },
  // {
  //   title: '写文章',
  //   key: '/newArticle',
  //   icon: 'compass'
  // },
  {
    title: '文章管理',
    key: '/articles',
    icon: 'file'
  },
  {
    title: '标签管理',
    key: '/tags',
    icon: 'tags'
    // children: [
    //   {
    //     title: '添加标签',
    //     key: '/addTag'
    //   }
    // ]
  },
  {
    title: '评论管理',
    key: '/comments',
    icon: 'team'
  },
  {
    title: '测试一下',
    key: '/test',
    icon: 'team'
  }
]
export default class layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: 'c9cu',
      collapsed: false,
      theme: 'light'
    }
  }
  componentWillMount() {
    const menuTreeNode = this.renderMenu(menuConfig)

    this.setState({
      menuTreeNode
    })
  }
  // 菜单渲染
  renderMenu = data => {
    return data.map(item => {
      if (item.children) {
        return (
          <SubMenu
            title={
              <NavLink to={item.key}>
                <Icon type={item.icon} />
                <span className="menu-title">{item.title}</span>
              </NavLink>
            }
            key={item.key}
          >
            {this.renderMenu(item.children)}
          </SubMenu>
        )
      }
      return (
        <Menu.Item title={item.title} key={item.key}>
          <NavLink to={item.key}>
            <Icon type={item.icon} />
            <span className="menu-title">{item.title}</span>
          </NavLink>
        </Menu.Item>
      )
    })
  }
  changeTheme = value => {
    this.setState({
      theme: value ? 'dark' : 'light'
    })
  }
  onCollapse = collapsed => {
    console.log(collapsed)
    this.setState({ collapsed })
  }
  // 菜单点击
  handleClick = ({ item, key }) => {
    console.log('item, key: ', item, key)
    if (key == this.state.currentKey) {
      return false
    }
    // 事件派发，自动调用reducer，通过reducer保存到store对象中
    // const { dispatch } = this.props;
    // dispatch(switchMenu(item.props.title));

    this.setState({
      currentKey: key
    })
    // hashHistory.push(key);
  }
  render() {
    const pathName = window.location.pathname
    const {
      location: { pathname }
    } = this.props
    const temp = menuConfig.filter(i => i.key === pathName)[0] || {}
    const title = temp.title || '后台'
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          breakpoint="lg"
          collapsedWidth="0"
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" mode="inline" onClick={this.handleClick}>
            {this.state.menuTreeNode}
          </Menu>
        </Sider>
        <Layout>
          <Header title={title} />
          <Content style={{ margin: '16px 16px' }}>
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb> */}
            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
              {this.props.children}
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    )
  }
}
