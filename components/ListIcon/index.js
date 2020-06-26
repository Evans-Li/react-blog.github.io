import React from 'react';
import { Tag } from 'antd'
import ViewCount from '../../components/ViewCount'
import './index.css'
import {
  CalendarOutlined,
  FileOutlined,
  FireTwoTone
} from '@ant-design/icons'

const style = (istop = false) => ({
    display: 'inline-block',
    padding: '0 20px',
  })
const ListIcon = ({ item, className = '', isTop = false }) => {
  return (
    <div className={`list-icon ${className}`}>
      {isTop ? <Tag style={style()} color='red'>置顶</Tag> : null}
      <span>
        {/* <CarryOutOutlined style={{ color: '#4091F7' }} />{item.addTime} */}
        <CalendarOutlined />{item.addTime}
      </span>
      <span>
        {/* <FileOutlined style={{ color: 'gold' }} />{item.typeName} */}
        <FileOutlined />{item.typeName}
      </span>
      <span>
        <FireTwoTone twoToneColor='#f0732e' /><ViewCount value={item.view_count} />人
      </span>
    </div>

  )
}



export default ListIcon