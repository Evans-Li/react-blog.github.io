import React, { useState, useEffect } from 'react'
import Link from'next/link'
import { Row, Col, List, Icon, Breadcrumb } from 'antd'
import '../../static/style/pages/comm.css'
import Header from '../../components/Header'
import Author from '../../components/Author/index.js'
import Advert from '../../components/Advert/index.js'
import Footer from '../../components/Footer'
import axios from 'axios'
import { serviceUrl } from '../../config/apiUrl'



const ArticleList = (list) => {

  const [mylist, setMylist] = useState([]);
  useEffect(()=>{
    setMylist(list.data)
  })
  return (
    <div>
      <Header>
        <title>Home</title>
      </Header>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item>视频列表</Breadcrumb.Item>
              </Breadcrumb>
            </div>

            <List
              itemLayout="vertical"
              dataSource={mylist}
              renderItem={item => (
                <List.Item>
                  <div className="list-title">
                    <Link href={{pathname: '/Details',query:{id: item.id}}}>
                    {item.title}
                    </Link>
                    </div>
                  <div className="list-icon">
                    <span><Icon type="calendar" /> {item.addTime}</span>
                    <span><Icon type="folder" /> {item.typeName}</span>
                    <span><Icon type="fire" /> {item.view_count}</span>
                  </div>
                  <div className="list-context">{item.introduce}</div>
                </List.Item>
              )}
            />

          </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
        </Col>
      </Row>
      <Footer />
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

