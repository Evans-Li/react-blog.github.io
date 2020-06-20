import React, { useState, useEffect } from 'react';
import ArticleListAll from '../../components/ArticleListAll'
import TopArticleList from '../../components/TopArticleList'
import './index.scss'
import { requestPost, requestGet } from '../../config/request'
import { Tabs } from 'antd';
import { servicePath } from '../../config/apiUrl'
const { TabPane } = Tabs;




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

  useEffect(() => {
    getArticleList()
  }, [])
  return (
    <div>
      <Tabs type='card' animated>
        <TabPane tab='所有文章' key={1}>
          <ArticleListAll props={props} list={list} getArticleList={getArticleList} />
        </TabPane>
        <TabPane tab='置顶文章' key={2}>
          <TopArticleList props={props} topList={topList} getArticleList={getArticleList} />
        </TabPane>
      </Tabs>


    </div>
  )

}

export default ArticleList