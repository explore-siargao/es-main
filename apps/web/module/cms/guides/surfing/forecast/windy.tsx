"use client";

import React, { useEffect, useRef } from "react";
// We have to changed leaflet version from 1.7.1 to 1.4.0 for windy
import L from "leaflet";
import { WINDY_KEY } from "@/common/constants/ev";

const NewWindy = () => {
  const mapRef = useRef<L.Map | null>(null);

  // Expose L globally for the Windy script
  if (typeof window !== "undefined") {
    window.L = L;
  }

  // Dynamically load the Windy script
  const windyScript = document.createElement("script");
  windyScript.src = "https://api.windy.com/assets/map-forecast/libBoot.js";
  windyScript.async = true;

  useEffect(() => {
    if (mapRef.current) return;
    windyScript.onload = () => {
      if (window.windyInit) {
        window.windyInit(
          {
            key: WINDY_KEY,
            lat: 9.8137,
            lng: 126.1651,
            zoom: 11,
          },
        );
      }
    };

    // Append the script to the document head
    document.head.appendChild(windyScript);

    return () => {
      // Cleanup the map instance
      if (mapRef.current) {
        mapRef.current.off(); // Remove event listeners
        mapRef.current.eachLayer((layer) => {
          mapRef.current?.removeLayer(layer);
        });
        mapRef.current.remove(); // Destroy the map instance
        mapRef.current = null;
      }

      // Cleanup the script
      document.head.querySelectorAll("[src*='windy']").forEach((node) => node.remove());
    };
  }, []);

  return (
    <div
      id="windy"
      className="rounded-2xl h-full w-full"
    />
  );
}

export default NewWindy;