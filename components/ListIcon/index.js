import React from 'react';
import CountTo from 'react-count-to';
import ViewCount from '../../components/ViewCount'
import './index.css'
import {
  CarryOutOutlined,
  FileOutlined,
  FireTwoTone
} from '@ant-design/icons'

const ListIcon = ({ item, className = '' }) => {
  return (
    <div className={`list-icon ${className}`}>
      <span>
        <CarryOutOutlined style={{ color: '#4091F7' }} />{item.addTime}
      </span>
      <span>
        <FileOutlined style={{ color: 'gold' }} />{item.typeName}
      </span>
      <span>
        <FireTwoTone twoToneColor='#f0732e' /><ViewCount value={item.view_count} />次点击
      </span>
    </div>

  )
}



export default React.memo(ListIcon)