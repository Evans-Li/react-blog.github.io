import React, { useState, useEffect } from 'react'
import './index.css'
import Router from 'next/router'
import { Row, Col, Menu, Spin } from 'antd'
import axios from 'axios'
import { serviceUrl } from '../../config/apiUrl'
import {
  HomeOutlined,
  YoutubeOutlined,
  ReadOutlined,
  SmileOutlined
} from '@ant-design/icons'
import { tuple } from 'antd/lib/_util/type'



const Header = () => {
  const [typeInfo, setTypeInfo] = useState([])
  useEffect(() => {
    const fetchType = async () => {
      const result = await axios(serviceUrl.getTypeInfo).then((res) => {
        setTypeInfo(res.data.data)
        return res.data.data
      })
      setTypeInfo(result)
    }
    fetchType()
  }, [])

  const handleClick = (e)=>{
    if(e.key == '0'){
      Router.push('/index')
    }else{
      Router.push('/ArticleList?id=' + e.key)
    }
  }

  return (
  <div>
    
      <div className="header">
        <Row type="flex" justify="center" >
          <Col xs={24} sm={24} md={10} lg={15} xl={12}>
            <span className="header-logo"><a href='/'>Evans</a></span>
            <span className="header-txt">--入门程序员</span>
          </Col>

          <Col className="memu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
            <Menu mode="horizontal"
              onClick={handleClick}
            >
              <Menu.Item key="0">
                <HomeOutlined />首页
              </Menu.Item>
              <Menu.Item key={1}>
                <YoutubeOutlined/> 实用技术
              </Menu.Item>
              <Menu.Item key={2}>
                <ReadOutlined/> 个人笔记
              </Menu.Item>
              <Menu.Item key={3}>
                <SmileOutlined/> 快乐生活
              </Menu.Item>
            </Menu>
          </Col>
        </Row>
      </div>
    </div>
  )

}

export default Header