// import React, { createContext, useContext, useState } from 'react';

// const MapContext = createContext();

// export const MapProvider = ({ children }) => {
//   const [categoryCountries, setCategoryCountries] = useState({
//     'List 1 (Sun)': {},
//     'List 2 (Air)': {},
//     'List 3 (Trees)': {},
//     'List 4 (Land)': {},
//     'List 5 (Water)': {},
//     'List 6 (Core)': {},
//   });

//   return (
//     <MapContext.Provider value={{ categoryCountries, setCategoryCountries }}>
//       {children}
//     </MapContext.Provider>
//   );
// };

// export const useMapContext = () => useContext(MapContext);
// Context/MapContext.js
// import React, { createContext, useContext, useState, useRef } from 'react';

// const MapContext = createContext();

// export const MapProvider = ({ children }) => {
//   const webviewRef = useRef(null);
//   const viewShotRef = useRef(null);

//   const [countryCategoryMap, setCountryCategoryMap] = useState({});
//   const [countryCounts, setCountryCounts] = useState({});
//   const [legendLabels, setLegendLabels] = useState({});

//   return (
//     <MapContext.Provider value={{
//       webviewRef,
//       viewShotRef,
//       countryCategoryMap,
//       setCountryCategoryMap,
//       countryCounts,
//       setCountryCounts,
//       legendLabels,
//       setLegendLabels,
//     }}>
//       {children}
//     </MapContext.Provider>
//   );
// };

// export const useMapContext = () => useContext(MapContext);
// context/MapContext.js
import React, { createContext, useContext, useState, useRef } from 'react';

const MapContext = createContext();

export const MapProvider = ({ children }) => {
  const webviewRef = useRef(null);
  const viewShotRef = useRef(null);
const [countryToContinentMap, setCountryToContinentMap] = useState({});
  const [countryCategoryMap, setCountryCategoryMap] = useState({});
  const [countryCounts, setCountryCounts] = useState({});
  const [legendLabels, setLegendLabels] = useState({});
const [categoryCountries, setCategoryCountries] = useState({
  'List 1 (Sun)': {},
  'List 2 (Air)': {},
  'List 3 (Trees)': {},
  'List 4 (Land)': {},
  'List 5 (Water)': {},
  'List 6 (Core)': {},
});

  // 🔽 Add this image state
  const [images, setImages] = useState({
    companyBanner: null,
    companyIcon: null,
    markLogo: null,
    knowLogo: null,
    playLogo: null,
    adBanner1: null,
    adBanner2: null,
  });


  const saveImages = (newImages) => {
    setImages(newImages);
  };

  return (
    <MapContext.Provider value={{
      webviewRef,
      viewShotRef,
      countryCategoryMap,
      setCountryCategoryMap,
      countryCounts,
      setCountryCounts,
      legendLabels, categoryCountries, setCategoryCountries, 
      setLegendLabels,
       countryToContinentMap, setCountryToContinentMap,
      images, // ⬅ exposed globally
      saveImages, // ⬅ exposed globally
    }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMapContext = () => useContext(MapContext);
