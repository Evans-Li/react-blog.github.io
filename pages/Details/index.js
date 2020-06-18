import React, { useState } from 'react'
import Head from 'next/head'
import { Row, Col, Affix, Breadcrumb, Card } from 'antd'
import Header from '../../components/Header'
import Author from '../../components/Author'
import Advert from '../../components/Advert'
// import ReactMarkdown from 'react-markdown'
import MarkNav from 'markdown-navbar';
import 'markdown-navbar/dist/navbar.css';
import axios from 'axios';
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import './index.css'
import Tocify from '../../components/tocify.tsx'
import Footer from '../../components/Footer'
import { serviceUrl } from '../../config/apiUrl'
import { Helmet } from 'react-helmet'
import Butterfly from '../../components/Pendant/Butterfly'
import BackTopBtn from '../../components/BackTopBtn'
import ListIcon from '../../components/ListIcon'
import CommentForm from '../../components/CommentForm'
import CommentList from '../../components/CommentList/index'

const Detailed = (props) => {
  const tocify = new Tocify()
  const renderer = new marked.Renderer();
  const [commentKey, setCommentKey] = useState(Math.random());

  renderer.heading = function (text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };

  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  });



  //  提交评论
  const upComment = async (values) => {
    let formData = values.comm
    let dataProps = {
      art_id: props.id,
      add_time: parseInt(new Date() / 1000),
    };
    Object.assign(dataProps, formData)

    console.log(dataProps)
    const res = await axios({
      method: "post",
      url: serviceUrl.addComment,
      header: { "Access-Control-Allow-Origin": "*" },
      data: dataProps,
      withCredentials: true
    })
    const isSuccess = res.status == 200;
    if (isSuccess) {
      setCommentKey(Math.random());
    } else {
    }
    return isSuccess;
  };

  let html = marked(props.article_content)
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Evans-blog</title>
        <body style='background: url(../../../../static/floor-tile.png)'></body>
      </Helmet>
      <Head>
        <title>博客详细页</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item>{props.typeName}</Breadcrumb.Item>
                <Breadcrumb.Item> {props.title}</Breadcrumb.Item>
              </Breadcrumb>
            </div>

            <div>
              <div className="detailed-title">
                {props.title}
              </div>
              <ListIcon item={props} className='center' />
              <div className="detailed-content"
                dangerouslySetInnerHTML={{ __html: html }}   >
              </div>
            </div>
            <div>
              <CommentList artId={props.id} listKey={commentKey} upComment={upComment} ></CommentList>
              <CommentForm onOk={upComment} />
            </div>
          </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              <div className="toc-list">
                {tocify && tocify.render()}
              </div>

            </div>
          </Affix>

        </Col>
      </Row>
      <Footer />
      <Butterfly />
      <BackTopBtn />

    </>
  )

}

Detailed.getInitialProps = async (context) => {

  // console.log(context.query.id)
  let id = context.query.id
  const promise = new Promise((resolve) => {

    axios(serviceUrl.getArticleById + id).then(
      (res) => {
        // console.log(title)
        resolve(res.data.data[0])
      }
    )
  })

  return await promise
}

export default Detailed