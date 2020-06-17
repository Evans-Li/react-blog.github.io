import React, { useState, useEffect } from 'react'
import Link from 'next/link'
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
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import './index.css'
import {
  CarryOutOutlined,
  FileOutlined,
  EyeOutlined
} from '@ant-design/icons'
import marked from 'marked'
import hljs from "highlight.js";
import Butterfly from '../../components/Pendant/Butterfly'
import BackTopBtn from '../../components/BackTopBtn'



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
  const [ isLoading, setIsLoading ] = useState(false)

  const changeLoading = () =>{
    setIsLoading(true)
  }
  useEffect(() => {
    setMylist(list.data)
    setBreadName(list.data[0].typeName)
  })
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Evans-blog</title>
        <body style='background: url(../../../../static/floor-tile.png)'></body>
      </Helmet>
      <Header>
        <title>Home</title>
      </Header>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item>{breadName}</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <List
              itemLayout="vertical"
              dataSource={mylist}
              renderItem={item => (
                <div>
                  <Spin spinning={isLoading}>
                  <Card
                    hoverable
                    className='list-item'
                  >
                  <List.Item>
                    <div className="list-title">
                      <Link href={{ pathname: '/Details', query: { id: item.id } }}>
                        <a onClick={changeLoading}>{item.title}</a>
                      </Link>
                    </div>
                    <div className="list-icon">
                    
                    </div>
                    <div className="list-context"
                      dangerouslySetInnerHTML={{__html: marked(item.introduce)}}
                    ></div>
                    <div className='list-go'>
                        <FileOutlined />
                        <span><Link href={{pathname: '/Details', query: { id: item.id}}}>
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
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <HomeTab />
          <Advert />
        </Col>
      </Row>
      <Footer />
      <Butterfly />
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

