import React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import './index.css'

const Transition = ({ timeout, classNames, appear,unmountOnExit, item}) => {
  return(
    <CSSTransition
      in={true}
      timeout={timeout}
      classNames={classNames}
      appear={appear}
      unmountOnExit={unmountOnExit}
    >
    {item}
    </CSSTransition>
  )
}

export default Transition