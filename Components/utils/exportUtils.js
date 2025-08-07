// // utils/exportUtils.js

// import * as FileSystem from 'expo-file-system';
// import * as Sharing from 'expo-sharing';

// export async function exportDataToFile(countryCategoryMap, countryCounts, legendLabels) {
//   const exportCountryMap = {};

//   for (const [country, tripKey] of Object.entries(countryCategoryMap)) {
//     const count = countryCounts[country] || 1;
//     exportCountryMap[country] = { tripKey, count };
//   }

//   const exportObject = {
//     countryCategoryMap: exportCountryMap,
//     legendLabels,
//   };

//   const now = new Date();
//   const dd = String(now.getDate()).padStart(2, '0');
//   const mm = String(now.getMonth() + 1).padStart(2, '0');
//   const yy = String(now.getFullYear()).slice(-2);
//   const hh = String(now.getHours()).padStart(2, '0');
//   const min = String(now.getMinutes()).padStart(2, '0');
//   const ss = String(now.getSeconds()).padStart(2, '0');

//   const fileName = `mark_${dd}${mm}${yy}_${hh}${min}${ss}.json`;
//   const fileUri = FileSystem.documentDirectory + fileName;

//   try {
//     await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(exportObject, null, 2));
//     await Sharing.shareAsync(fileUri);
//   } catch (err) {
//     console.error('Failed to save file:', err);
//   }
// }
// utils/exportUtils.js
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import * as Sharing from 'expo-sharing';
import XLSX from 'xlsx';

const getFormattedDateTime = () => {
  const now = new Date();
  const dd = String(now.getDate()).padStart(2, '0');
  const mm = String(now.getMonth() + 1).padStart(2, '0'); // Months start at 0
  const yy = String(now.getFullYear()).slice(-2);
  const hh = String(now.getHours()).padStart(2, '0');
  const min = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');

  return `${dd}${mm}${yy}_${hh}${min}${ss}`;
};

// Save JSON
export const exportDataToFile = async (mapData, counts, labels, countryToContinentMap) => {
  const data = {
    countryCategoryMap: mapData,
    countryCounts: counts,
    legendLabels: labels,
    countryToContinentMap: countryToContinentMap,
  };

  const json = JSON.stringify(data, null, 2);
  const timestamp = getFormattedDateTime();
  const fileUri = `${FileSystem.documentDirectory}mark_${timestamp}.json`;

  await FileSystem.writeAsStringAsync(fileUri, json);
  await Sharing.shareAsync(fileUri);
};

// Import JSON
export const importDataFromFile = async () => {
  try {
    const result = await DocumentPicker.getDocumentAsync({ 
  type: ['application/json', 'text/json'], 
  copyToCacheDirectory: true 
});

    const fileUri = result.assets?.[0]?.uri || result.uri;

    if (!fileUri || result.canceled) {
      console.warn("No file selected or cancelled");
      return null;
    }

    const content = await FileSystem.readAsStringAsync(fileUri);
    try {
      const parsed = JSON.parse(content);
      return parsed;
    } catch (e) {
      console.error("Invalid JSON:", e);
      Alert.alert("Import Failed", "Selected file does not contain valid JSON.");
      return null;
    }
  } catch (error) {
    console.error("Import error:", error);
    Alert.alert("Error", "Failed to import data.");
    return null;
  }
};

// Export to Excel
export const exportToExcel = async (mapData, countryToContinentMap) => {
  const dataArray = [];

  Object.keys(mapData).forEach((category) => {
    Object.entries(mapData[category]).forEach(([country, count]) => {
      const continent = countryToContinentMap[country] || 'Unknown';
      dataArray.push({ Category: category, Country: country, Count: count, Continent: continent });
    });
  });

  const worksheet = XLSX.utils.json_to_sheet(dataArray);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "MapData");

  const excelBinary = XLSX.write(workbook, { type: 'base64', bookType: 'xlsx' });

  const timestamp = getFormattedDateTime();
  const fileUri = `${FileSystem.documentDirectory}mark_${timestamp}.xlsx`;

  await FileSystem.writeAsStringAsync(fileUri, excelBinary, { encoding: FileSystem.EncodingType.Base64 });
  await Sharing.shareAsync(fileUri);
};