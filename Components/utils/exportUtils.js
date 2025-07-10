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

// Save JSON
export const exportDataToFile = async (mapData, counts, labels) => {
  const data = {
    countryCategoryMap: mapData,
    countryCounts: counts,
    legendLabels: labels,
  };

  const json = JSON.stringify(data, null, 2);
  const fileUri = `${FileSystem.documentDirectory}mapData.json`;
  await FileSystem.writeAsStringAsync(fileUri, json);
  await Sharing.shareAsync(fileUri);
};

// Import JSON
export const importDataFromFile = async () => {
  const result = await DocumentPicker.getDocumentAsync({ type: 'application/json' });

  if (result.type === 'success') {
    const content = await FileSystem.readAsStringAsync(result.uri);
    return JSON.parse(content);
  }
  return null;
};

// Export to Excel
export const exportToExcel = async (mapData) => {
  const dataArray = [];

  Object.keys(mapData).forEach((category) => {
    Object.entries(mapData[category]).forEach(([country, count]) => {
      dataArray.push({ Category: category, Country: country, Count: count });
    });
  });

  const worksheet = XLSX.utils.json_to_sheet(dataArray);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "MapData");

  const excelBinary = XLSX.write(workbook, { type: 'base64', bookType: 'xlsx' });
  const fileUri = `${FileSystem.documentDirectory}mapData.xlsx`;

  await FileSystem.writeAsStringAsync(fileUri, excelBinary, { encoding: FileSystem.EncodingType.Base64 });
  await Sharing.shareAsync(fileUri);
};
