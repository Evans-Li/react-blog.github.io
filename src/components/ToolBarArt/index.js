
import React, { useEffect } from 'react';
import { Button, Tooltip, Modal, message } from 'antd'
import { FormOutlined, LogoutOutlined } from '@ant-design/icons'
import './index.scss'
import { servicePath } from '../../config/apiUrl'
import { requestPost } from '../../config/request'

const { confirm } = Modal

const style = {
  textAlign: 'right',
  paddingRight: '40px'
}
const signOutStyle = {
  color: '#ccc',
  fontSize: '20px'
}

const ToolBarArt = ({ props }) => {

  // 退出系统
  const handelSignOut = () => {
    confirm({
      title: '退出系统?',
      onOk() {
        requestPost(servicePath.signOut, {
          date: new Date().getTime()
        }).then(res => {
          if (res.data.isSuccess == true) {
            props.history.push('/')
            message.success('成功退出')
          } else{
            message.error('退出失败,请重试')
            return
          }
        })
      },
      onCancel() {

      }
    })
  }
  // 写文章
  const handelCreateArt = () => {
    props.history.push('/index/add/')
  }

  useEffect(() => {
    if (localStorage.openId) {
      console.log('you')
    } else {
      console.log('meiyou')
    }
  }, [])
  return (
    <div style={style}>
      <Button type='primary' onClick={handelCreateArt}><FormOutlined />写文章</Button>
      <span className='sign-out'><Tooltip title="退出"><LogoutOutlined style={signOutStyle} onClick={handelSignOut} /></Tooltip></span>
    </div>
  )
}

export default ToolBarArt