import React from "react";
import {OverLay} from "../styled/OverLay";

const ToSpotData = {
  setOverlay: (data) => {
    return (
        <OverLay>
          <div className="wrap">
            <div className="info">
              <div className="body">
                <div className="img">
                  <img
                      src={data.img}
                      width="90"
                      height="90"
                  />
                </div>
                <div className="desc">
                  <div className="ellipsis">
                    {data.name}
                  </div>
                  <div className="jibun ellipsis">
                    {data.content}
                  </div>
                </div>
                <div className="place">
                  <span>장소 : {data.place}</span>
                </div>
              </div>
            </div>
          </div>
        </OverLay>
    );
  },
  eventOverlay: (data) => {
    return(
        <>
          <img src={`${data.MAIN_IMG}`} className='img'></img>
          <div className='title'>{data.TITLE}</div>
          <p>{`${data.PLACE}`}</p>
          <p>기간 : {`${data.DATE}`}</p>
        </>
    )
  }
}

export default ToSpotData;