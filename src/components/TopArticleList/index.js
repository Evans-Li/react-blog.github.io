import React from 'react';
import { List, Row, Col, Button } from 'antd'

const colList = [
  {
    span: 4,
    test: '标题',
  },
  {
    span: 4,
    test: '类别'
  }, {
    span: 4,
    test: '发布时间'
  }, {
    span: 4,
    test: '集数'
  }, {
    span: 4,
    test: '浏览量'
  }, {
    span: 4,
    test: '操作'
  },
]

const TopArticleList = ({topList,toUpdataArticle,delArticle}) => {
  const list = topList[0]
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

export default React.memo(TopArticleList) 