import React, { useState, useEffect } from 'react';
import { List, Row, Col, Modal, message, Button } from 'antd'
import ArticleListAll from '../../components/ArticleListAll'
import TopArticleList from '../../components/TopArticleList'
import './index.scss'
import { requestPost, requestGet } from '../../config/request'
import { Tabs } from 'antd';
import { servicePath } from '../../config/apiUrl'
const { TabPane } = Tabs;
const { confirm } = Modal


const colList = [
  {
    span: 4,
    test: '标题'
  },
  {
    span: 4,
    test: '类别'
  },{
    span: 4,
    test: '发布时间'
  },{
    span: 4,
    test: '集数'
  },{
    span: 4,
    test: '浏览量'
  },{
    span: 4,
    test: '操作'
  },
]


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

  const toUpdataArticle = (id)=>{ // 跳转修改文章页面
    props.history.push('/index/add/'+id)
  }

  useEffect(() => {
    getArticleList()
  }, [])
  return (
    <div>
      <Tabs type='card' animated>
        <TabPane tab='所有文章' key={1}>
          <ArticleListAll props={props} colList={colList} list={list} getArticleList={getArticleList} delArticle={delArticle} toUpdataArticle={toUpdataArticle}/>
        </TabPane>
        <TabPane tab='置顶文章' key={2}>
          <TopArticleList props={props} colList={colList} topList={topList} getArticleList={getArticleList} toUpdataArticle={toUpdataArticle} delArticle={delArticle} />
        </TabPane>
      </Tabs>


    </div>
  )

}

export default ArticleList