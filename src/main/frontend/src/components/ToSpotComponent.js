import {styled} from "styled-components";

export const Btn = styled.div`
  transition: transform 0.5s ease;
  transform: translateY(${({translateY}) => translateY + "vh"});
  position: absolute;
  font-family: 'Prompt', sans-serif;
  top: 8vh;
  right: 30px;
  z-index: 2;

  * {
    box-sizing: border-box;
  }

  .hot-spot {
    width: 20vh;
    display: flex;
    align-items: center;
  }

  .to-timeline {
    width: 13.5vh;
    height: 4.5vh;
    display: flex;
    background-color: #3AACFF;
    color: #caf0f8;
    z-index: 2;
    text-align: center;
    line-height: 1.8;
    padding: .3vh 2vh;
    border-radius: 4.5vh;
    margin: 0 auto;
    border: 2px solid #fff;
  }

  .to-spot {
    width: 4.5vh;
    height: 4.5vh;
    border-radius: 4.5vh;
    background-color: white;
    padding: .7vh .8vh;
    margin: 0 auto;
  }

  .btn-main:hover {
    color: #ffffff;
    cursor: pointer;
  }

  .btn-sub:hover {
    color: #ffffff;
    cursor: pointer;
  }

  .to-spot:hover {
    color: #f24e1e;
  }

  .to-spot:active {
    background-color: rgb(0, 0, 0, 0);
  }

  .more {
    background-color: #d9d9d9;
    color: #000;
  }

  .marker {
    color: #282c34;
  }

  .marker:hover {
    color: #f24e1e;
  }
`;
export const Converter = styled.button`
  position: absolute;
  font-family: 'Prompt', sans-serif;
  bottom: 50px;
  right: 30px;
  z-index: 2;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  border: 1px solid rgb(0, 0, 0, 30);
  opacity: 70%;
  padding: 8.5px 0;
  outline: none;

  &:hover {
    opacity: 90%;
  }

  &:active {
    opacity: 90%;
    background-color: #d9d9d9;
  }

  .icon:hover {
    color: #f24e1e;
  }
`;

export const Container = styled.div`
  * {
    box-sizing: border-box;
  }
  .wrap {
    position: absolute;
    left: 0;
    bottom: 40px;
    width: 288px;
    height: 132px;
    margin-left: -144px;
    text-align: left;
    overflow: hidden;
    font-size: 24px;
    font-family: 'Malgun Gothic', dotum, '돋움', sans-serif;
    line-height: 1.5;
  }

  .wrap * {
    padding: 0;
    margin: 0;
  }

  .wrap .info {
    width: 286px;
    height: 120px;
    border-radius: 5px;
    border-bottom: 2px solid #ccc;
    border-right: 1px solid #ccc;
    overflow: hidden;
    background: #fff;
  }

  .wrap .info:nth-child(1) {
    border: 0;
    box-shadow: 0px 1px 2px #888;
  }

  //.info .title {
  //  padding: 5px 0 0 10px;
  //  height: 30px;
  //  background: #eee;
  //  border-bottom: 1px solid #ddd;
  //  font-size: 18px;
  //  font-weight: bold;
  //}

  .info .body {
    position: relative;
    overflow: hidden;
    height: 100%;
  }

  .info .desc {
    position: relative;
    margin: 13px 0 0 110px;
    height: 75px;
  }

  .desc .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .desc .jibun {
    font-size: 15px;
    color: #888;
    margin-top: -2px;
  }

  .info .img {
    position: absolute;
    top: 6px;
    left: 5px;
    width: 90px;
    height: 90px;
    //border-radius: 90px;
    border: 1px solid #bbb;
    color: #888;
    overflow: hidden;
  }

  .info:after {
    content: '';
    position: absolute;
    margin-left: -12px;
    left: 50%;
    bottom: 0;
    width: 22px;
    height: 12px;
    background: url('https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/vertex_white.png')
  }

  .info .link {
    color: #5085BB;
  }
`;