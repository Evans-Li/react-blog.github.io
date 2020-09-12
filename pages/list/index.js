import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { Row, Col, List, Card, Breadcrumb, Spin } from 'antd'
import '../../static/style/pages/comm.css'
import Header from '../../components/Header'
import Author from '../../components/Author/index.js'
import Advert from '../../components/Advert/index.js'
import Footer from '../../components/Footer'
import HomeTab from '../../components/HomeTab'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import { serviceUrl } from '../../config/apiUrl'
import './index.css'
import { FileOutlined } from '@ant-design/icons'
import marked from 'marked'
import hljs from "highlight.js";
import BackTopBtn from '../../components/BackTopBtn'
import ListIcon from '../../components/ListIcon'
import Transition from '../../components/Transtion'

const renderer = new marked.Renderer();
marked.setOptions({
  renderer: renderer,
  gfm: true,
  pedantic: false,
  sanitize: false,
  tables: true,
  breaks: false,
  smartLists: true,
  smartypants: false,
  sanitize: false,
  xhtml: false,
  highlight: function (code) {
    return hljs.highlightAuto(code).value;
  }

});

const ArticleList = (list) => {

  const [mylist, setMylist] = useState([]);
  const [isShow, setIsShow] = useState(true)
  const [breadName, setBreadName] = useState('ddd')
  const [isLoading, setIsLoading] = useState(false)
  const changeLoading = () => {
    setIsLoading(true)
  }
  const renderItem = () => {
    return (
      <div>
        <List
          itemLayout="vertical"
          dataSource={mylist}
          renderItem={item => (
            <div className='list-box'>
              <Spin spinning={isLoading}>
                <Card
                  bordered={false}
                  hoverable
                  className='list-item'
                >
                  <List.Item>
                    <div className="list-title">
                      <Link href={{ pathname: '/Details', query: { id: item.id } }}>
                        <a onClick={changeLoading}>{item.title}</a>
                      </Link>
                    </div>
                    <ListIcon item={item} className='list-icon' />
                    <div className="list-context"
                      dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}
                    ></div>
                    <div className='list-go'>
                      <FileOutlined />
                      <span><Link href={{ pathname: '/Details', query: { id: item.id } }}>
                        <a onClick={changeLoading}>	&nbsp; 查看全文 &gt;</a>
                      </Link> </span>
                    </div>
                  </List.Item>
                </Card>
              </Spin>
            </div>
          )}
        />
      </div>
    )
  }
  useEffect(() => {
    setMylist(list.data)
    setBreadName(list.data[0].typeName);
  })
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Evans-blog-{list.data[0].typeName}</title>
        <body style='background: url(../../../../static/floor-tile.png)'></body>
      </Helmet>
      <Header>
        <title>Home</title>
      </Header>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={12}   >
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item>{breadName}</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <Transition
              in={true}
              timeout={1000}
              classNames={"fly"}
              appear={true}
              unmountOnExit={true}
              item={renderItem}
            />
          </div>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <HomeTab />
          <Advert />
        </Col>
      </Row>
      <Footer />
      <BackTopBtn />
    </div>
  )

}
ArticleList.getInitialProps = async (context) => {
  // console.log(context.query)
  let id = context.query.id;
  let promise = new Promise((resolve, reject) => {
    axios(serviceUrl.getListById + id).then((res) => {
      // console.log(res.data.data)
      resolve(res.data)
    })
  })
  return await promise
}


export default ArticleList

