import React, { useState, useRef} from 'react';

import { Form, Input, Button, Divider, Spin, message} from 'antd';
import './index.css'
import { serviceUrl } from '../../config/apiUrl'
import axios from 'axios'
import { FrownFilled } from '@ant-design/icons';
const TextArea = Input.TextArea;
const buttonStyle = {
  margin: '0 8px',
}


const CommentForm = ({ onCancel, dataProps,isReply = false }) => {
  const [isLoading, setIsLoading ] = useState(false)
  const [commentKey, setCommentKey] = useState(Math.random());

  const formRef = useRef(null)
  //  表单验证信息
  const validateMessages = {
    required: '${label} 不能为空!',
    types: {
      email: '${label} 格式不正确!',
      number: '${label} is not a validate number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  //  提交评论
  const upComment = async (values) => {
    let aa = values.comm
    Object.assign(dataProps,aa)

    console.log(dataProps)
    setIsLoading(true)
    const res = await axios({
      method: "post",
      url: serviceUrl.addComment,
      header: { "Access-Control-Allow-Origin": "*" },
      data: dataProps,
      withCredentials: true
    })
    setIsLoading(false)
    const isSuccess = res.status == 200;
    if (isSuccess) {
      message.success("评论成功");
      setCommentKey(Math.random());
    } else {
      message.error("评论失败");
    }
    return isSuccess;
  };

  const onFinishFailed = e => {
    console.log('评论失败', e)
  }

  // 表单验证数据成功后, 清空form表单值
  const onFinish = (values) => {
    upComment(values).then(res =>{
      //  清空表单
      !!res && formRef.current.resetFields()
    }).catch((e)=>{
      message.error('评论失败!')
      console.log('评论失败',e)
    })
   
  }
  return (
    <div className="comment-div">
      <Divider style={{ color: '#1890ff' }}>留言板</Divider>
      <Spin tip="Loading..." spinning={isLoading}>
        <Form layout='horizontal' ref={formRef}  onFinish={onFinish} validateMessages={validateMessages} >
          <Form.Item name={['comm', 'com_name']} label="昵称" rules={[{ required: true }]} >
            <Input placeholder='请输入昵称' />
          </Form.Item>
          <Form.Item name={['comm', 'email']} label="邮箱" rules={[{ type: 'email'}]} style={{marginLeft: '10px'}}>
            <Input  placeholder='请输入邮箱' />
          </Form.Item>
          <Form.Item name={['comm', 'comment']} label="留言" rules={[{ required: true }]}>
            <Input.TextArea rows={5} placeholder={`请输入您${ isReply ? '的回复' : '想说的,稍后会有更多人看到您的留言.'}`} />
          </Form.Item>

          <Form.Item style={{ textAlign: "center" }}>
            {isReply && (
              <Button style={buttonStyle} onClick={onCancel}> 取消 </Button>
            )}
            <Button type="primary" htmlType="submit"> 提交{isReply ? '' : '留言'} </Button>
          </Form.Item>
        </Form >

      </Spin>

    </div>
  )
}

export default CommentForm