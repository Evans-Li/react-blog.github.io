import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Route } from 'react-router-dom'
import { TeamOutlined, FileOutlined, AppstoreOutlined } from '@ant-design/icons'
import AddArticle from '../pages/AddArticle/index.js'
import ArticleList from '../pages/ArticleList/index.js'
import Echart from '../pages/EchartsTest'
import ToolBarArt from '../components/ToolBarArt/index.js'
import { ArticleManagement } from '../config/menuItem'
import './index.scss'
import '../comm.scss'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminIndex(props) {
  const [collapsed, setCollapsed] = useState(false)
  const onCollapse = (collapsed) => {
    setCollapsed(collapsed)
  }

  const handleClickArticle = (e) => {
    switch (e.key) {
      case ArticleManagement.addArticle:
        props.history.push('/index/add/')
        break
      case ArticleManagement.articleList:
        props.history.push('/index/list/')
        break
      default:
        return
    }
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo"><h4 className="logo-title">Blog System</h4></div>
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <SubMenu
            key="1"
            onClick={handleClickArticle}
            title={
              <span>
                <AppstoreOutlined />
                <span>文章管理</span>
              </span>
            }
          >
            <Menu.Item key={ArticleManagement.addArticle}>添加文章</Menu.Item>
            <Menu.Item key={ArticleManagement.articleList}>文章列表</Menu.Item>
          </SubMenu>
          <SubMenu

          {/* <Menu.Item
            onClick={()=>(props.history.push('/index/echarts/'))}
            key={ArticleManagement.echarts}>
            <FileOutlined />
            <span>Echarts测试</span>
          </Menu.Item> */}
          {/* <Menu.Item key="5">
            <TeamOutlined />
            <span>文章管理</span>
          </Menu.Item> */}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: "0",  }}>
          <ToolBarArt props={props}/>
          </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>{}</Breadcrumb.Item>
            <Breadcrumb.Item></Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <div>
              <Route path="/index" exact component={AddArticle} />
              <Route path="/index/add/" exact component={AddArticle} />
              <Route path="/index/add/:id" component={AddArticle} />
              <Route path="/index/list/" component={ArticleList} />
              <Route path="/index/echarts/" component={Echart} />


            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>lixing</Footer>
      </Layout>
    </Layout >
  );
}
export default AdminIndex