import React, { useState } from 'react'
import Header from '../components/Header'
import { Row, Col, List, Icon } from 'antd'
import '../static/style/pages/index.css'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import axios from 'axios'
import Link from 'next/link'
import { serviceUrl } from '../config/apiUrl'
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';

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
  sanitize:false,
  xhtml: false,
  highlight: function (code) {
          return hljs.highlightAuto(code).value;
  }

}); 


const Home = (list) => {
  const [mylist, setMylist] = useState(list.data)
  // console.log(list);
  return (
    <div>
      <Header>
        <title>Home</title>
      </Header>
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div>
            <List
              header={<div>最新日志</div>}
              itemLayout="vertical"
              dataSource={mylist}
              renderItem={item => (
                <List.Item>
                  <div className="list-title">
                    <Link href={{ pathname: '/Details', query: { id: item.id } }}>
                      <a>{item.title}</a>
                    </Link>
                  </div>
                  <div className="list-icon">
                    <span><Icon type="calendar" />{item.addTime} </span>
                    <span><Icon type="folder" /> {item.typeName}</span>
                    <span><Icon type="fire" /> {item.view_count}</span>
                  </div>
                  <div className="list-context"
                    dangerouslySetInnerHTML={{__html:marked(item.introduce)}}
                  ></div>
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
Home.getInitialProps = async () => {
  const promise = new Promise((resolve, reject) => {
    axios(serviceUrl.getArticleList).then(
      (res) => {
        // console.log('------',res.data);
        resolve(res.data)
      }
    )
  })
  return await promise
}

export default Home
