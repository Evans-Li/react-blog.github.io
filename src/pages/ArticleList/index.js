import React, { useState, useEffect } from 'react';
import { List, Row, Col, Modal, message, Button } from 'antd'
import ArticleListAll from '../../components/ArticleListAll'
import TopArticleList from '../../components/TopArticleList'
import './index.scss'
import '../../comm.scss'
import { requestPost, requestGet } from '../../config/request'
import { Tabs } from 'antd';
import { servicePath } from '../../config/apiUrl'
import Transition from '../../components/Transition'
import { urlList } from '../../config/utils'
const { TabPane } = Tabs;
const { confirm } = Modal


function ArticleList(props) {
  const [list, setList] = useState([])
  const [topList, setTopList] = useState([])

  const getArticleList = () => {
    requestGet(servicePath.getArticleList)
      .then(res => {
        let result = res.data.list
        let topList = [];
        topList.push(result.filter((item) => item.is_top))
        setTopList(topList)
        setList(result)
      })
  }
  const delArticle = (id) => {  //删除文章
    confirm({
      title: '确定删除文章吗?',
      content: '删除后无法恢复!!!',
      cancelText: '点错了!不删除!',
      onOk() {
        requestGet(servicePath.delArticle + id)
          .then(res => {
            console.log(res);
            message.success('文章删除成功!')
            getArticleList()
          })
      },
      onCancel() {
        message.success('取消操作')
      }
    })
  }

  const toUpdataArticle = (id) => { // 跳转修改文章页面
    props.history.push(urlList.addArticle + id)
  }

  // 渲染页面
  const renderPage = () => (
    <Tabs animated defaultActiveKey='1'>
      <TabPane tab='所有文章' key={1} forceRender={false}>
        <ArticleListAll
          list={list}
          delArticle={delArticle}
          toUpdataArticle={toUpdataArticle}
        />
      </TabPane>
      <TabPane tab='置顶文章' key={2} forceRender={false}>
        <TopArticleList
          topList={topList}
          toUpdataArticle={toUpdataArticle}
          delArticle={delArticle} />
      </TabPane>
    </Tabs>
  )

  useEffect(() => {
    getArticleList()
  }, [])
  return (
    <div>
      <Transition
        in={true}
        timeout={1500}
        classNames={"fly"}
        appear={true}
        unmountOnExit={true}
        item={renderPage}
      />
    </div>
  )

}

export default ArticleList