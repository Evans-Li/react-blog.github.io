import React, { useState } from 'react'
import Head from 'next/head'
import { Row, Col, Affix, Anchor} from 'antd'
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

const Details = (props) => {

  // const [article, setArticle] = useState(props.data)
  let articleContent = props.article_content
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
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  });

  let html = marked(props.article_content)

  const tocify = new Tocify()
  renderer.heading = function (text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };

  return (
    <>
      <Head>
        <title>Detailed</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div className="detailed-content"
            dangerouslySetInnerHTML={{ __html: html }}
          >

          </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              {/* <div className="toc-list"> */}
                {tocify && tocify.render()}
              {/* </div> */}
            </div>
          </Affix>
        </Col>
      </Row>

    </>
  )
}

Details.getInitialProps = async (context) => {
  let id = context.query.id
  const promise = new Promise((resolve, reject) => {
    axios('http://127.0.0.1:7001/default/getArticleById/' + id).then(
      (res) => {
        resolve(res.data.data[0])
      }
    )
  })
  return await promise
}


export default Details