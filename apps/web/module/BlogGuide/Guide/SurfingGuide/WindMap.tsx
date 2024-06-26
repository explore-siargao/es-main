import React, { useEffect, useState } from "react"

import {
  Map,
  LayersControl,
  TileLayer,
  Marker,
  Popup,
  // @ts-ignore
} from "react-windy-leaflet"

const WindMap = () => {
  const [state, setState] = useState({
    lat: 9.8137,
    lng: 126.1651,
    zoom: 11,

    pickerOpen: true,
    pickerLat: -23,
    pickerLng: -42,

    overlay: "wind",
  })

  const position = [state.lat, state.lng]

  useEffect(() => {
    let interval = setInterval(() => {
      setState((s) => ({
        ...s,
        pickerLat: s.pickerLat + 1,
        pickerLng: s.pickerLng + 1,
      }))
    }, 1000)

    setTimeout(() => {
      clearInterval(interval)
      setState((s) => ({ ...s, pickerOpen: false }))
    }, 6000)

    setTimeout(() => {
      setState({ ...state, pickerOpen: true, pickerLat: 25, pickerLng: 40 })
    }, 7000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <Map
        className="leaflet-container"
        style={{ width: "100%", height: "50vh", zIndex: "-2" }}
        windyKey={"lRWg63O6I7IV6ol2XUEiEEIPYLzyKQDS"}
        windyLabels={false}
        windyControls={false}
        overlay={state.overlay}
        overlayOpacity={0.5}
        particlesAnim={false}
        zoom={state.zoom}
        center={[state.lat, state.lng]}
        removeWindyLayers
        onWindyMapReady={() => {
          console.log("Windy Map Loaded!")
        }}
        pickerPosition={
          state.pickerOpen ? [state.pickerLat, state.pickerLng] : null
        }
        onPickerOpened={(latLng: any) => console.log("Picker Opened", latLng)}
        onPickerMoved={(latLng: { lat: any; lon: any }) => {
          console.log("Picker Moved", latLng)
          setState({
            ...state,
            pickerLat: latLng.lat,
            pickerLng: latLng.lon,
          })
        }}
        onPickerClosed={() => console.log("Picker Closed")}
        mapElements={
          <React.Fragment>
            <LayersControl>
              <LayersControl.BaseLayer checked name="OSM">
                <TileLayer
                  attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
              </LayersControl.BaseLayer>
            </LayersControl>

            <Marker position={position}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker>
          </React.Fragment>
        }
      />
    </div>
  )
}

export default WindMap
