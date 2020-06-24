import React from 'react';
import {
  AppstoreOutlined,
  CheckSquareOutlined
} from '@ant-design/icons'

//  定义url
export const urlList = {
  addArticle: '/index/add/',
  articleList: '/index/list/',
  echarts: '/index/echarts/',
  comment: '/index/comment/'
}

// 系统左侧菜单
export const menuList = [
  {
    title: '文章管理',
    key: '文章管理',
    icon: <AppstoreOutlined />,
    childrens: [
      {
        key: urlList.addArticle,
        title: '添加文章',
        icon: <AppstoreOutlined />
      },
      {
        key: urlList.articleList,
        title: '文章列表',
        icon: <CheckSquareOutlined />
      }
    ]
  },
  {
    title: '留言管理',
    key: urlList.comment,
    icon: <AppstoreOutlined />,
  },
]


