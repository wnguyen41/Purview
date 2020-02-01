import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div>
      <div className="Camera">
        <a-scene
          vr-mode-ui="enabled: false"
          embedded
          arjs='sourceType: webcam; sourceWidth:1280; sourceHeight:960; displayWidth: 1280; displayHeight: 960; debugUIEnabled: false;'>
      
          <a-box scale="15 15 15" gps-entity-place="latitude: 33.648829; longitude: ,-117.842782;"></a-box>
          <a-camera gps-camera rotation-reader></a-camera>
          <a-entity camera></a-entity>
        </a-scene>
      </div>
      <div className="Blur">
        <button>View</button>
        <button>Make</button>

      </div>
    </div>

  );
}

export default App;
