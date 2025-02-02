// We have to changed leaflet version from 1.7.1 to 1.4.0 for windy

declare global {
  interface Window {
    windyInit: (options: WindyInitOptions) => void;
    WINDY: WindyGlobal;
  }
}

interface WindyInitOptions {
  key: string; // Your Windy API key
  lat: number; // Latitude
  lng: number; // Longitude
  zoom: number; // Zoom level
  overlay?: string; // Optional overlay, e.g., 'wind', 'rain', etc.
}

interface WindyGlobal {
  on: (event: string, callback: () => void) => void; // Event listener
  map: WindyMapInstance; // The map instance
}

interface WindyMapInstance {
  setView: (coords: [number, number], zoom: number) => void; // Set map view
  flyTo: (coords: [number, number], zoom: number) => void; // Smooth zoom to location
  addLayer: (layer: unknown) => void; // Add a layer to the map
  removeLayer: (layer: unknown) => void; // Remove a layer from the map
  getZoom: () => number; // Get the current zoom level
  // Add other Leaflet map methods if needed
}

export {};
