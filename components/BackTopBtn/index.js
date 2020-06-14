import React from 'react'
import { BackTop } from 'antd'
import './index.css'

import { ArrowUpOutlined } from '@ant-design/icons'


const BackTopBtn = ()=>{
  return(
      <BackTop visibilityHeight={300} >
        <div className='back-top'>
          <div className='horizontal'></div>
          <ArrowUpOutlined  style={{ fontSize: '31px', color: '#ffffff'}}/>
        </div>
      </BackTop>
  )
}

export default BackTopBtn