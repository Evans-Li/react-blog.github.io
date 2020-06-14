
import React, { useRef, useState } from 'react'
import { Avatar, Divider, Tooltip, Card, Tag, Tabs } from 'antd'
import { CSSTransition, TransitionGroup, Transition } from 'react-transition-group'
const { TabPane } = Tabs;
import './index.css'
// import '../../static/badge.jpeg'

import {
  GithubOutlined,
  QqOutlined,
  WechatOutlined
} from '@ant-design/icons'
import { tuple } from 'antd/lib/_util/type';
const Author = () => {
  const [ isPlay, setIsPlay ] = useState(true)

  const playerEl = useRef(null)
  const isPlayer = ()=>{
    console.log(playerEl.current.pause)
    if(isPlay){
      playerEl.current.pause()
      setIsPlay(false)
    }else{
      playerEl.current.play()
      setIsPlay(true)
    }
  }

  return (
    <div className="author-div comm-box">
      <div>
        <div className='audiol'>
          <i onClick={isPlayer}></i>
          <Avatar size={120} src={'../../static/badge.jpeg'} />
          <audio autoPlay={true}  ref={playerEl} controls hidden loop>
            <source src={'../../static/home.m4a'} type="audio/mpeg"></source>
          </audio>
        </div>

        <h4>Evans</h4>
        <p>-- 入门程序员 --</p>
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
        <Tooltip placement='bottom' title={<a target='_blank' href='https://github.com/LXxxx1/'>https://github.com/LXxxx1/</a>}><a target='view_window' href='https://github.com/LXxxx1/'><Avatar icon={<GithubOutlined />} size={28} className="account" ></Avatar></a></Tooltip>
        <Tooltip placement='bottom' title={<img width='150pxpx' height='200px' alt="qq" src="../../static/qq.jpeg" />}><Avatar size={28} icon={< QqOutlined />} className="account" /></Tooltip>
        <Tooltip placement='bottom' title={<img width='150pxpx' height='200px' alt="wechat" src="../../static/wechat.jpeg" />}><Avatar size={28} icon={< WechatOutlined />} className="account" /></Tooltip>
      </div>





    </div>

  )

}

export default Author