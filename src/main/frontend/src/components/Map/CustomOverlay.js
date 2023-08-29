import React, {useEffect, useState} from "react";
import {CustomOverlayMap} from "react-kakao-maps-sdk";
import styled from 'styled-components';


const Maker = styled.div`
  position: absolute;
  bottom: 50px;
  right: -100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 10px;
  width: 200px;
  background-color: white;
  border-radius: 15px;
  padding-bottom: 10px;
  border: 1px solid rgb(30, 30, 30, 30%);
  z-index: 100000;
  
  
  * {
    box-sizing: border-box;
  }

  .img {
    width: 100%;
    border-radius: 15px 15px 0 0;
  }

  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 30%;
    width: 100%;
    font-size: 10px;
    flex-wrap: wrap;
    text-overflow: ellipsis;
    font-weight: bold;
    white-space: normal;
    padding: 10px;
  }
`

export const Customer = (props) => {
  const marker = props.marker;
  return (
    <>
      <CustomOverlayMap position={{
        lat: marker.lat,
        lng: marker.lng
      }}>
        {marker.content}
      </CustomOverlayMap>
    </>
  )
}

export const Event = (props) => {
  const marker = props.marker;
  useEffect(() => {
    console.log("이벤트 마커")
    console.log(marker)
  }, []);
  return(
    <>
      <CustomOverlayMap position={{
        lat: marker.lat,
        lng: marker.lng,
      }}>
        <Maker onClick={() => {
          props.setIsVisible(false)
        }}>
          {marker.content}
        </Maker>
      </CustomOverlayMap>
    </>
  )
}

const CustomOverlay = (props) => {
  const marker = {
    lat: props.position.lat,
    lng: props.position.lng,
    content: props.content
  };
  useEffect(() => {
    console.log("current")
    console.log(props.Mode)
  }, []);

  return (
    <>
      {
        props.Mode === 0 ?
          (
           <Customer marker={marker}/>
          )
          :
          (
            <Event marker={marker} setIsVisible={props.setIsVisivle}/>
          )
      }
    </>
  )
}

export default CustomOverlay;