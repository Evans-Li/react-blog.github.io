import React, { useState, useEffect} from 'react'

const ViewCount = (value) => {
  const [count, setCount ] = useState(0)
  const style = {
    width: '60px',
    padding:'0 0'
  }

  useEffect(()=>{
    let c = value.value
    if(c <= 0){
      return
    }
    let i = 1;
    const timer = ()=>{
      let time = setInterval(() => {
        if(c>10000){
          if(i+101>c){
            i++
          }else{
            i+=101
          }
        }else if(c>1000){
          if(i+11>c){
            i++;
          }else{
            i+=11
          }
        }else{
          i++;
        }
        // 大于count就停止
        if(i>c){
          clearInterval(time)
          return
        }
        setCount(i)
      }, 10);
    }
    //调用定时器
    timer()
  },[])
  return (
    <>
      <span >
        {count}
      </span>
    </>
  )
}

export default React.memo(ViewCount)