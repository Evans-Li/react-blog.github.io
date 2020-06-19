
import React, { useRef, useState, useEffect } from 'react'
import { Avatar, Divider, Tooltip, Card, Tag, Tabs } from 'antd'
import './index.css'
import { serviceUrl } from '../../config/apiUrl'
import axios from 'axios'
import ViewCount from '../ViewCount'

import {
  GithubOutlined,
  QqOutlined,
  WechatOutlined
} from '@ant-design/icons'



const Author = (data) => {
  const [all_part_count, setAll_part_count] = useState(0);  //总文章数
  const [all_view_count, setAll_view_count] = useState(0);  //总浏览数
  const [isPlay, setIsPlay] = useState(false)
  const playerEl = useRef(null) // audio
  const rotateEl = useRef(null)  // 控制播放暂停元素
  const maskEl = useRef(null)
  let [t, setT] = useState(0)
  var i = 0;
  // useEffect(()=>{
  //   console.log(data)
  // },[])

  const Beat = () => (
    <div className='mm' >
      {
        [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(item => (
          <span key={item}></span>
        ))
      }
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


  //获取总浏览数与文章数
  const fetchData = async () => {
    const result = await axios(serviceUrl.getAllPartCount).then(res => {
      return res.data.data;
    })
    setAll_part_count(result[0].total);
    setAll_view_count(result[0].all_view_count);
  }
  useEffect(() => {
    fetchData()
  }, [])
  return (
    <div className="author-div comm-box">
      <div>
        <div className='audiol'  >
          <div className='pl-contro' onClick={isPlayeIng}>
            <div className='mask' ref={maskEl}></div>
            {isPlay ? <Beat /> : null}
            <div className='rotate-div' ref={rotateEl}>
              <Avatar size={120} src={'../../static/IMG_1231.JPG'} />
              <audio autoPlay={false} ref={playerEl} controls hidden loop>
                <source src={'../../static/home.m4a'} type="audio/mpeg"></source>
              </audio>
            </div>

          </div>
        </div>
        <h4>Evans</h4>
        <p>-- 入门程序员 --</p>
        <div>
          <Tag color="magenta">WEB前端</Tag>
          <Tag color="red">入门程序员</Tag>
          <Tag color="green">菜鸟程序员</Tag>
          <Tag color="gold">没有经验</Tag>
          <Tag color='cyan'>文章共{all_part_count ? <ViewCount value={all_part_count} /> : null}篇</Tag>
          <Tag color='blue'>总被访问{all_view_count ? <ViewCount value={all_view_count} /> : null}次</Tag>


        </div>
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

// Author.getInitialProps = async (context) => {
//   const promise = new Promise((resolve) => {
//     axios(serviceUrl.getAllPartCount).then(()=>{
//       res =>{
//         resolve(res.data.data)
//       }
//     })
//   })
//   console.log(111)

//   return await promise
// }

export default Author