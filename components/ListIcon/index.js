import React from 'react';
import CountTo from 'react-count-to';
import {
  CarryOutOutlined,
  FileOutlined,
  EyeOutlined
} from '@ant-design/icons'

const ListIcon = ({ item, className = '' }) => (
  <div className={`list-icon ${className}`}>
    <CarryOutOutlined style={{ color: 'orange' }} />{item.addTime}
    <FileOutlined style={{ color: 'gold' }} />{item.typeName}
    <EyeOutlined style={{ color: '#70AAD5' }} /><CountTo to={item.view_count} speed={2500} />
  </div>

)

export default React.memo(ListIcon)