import React from 'react';

import { List, Row, Col, Modal, message, Button } from 'antd'
import {  requestGet } from '../../config/request'
import { servicePath } from '../../config/apiUrl'


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
const { confirm } = Modal

const TopArticleList = ({topList, getArticleList,props}) => {
  const list = topList[0]
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
  return (
    <div>
      <List
        header={
          <Row className="list-div">
            {
              colList.map((item, key) => (
                <Col key={key} span={item.span}>{item.test}</Col>
              ))
            }
          </Row>

        }
        bordered
        dataSource={list}
        renderItem={item => (
          <List.Item>
            <Row className="list-div" style={{width: '100%'}}>
              <Col span={4}>
                {item.title}
              </Col>
              <Col span={4}>
                {item.typeName}
              </Col>
              <Col span={4}>
                {item.addTime}
              </Col>
              <Col span={4}>
                共<span>{item.part_count}</span>集
              </Col>
              <Col span={4}>
                {item.view_count}
              </Col>

              <Col span={4}>
                <Button type="primary" onClick={() => toUpdataArticle(item.id)}>修改</Button>&nbsp;
                <Button onClick={() => delArticle(item.id)} >删除 </Button>
              </Col>
            </Row>

          </List.Item>
        )}
      />

    </div>
  )
}

export default TopArticleList