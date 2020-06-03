import React, { useState } from 'react'
import Header from '../components/Header'
import { Row, Col, List, Spin, Card, Tag } from 'antd'
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
import { Helmet } from 'react-helmet'
import { EyeOutlined, FileOutlined, CarryOutOutlined} from '@ant-design/icons'

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
  return (
    <div className='wrap'>

      <Helmet>
        <meta charSet="utf-8" />
        <title>Evans-blog</title>
        <body style='background: url(../../../static/double-bubble-dark.png)'></body>
      </Helmet>
      <Header>
        <title>Home</title>
      </Header>
      <Row className="comm-main" type="flex" justify="center">

        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          {/* <Spin spinning={true} size={"large"}> */}
          <div>

            <List
              header={<div>最新日志</div>}
              itemLayout="vertical"
              dataSource={mylist}
              renderItem={item => (
                <div >
                  <Card
                    hoverable
                    className='list-item'
                  >

                    <List.Item>
                      <div className="list-title">
                        <Link href={{ pathname: '/Details', query: { id: item.id } }}>
                          <a>{item.title}</a>
                        </Link>
                      </div>
                      <div className="list-icon">
                        <Tag icon={<CarryOutOutlined />  }color='cyan'>{item.addTime}</Tag>
                        <Tag icon={<FileOutlined />  }color='gold'>{item.typeName}</Tag>
                        <Tag icon={<EyeOutlined />  }color='purple'>{item.view_count}</Tag>
                        {/* <span><FileOutlined /> {item.typeName}</span>
                        <span><EyeOutlined /> {item.view_count}</span> */}
                      </div>
                      <div className="list-context"
                        dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}
                      ></div>
                    </List.Item>
                  </Card>
                </div>
              )}
            />

          </div>
          {/* </Spin> */}

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
