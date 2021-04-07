import React from 'react'
import './back-button.scss'
import { useHistory } from "react-router-dom";
import ArrowLeft from '../../img/arrow-left.png'

const BackButton = (props) => {
  const history = useHistory();

  const routeChange = () =>{ 
    let path = `/`; 
    history.push(path);
  }

  return (
    props.text ? 
    <button onClick={routeChange} className="btn-back">
      <img src={ArrowLeft} alt="LeftArrow" /> {props.text}
    </button>
    : 
    <> </>
  )
}

export default BackButton
