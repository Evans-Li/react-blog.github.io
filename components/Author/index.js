import { Avatar, Divider, Tooltip, Card, Tag, Tabs } from 'antd'
import { CSSTransition, TransitionGroup, Transition } from 'react-transition-group'
const { TabPane } = Tabs;
import './index.css'

import {
  GithubOutlined,
  QqOutlined,
  WechatOutlined
} from '@ant-design/icons'
const Author = () => {

  return (
    <div className="author-div comm-box">
      <div>
        <Avatar size={120} src='https://avatars3.githubusercontent.com/u/43921905?s=460&u=a4c5fe768f9afafa78f12d6bd65141c1331bf1fa&v=4' />
        <h4>Evans</h4>
        <p>菜鸟工程师</p>
        <TransitionGroup
          in={true}
          classNames='my-node'
          timeout={1000}
          appear={true}
        >
          {/* <CSSTransition
          in={true}
          classNames='my-node'
          timeout={1000}
          appear={true}
        > */}
          <div>
            <Tag color="magenta">React Hooks</Tag>
            <Tag color="red">Axios</Tag>
            <Tag color="volcano">Next.js</Tag>
            <Tag color="orange">Antd Design</Tag>
            <Tag color="gold">markdown</Tag>
            <Tag color="lime">mysql</Tag>
            <Tag color="green">CSS</Tag>
            <Tag color="cyan">egg.js</Tag>
          </div>
          {/* </CSSTransition> */}
        </TransitionGroup>



        {/* </Transition> */}
        {/* </TransitionGroup>  */}

      </div>
      <div className="author-introduction">
        <Divider>社交账号</Divider>
        <Tooltip placement='bottom' title={<a href='https://github.com/LXxxx1/'>https://github.com/LXxxx1/</a>}><a href='https://github.com/LXxxx1/'><Avatar icon={<GithubOutlined />} size={28} className="account" ></Avatar></a></Tooltip>
        <Tooltip placement='bottom' title={<img width='150pxpx' height='200px' alt="qq" src="https://github.com/LXxxx1/Files/blob/master/qq.JPG?raw=true" />}><Avatar size={28} icon={< QqOutlined />} className="account" /></Tooltip>
        <Tooltip placement='bottom' title={<img width='150pxpx' height='200px' alt="wechat" src="https://github.com/LXxxx1/Files/blob/master/wechat.JPG?raw=true" />}><Avatar size={28} icon={< WechatOutlined />} className="account" /></Tooltip>
      </div>
      




    </div>

  )

}

export default Author