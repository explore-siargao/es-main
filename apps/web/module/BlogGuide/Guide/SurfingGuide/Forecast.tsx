import React from "react"
import WindMap from "./WindMap"

function Forecast() {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">SIARGAO SURF FORECAST</h2>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <WindMap />
        </div>
        <div className="flex justify-center">
          <link
            href="//www.surf-forecast.com/stylesheets/widget.css"
            media="screen"
            rel="stylesheet"
            type="text/css"
          />
          <div className="wf-width-cont surf-fc-widget">
            <div className="widget-container">
              <div className="external-cont">
                <iframe
                  className="surf-fc-i"
                  src="//www.surf-forecast.com/breaks/Cloud-Nine/forecasts/widget/a"
                  scrolling="no"
                ></iframe>
                <div className="footer">
                  <a className="logo" href="//www.surf-forecast.com/">
                    <img
                      src="//www.surf-forecast.com/images/widget.png"
                      width="1"
                      height="1"
                    />
                  </a>
                  <div className="about" id="cmt">
                    View detailed surf forecast for{" "}
                    <a href="//www.surf-forecast.com/breaks/Cloud-Nine">
                      Cloud 9
                    </a>
                    . Visit{" "}
                    <a href="//www.surf-forecast.com/breaks/Cloud-Nine">
                      surf-forecast.com
                    </a>{" "}
                    for more details, long range forecasts, surf reports, swell
                    and weather maps.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Forecast
