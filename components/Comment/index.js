import React, { useState, useEffect } from 'react'
import { Card, Divider, Input, Form, Button } from 'antd'
const { TextArea } = Input
const Comment = props => {
  const { list } = props
  const commList = list[0]
  useEffect(() => {
  }, [])

  const layout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 20 },
  };

  const validateMessages = {
    required: '${label} 不能为空!',
    types: {
      email: '${label} is not validate email!',
      number: '${label} is not a validate number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  const onFinish = values => {
    const data = values
    console.log('data',data);
  };
  return (
    <div>
      <Card>
        <Divider>留言板</Divider>
        <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
          <Form.Item name={['user', 'name']} label="昵称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name={['user', 'email']} label="邮箱" rules={[{ type: 'email' }]}>
            <Input />
          </Form.Item>
          <Form.Item name={['user', 'content']} label="内容"rules={[{ required: true }]} >
            <Input.TextArea />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 11 }}>
            <Button type="primary" htmlType="submit">
              发布评论
        </Button>
          </Form.Item>
        </Form>

      </Card>

    </div>
  )
}

export default React.memo(Comment)