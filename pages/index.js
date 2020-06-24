import React, { useState, useEffect } from 'react'

import Header from '../components/Header'
import { Row, Col, List, Spin, Card, Tag, BackTop, Affix } from 'antd'
import '../static/style/pages/index.css'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import HomeTab from '../components/HomeTab'
import axios from 'axios'
import Link from 'next/link'
import { serviceUrl } from '../config/apiUrl'
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import { Helmet } from 'react-helmet'
import { FileOutlined, CarryOutOutlined, FireTwoTone } from '@ant-design/icons'
import Butterfly from '../components/Pendant/Butterfly'
import BackTopBtn from '../components/BackTopBtn'
import ListIcon from '../components/ListIcon'
import Transition from '../components/Transtion'


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

const Home = (list) => {
  const [mylist, setMylist] = useState(list.data)
  const [topList, setTopList] = useState([])
  console.log(topList)
  const [isLoading, setIsLoading] = useState(false)
  const changeLoading = () => {
    setIsLoading(true)
  }

  useEffect(() => {
    // 置顶文章数据
    let artArr = [], topArr = [];
    list.data.map((item, key) => {
      if (item.is_top) {
        topArr.push(item)
      } else {
        artArr.push(item)
      }
    })
    setMylist(artArr)
    setTopList(topArr)
  }, [])


  const renderTopList = () => {
    return (
      <div>
        {
          topList.length ?
            <div>
              <List
                // header={<div></div>}
                itemLayout="vertical"
                dataSource={topList}
                
                renderItem={(item, index) => (
                  <div >
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
                          <ListIcon item={item} className='list-icon' isTop />
                          <div className="list-context"
                            dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}>
                          </div>
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
            :
            null
        }

      </div>
    )
  }

  const renderItem = () => {
    return (
      <div>
         {renderTopList()}
        <List
          header={<div style={{padding: '20px 0 0 20px'}}>最新日志</div>}
          itemLayout="vertical"
          dataSource={mylist}
          renderItem={(item, index) => (
            <div >
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
                    <ListIcon item={item} className='list-icon' />
                    <div className="list-context"
                      dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}>
                    </div>
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
  return (
    <div className='wrap'>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Evans-blog</title>
        <body style='background: url(../../../static/floor-tile.png)'></body>
      </Helmet>
      <Affix offsetTop={0}>
        <Header>
          <title>Home</title>
        </Header>
      </Affix>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={12}   >
          <Transition
            timeout={3000}
            classNames={'fly'}
            appear={true}
            unmountOnExit={true}
            item={renderItem}
          />
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Affix offsetTop={50}>
            <HomeTab />
            <Advert />
          </Affix>
        </Col>
      </Row>
      <Footer />
      {/* <Butterfly /> */}
      <BackTopBtn />
    </div>

  )
}
Home.getInitialProps = async () => {
  const promise = new Promise((resolve, reject) => {
    axios(serviceUrl.getArticleList).then(
      (res) => {
        resolve(res.data)
      }
    )
  })
  return await promise
}

export default Home
