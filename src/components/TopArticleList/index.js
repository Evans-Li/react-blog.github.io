import React from 'react';
import { List, Row, Col, Modal, message, Button } from 'antd'


const TopArticleList = ({topList,toUpdataArticle,delArticle, colList}) => {
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

export default TopArticleList