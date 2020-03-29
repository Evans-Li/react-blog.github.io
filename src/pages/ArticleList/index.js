import React, { useState, useEffect } from 'react';
import { List, Row, Col, Modal, message, Button, Switch } from 'antd';
import { servicePath } from '../../config/apiUrl'
import { requestPost, requestGet } from '../../config/request'
import './index.scss'
const { confirm } = Modal


function ArticleList(props) {


  const [list, setList] = useState([])
  const getArticleList = () => {
    requestGet(servicePath.getArticleList)
    .then(res => {
      setList(res.data.list)
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
      <List
        header={
          <Row className="list-div">
            <Col span={8}>
              <b>标题</b>
            </Col>
            <Col span={3}>
              <b>类别</b>
            </Col>
            <Col span={3}>
              <b>发布时间</b>
            </Col>
            <Col span={3}>
              <b>集数</b>
            </Col>
            <Col span={3}>
              <b>浏览量</b>
            </Col>

            <Col span={4}>
              <b>操作</b>
            </Col>
          </Row>

        }
        bordered
        dataSource={list}
        renderItem={item => (
          <List.Item>
            <Row className="list-div">
              <Col span={8}>
                {item.title}
              </Col>
              <Col span={3}>
                {item.typeName}
              </Col>
              <Col span={3}>
                {item.addTime}
              </Col>
              <Col span={3}>
                共<span>{item.part_count}</span>集
                          </Col>
              <Col span={3}>
                {item.view_count}
              </Col>

              <Col span={4}>
                <Button type="primary" onClick={()=>toUpdataArticle(item.id)}>修改</Button>&nbsp;
                <Button onClick={() => delArticle(item.id)} >删除 </Button>
              </Col>
            </Row>

          </List.Item>
        )}
      />

    </div>
  )

}

export default ArticleList