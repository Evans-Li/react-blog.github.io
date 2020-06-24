import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { Route } from 'react-router-dom'
import { TeamOutlined, FileOutlined, AppstoreOutlined } from '@ant-design/icons'
import AddArticle from '../pages/AddArticle/index.js'
import ArticleList from '../pages/ArticleList/index.js'
import Comment from '../pages/Comment'
import Echart from '../pages/EchartsTest'
import ToolBarArt from '../components/ToolBarArt/index.js'
import { urlList, menuList } from '../config/utils'
import './index.scss'
import '../comm.scss'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdminIndex(props) {
  const [collapsed, setCollapsed] = useState(false)
  const onCollapse = (collapsed) => {
    setCollapsed(collapsed)
  }
    //  点击菜单跳转页面
  const handleClickArticle = (e) => {
    console.log(e)
    props.history.push(e.key)
  }
  //  渲染MenuList
  const renderMenuList = (dataList) => {
    return (
      dataList.map((i, index) => {
        if (i.childrens) {
          return (
            <SubMenu
              key={i.key}
              onClick={handleClickArticle}
              title={
                <span>
                  <span>{i.icon}{i.title}</span>
                </span>
              }
            >
              {renderMenuList(i.childrens)}
            </SubMenu>
          )
        } else {
          return (
            <Menu.Item onClick={handleClickArticle} key={i.key}>{i.icon}{i.title}</Menu.Item>
          )
        }
      })
    )
  }
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo"><h4 className="logo-title">Blog System</h4></div>
        <Menu theme='dark' mode="inline">
          {renderMenuList(menuList)}
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: "0", }}>
          <ToolBarArt props={props} />
        </Header>
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>{}</Breadcrumb.Item>
            <Breadcrumb.Item></Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <div>
              <Route path="/index" exact component={AddArticle} />
              <Route path={urlList.addArticle} exact component={AddArticle} />
              <Route path={`${urlList.addArticle}:id`} component={AddArticle} />
              <Route path={urlList.articleList} component={ArticleList} />
              <Route path={urlList.echarts} component={Echart} />
              <Route path={urlList.comment} component={Comment} />
            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>深入技术, 看看世界</Footer>
      </Layout>
    </Layout >
  );
}
export default AdminIndex