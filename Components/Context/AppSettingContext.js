import React, { createContext, useState, useContext,useEffect } from 'react';

const AppSettingContext = createContext();

export const AppSettingProvider = ({ children }) => {
  const [appId, setAppId] = useState(null);

    useEffect(() => {
    const loadAppId = async () => {
      const storedId = await AsyncStorage.getItem('appId');
      if (storedId) setAppId(parseInt(storedId));
    };
    loadAppId();
  }, []);
  return (
    <AppSettingContext.Provider value={{ appId, setAppId }}>
      {children}
    </AppSettingContext.Provider>
  );
};

export const useAppSetting = () => useContext(AppSettingContext);
// import React, { createContext, useState, useContext, useEffect } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const AppSettingContext = createContext();

// export const AppSettingProvider = ({ children }) => {
//   const [appId, setAppIdState] = useState(null);

//   const setApp_id = async (id) => {
//     setApp_idState(id);
//     await AsyncStorage.setItem('app_id', String(id));
//   };

//   useEffect(() => {
//     const loadAppId = async () => {
//       const storedId = await AsyncStorage.getItem('app_id');
//       if (storedId) {
//         setApp_idState(storedId);
//       }
//     };
//     loadAppId();
//   }, []);

//   return (
//     <AppSettingContext.Provider value={{ app_id, setApp_id }}>
//       {children}
//     </AppSettingContext.Provider>
//   );
// };

// export const useAppSetting = () => useContext(AppSettingContext);
