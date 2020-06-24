import React, { useState } from 'react';
import { Card, Input, Spin, Button, message } from 'antd'
import 'antd/dist/antd.css';
import { HomeOutlined } from '@ant-design/icons'
import './index.scss'
import { servicePath } from '../config/apiUrl'
import { requestPost, requestGet } from '../config/request';
import cookie from 'react-cookies'


function Login(props) {
  const [userName, setUserName] = useState('')
  const [password, setPassworld] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const checkLogin = () => {
    setIsLoading(true)
    if (!userName) {
      message.error('用户名不能为空!')
      setTimeout(() => {
        setIsLoading(false)
      }, 500);
      return false
    } else if (!password) {
      message.error('密码不能为空!')
      setTimeout(() => {
        setIsLoading(false)
      }, 500);
      return false
    }
    let data = {
      "userName": userName,
      "password": password
    }
    requestPost(servicePath.checkLogin, data)
      .then((res) => {
        if (res.data.data === '登录成功') {
          setIsLoading(false)
          // localStorage.setItem("openId", res.data.openId)
          // cookie.save('openId', res.data.openId,{SameSite:'none'})
          props.history.push('/index')
        } else if (res.data.data === '登录失败') {
          message.error('用户名或密码错误!')
          setTimeout(() => {
            setIsLoading(false)
          }, 1000);
        }
      })
    setTimeout(() => {
      setIsLoading(false)
    }, 1000);
  }
  return (
    <>
      <div className='wrap'>
        <div className='login-div'>
          <Spin tip='isLoading...' spinning={isLoading} size='large'>
            <Card title='Blog System' bordered={true} style={{ width: 400 }}>
              <Input
                id="userName"
                size="large"
                placeholder="Enter your userName"
                prefix={<HomeOutlined />}
                onChange={(e) => { setUserName(e.target.value) }}
              /><br></br>
              <Input.Password
                id="password"
                size="large"
                placeholder="Enter your Passworld"
                prefix={<HomeOutlined />}
                onChange={(e) => { setPassworld(e.target.value) }}
              /><br></br>
              <Button type='primary' size='large' block onClick={checkLogin} >登录</Button>
            </Card>
          </Spin>
        </div>

      </div>

    </>
  )

}

export default Login