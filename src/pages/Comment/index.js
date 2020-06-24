import React, { useState, useEffect } from 'react';
import { Table, Spin, message, Modal } from 'antd'
import { requestGet, requestPost } from '../../config/request'
import { servicePath } from '../../config/apiUrl'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import './index.scss'

const { confirm } = Modal;

const Comment = () => {
  const [list, setList] = useState([])
  const [isLoaidng, setIsLoading] = useState(true)


  const fetchData = () => {
    requestGet(servicePath.getArticleComment).then(res => {
      setList(res.data.list)
      setIsLoading(false)
    })
  }

  // 表格column
  const columns = [
    {
      title: '昵称',
      dataIndex: 'com_name',
      key: 'com_name',
      width: 130
    },
    {
      key: 'email',
      title: '邮箱',
      dataIndex: 'email',
      aligh: 'center',
      width: 210
    },
    {
      key: 'date',
      title: '时间',
      dataIndex: 'add_time',
      align: 'center',
      width: 130,
      defaultSortOrder: 'descend',
      sorter: (a, b) => {
        let AdateStr = a.add_time.replace(/-/g, "")
        let BdateStr = b.add_time.replace(/-/g, "")
        return AdateStr - BdateStr
      },
    },
    {
      key: 'comment',
      title: '留言内容',
      dataIndex: 'comment',
    },
    {
      key: 'is_pass',
      title: '留言状态',
      dataIndex: 'is_pass',
      width: 100,
      filters: [
        {
          text: '未审核',
          value: '0',
        },
        {
          text: '已审核',
          value: '1',
        },
      ],
      filterMultiple: false,
      onFilter: (value, record) => record.is_pass == value,
      sortDirections: ['descend', 'ascend'],
      render: function (text, record) {
        let config = {
          '0': '未审核',
          '1': '已通过',
        }
        return config[text]
      }
    },
    {
      key: 'action',
      title: '操作',
      dataIndex: 'action',
      width: 140,
      render: function (text, record) {
        return (
          <div className='comment-action-div'>
            {
              // 非回复类型  和未通过的留言显示通过按钮
              record.is_pass == 0 && record.is_reply == 0 ?
                <a className='pass' target={record.id} onClick={passComment}>通过</a>
                :
                null
            }
            <a className='del' target={record.id} onClick={delComment}>删除</a>
            <a className='details' target={record.id} onClick={deteilsComm}>详情</a>
          </div>

        )
      }
    }
  ];

  //  删除留言
  const delComment = (e)=>{
    let data = { 
      id: e.target.target,
      type: 'delete',
     }
    confirm({
      title: '确定删除这条留言吗?',
      icon: <ExclamationCircleOutlined />,
      content: '操作不可撤回, 请君斟酌再三!',
      okText: '删除',
      onOk() {
        console.log('OK');
        requestPost(servicePath.upPassComment, data).then(res => {
          console.log(res)
          if (res.data.isSuccess) {
            message.success(res.data.msg)
            fetchData()
          }else{
            message.error('删除失败')
          }
        }).catch((e)=>{
          message.error('删除失败, 请重试!')
          console.log('删除失败',e)
        })
      },
      onCancel() {

      },
    });
    
  }

  const deteilsComm =()=>{

  }
  //  审核通过
  const passComment = (e) => {
    let data = { 
      id: e.target.target,
      type: 'pass',
     }
    confirm({
      title: '通过这条留言吗?',
      icon: <ExclamationCircleOutlined />,
      content: '操作不可撤回, 请君斟酌再三!',
      okText: '通过',
      onOk() {
        console.log('OK');
        requestPost(servicePath.upPassComment, data).then(res => {
          console.log(res)
          if (res.data.isSuccess) {
            message.success(res.data.msg)
            fetchData()
          }else{
            message.error('操作失败')
          }
        }).catch((e)=>{
          message.error('操作失败, 请重试!')
          console.log('操作失败',e)
        })
      },
      onCancel() {

      },
    });
    
  }

  function onChange(pagination, filters, sorter, extra) {
    // console.log('params', pagination, filters, sorter, extra);
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div>
      <Table
        columns={columns}
        dataSource={list}
        onChange={onChange}
        size='small'
        loading={isLoaidng}
        bordered
      />
    </div>
  )
}

export default Comment
