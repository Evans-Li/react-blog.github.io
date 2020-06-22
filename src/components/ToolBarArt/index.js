
import React from 'react';
import { Button } from 'antd'
import { FormOutlined } from '@ant-design/icons'

const style={
  textAlign: 'right',
  paddingRight: '40px'
}
const ToolBarArt =({props})=>{

  const CreateArt = ()=>{
    props.history.push('/index/add/')
  }
  return(
    <div style={style}>
      <Button type='primary' onClick={CreateArt}><FormOutlined />写文章</Button>
    </div>
  )
}

export default ToolBarArt