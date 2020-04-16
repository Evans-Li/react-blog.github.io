import React from 'react';
import ReactEcharts from 'echarts-for-react'
import { barOption } from './data'
import './style.scss'
function Echart(){

  return (
    <div>
      <div className='echartsBox'>
      <ReactEcharts 
        option={barOption}
        style={{width:'100%',height:'500px'}}
       />
       </div>
      <div id='main'>echarts</div>
    </div>
  )
  
}

export default Echart