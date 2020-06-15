
import React, { useRef, useState } from 'react'
import { Avatar, Divider, Tooltip, Card, Tag, Tabs } from 'antd'
import { CSSTransition, TransitionGroup, Transition } from 'react-transition-group'
import './index.css'
// import Aperture from '../aperture'

import {
  GithubOutlined,
  QqOutlined,
  WechatOutlined
} from '@ant-design/icons'



const Author = () => {
  const [isPlay, setIsPlay] = useState(false)
  const playerEl = useRef(null) // audio
  const rotateEl = useRef(null)  // 控制播放暂停元素
  const maskEl = useRef(null)
  let [t, setT] = useState(0)
  var i = 0;


  const Beat = () => (
    <div className='mm' >
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
    </div>
  )

  //  头像旋转定时器
  const timer = function () {
    let time = setInterval(function () {
      if (i === 360) {
        i = 0;
        i++;
      } else {
        i++;
      }
      rotateEl.current.style.transform = `rotate(${i}deg)`;
      if (playerEl.current.paused) {
        setT(i)
        console.log('--- t', t)
        clearInterval(time)
        console.log('定时器清除')
      }
    }, 30);
  }
  //  音乐播放暂停
  const isPlayeIng = () => {
    if (!isPlay) {  //播放
      maskEl.current.style.background = `rgba(0, 0, 0, .3)`;
      i = t;
      setIsPlay(true)
      //调用定时器 , 使头像旋转
      timer();
      playerEl.current.play()
    } else {  // 暂停
      playerEl.current.pause()
      setIsPlay(false)
      maskEl.current.style.background = `rgba(0, 0, 0, 0)`;
    }
  }
  return (
    <div className="author-div comm-box">
      <div>
        <div className='audiol'  >
          <div className='pl-contro' onClick={isPlayeIng}>
            <div className='mask' ref={maskEl}></div>
            {isPlay ? <Beat /> : null} 
            <div className='rotate-div' ref={rotateEl}>
              <Avatar size={120} src={'../../static/self.JPG'} />
              <audio autoPlay={false} ref={playerEl} controls hidden loop>
                <source src={'../../static/home.m4a'} type="audio/mpeg"></source>
              </audio>
            </div>

          </div>
        </div>

        <h4>Evans</h4>
        <p>-- 入门程序员 --</p>
        <TransitionGroup
          in={true}
          classNames='my-node'
          timeout={1000}
          appear={true}
        >
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
        </TransitionGroup>
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

export default React.memo(Author)