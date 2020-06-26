import React from 'react'
import './index.css'
import { Card, Tabs } from 'antd'
import {
  QqOutlined
} from '@ant-design/icons'
const { TabPane } = Tabs

const qqList = [
  {
    href: 'https://shang.qq.com/wpa/qunwpa?idkey=b579b0054e58fea7d7e41e529c2dd415d7e0632c1f95a00c065513d8763a202e',
    text: '前端1群:创造404(3000人)'
  },
  {
    href: 'https://shang.qq.com/wpa/qunwpa?idkey=b579b0054e58fea7d7e41e529c2dd415d7e0632c1f95a00c065513d8763a202e',
    text: '前端2群:创造404(3000人)'

  }, {
    href: 'https://shang.qq.com/wpa/qunwpa?idkey=b579b0054e58fea7d7e41e529c2dd415d7e0632c1f95a00c065513d8763a202e',
    text: '前端3群:创造404(3000人)'

  }, {
    href: 'https://shang.qq.com/wpa/qunwpa?idkey=b579b0054e58fea7d7e41e529c2dd415d7e0632c1f95a00c065513d8763a202e',
    text: '前端4群:创造404(3000人)'

  }, {

    href: 'https://shang.qq.com/wpa/qunwpa?idkey=b579b0054e58fea7d7e41e529c2dd415d7e0632c1f95a00c065513d8763a202e',
    text: '前端5群:创造404(3000人)'

  },
]

const HomeTab = () => {
  return (
    <div className='comm-box home-tab'>
      <Tabs>
        <TabPane tab="QQ群" key="1">
          <div>
            <p className='qq-tips'>加入QQ群一起学习!!</p>
            {
              qqList.map(item => (
                <p><a target="_blank" href={item.href}><QqOutlined /><span className='text'>{item.text}</span></a></p>
              ))
            }
          </div>
        </TabPane>
        <TabPane tab="公众号" key="2">
          <div>
            <h3 className='tab-h'>即将上线...</h3>
          </div>
        </TabPane>

        <TabPane tab="小密圈" key="3">
          <div>
            <h3 className='tab-h'>即将上线...</h3>
          </div>
        </TabPane>
      </Tabs>


    </div>
  )
}

export default HomeTab