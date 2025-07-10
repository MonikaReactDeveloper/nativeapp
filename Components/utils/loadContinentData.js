// utils/loadContinentData.js
export const loadContinentData = async () => {
  const rawData = require('../Screens/assets/Continent.json');

  const continentCountryMap = {};

  rawData.forEach(row => {
    const country = row['Countries'];
    const continent = row['Continents'];

    if (!continentCountryMap[continent]) {
      continentCountryMap[continent] = [];
    }

    continentCountryMap[continent].push(country);
  });

  return continentCountryMap;
};
