import React from 'react'
import { Button } from 'antd'
// import { FormOutlined } from '@ant-design/icons'


const ArtToolBar1 = ({props})=>{
  console.log(props)
  const createArticle =()=>{
  }
  return(
    <div>
      <Button type='primary' onClick={createArticle}>写文章</Button>
    </div>
  )
}


export default ArtToolBar1


