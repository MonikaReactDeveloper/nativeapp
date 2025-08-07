// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { exportDataToFile } from '../utils/exportUtils';
// import { useMapContext } from '../Context/MapContext';

// const CustomDrawerContent = (props) => {
//   const {
//     countryCategoryMap,
//     countryCounts,
//     legendLabels,
//   } = useMapContext();

//   const handleSave = async () => {
//     await exportDataToFile(countryCategoryMap, countryCounts, legendLabels);
//   };
//   return (
//     <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
//       <DrawerItemList {...props} />

//       <View style={styles.buttonContainer}>
        
//        <TouchableOpacity
//           style={[styles.button, styles.blue]}
//         onPress={() => exportDataToFile(countryCategoryMap, countryCounts, legendLabels)}
//         >
//           <Icon name="lock" size={16} color="#fff" />
//           <Text style={styles.text} >Save</Text>
//         </TouchableOpacity>

//         <TouchableOpacity style={[styles.button, styles.orange]}>
//           <Icon name="upload" size={16} color="#fff" />
//           <Text style={styles.text}>Import</Text>
//         </TouchableOpacity>
//          <TouchableOpacity style={[styles.button, styles.red]}>
//           <Icon name="trash" size={16} color="#fff" />
//           <Text style={styles.text}>Clear</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={[styles.button, styles.purple]}>
//           <Icon name="lock" size={16} color="#fff" />
//           <Text style={styles.text}>Excel</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={[styles.button, styles.yellow]}>
//           <Icon name="star" size={16} color="#fff" />
//           <Text style={styles.text}>BTN</Text>
//         </TouchableOpacity>

       

//       </View>
//     </DrawerContentScrollView>
//   );
// };

// export default CustomDrawerContent;

// const styles = StyleSheet.create({
//   buttonContainer: {
//     marginTop: 20,
//     // paddingHorizontal: 15,
//     gap: 10,
//     display:'flex',
//     flexDirection:'row',
//      flexWrap: 'wrap',
//   },
//   button: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderRadius: 10,
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     gap: 8,
//     width:100,
//   },
//   text: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//    purple:{backgroundColor: '#8F00FF'},
//    yellow: { backgroundColor: '#CAF00D' },
//    red: { backgroundColor: '#c32148' },
//    blue: { backgroundColor: '#008080' },
//   orange: { backgroundColor: '#ED2939' },
// });
// // import React from 'react';
// // import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// // import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
// // import Icon from 'react-native-vector-icons/FontAwesome';
// // import { useMap } from '../MapContext';
// // import XLSX from 'xlsx';
// // import * as FileSystem from 'expo-file-system';
// // import * as Sharing from 'expo-sharing';
// // import { Platform } from 'react-native';


// // const CustomDrawerContent = (props) => {
// //  const { categoryCountries } = useMapContext();

// //  const exportToExcel = async (categoryCountries) => {
// //   try {
// //     const exportData = [];

// //     // Defensive: check if categoryCountries exists and is an object
// //     if (
// //       typeof categoryCountries !== 'object' ||
// //       categoryCountries === null
// //     ) {
// //       throw new Error('categoryCountries is not a valid object');
// //     }

// //     Object.entries(categoryCountries).forEach(([category, countries]) => {
// //       if (typeof countries === 'object' && countries !== null) {
// //         Object.keys(countries).forEach((countryName) => {
// //           exportData.push({
// //             'Country Name': countryName,
// //             'List Name': category,
// //           });
// //         });
// //       }
// //     });

// //     if (exportData.length === 0) {
// //       alert('No countries marked yet to export.');
// //       return;
// //     }

// //     const worksheet = XLSX.utils.json_to_sheet(exportData);
// //     const workbook = XLSX.utils.book_new();
// //     XLSX.utils.book_append_sheet(workbook, worksheet, 'Countries');

// //     const wbout = XLSX.write(workbook, {
// //       type: 'base64',
// //       bookType: 'xlsx',
// //     });

// //     const filename = FileSystem.documentDirectory + 'MarkedCountries.xlsx';

// //     await FileSystem.writeAsStringAsync(filename, wbout, {
// //       encoding: FileSystem.EncodingType.Base64,
// //     });

// //     if (Platform.OS !== 'web' && (await Sharing.isAvailableAsync())) {
// //       await Sharing.shareAsync(filename);
// //     } else {
// //       alert('Excel file saved at: ' + filename);
// //     }
// //   } catch (error) {
// //     console.error('Error exporting Excel:', error);
// //     alert('Failed to export Excel: ' + error.message);
// //   }
// // };
// //   return (
// //     <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
// //       <DrawerItemList {...props} />

// //       <View style={styles.buttonContainer}>
// //         <TouchableOpacity style={[styles.button, styles.purple]} onPress={() => exportToExcel(categoryCountries)}>
// //           <Icon name="lock" size={16} color="#fff" />
// //           <Text style={styles.text}>Excel</Text>
// //         </TouchableOpacity>
// //         <TouchableOpacity style={[styles.button, styles.yellow]}>
// //           <Icon name="star" size={16} color="#fff" />
// //           <Text style={styles.text}>BTN</Text>
// //         </TouchableOpacity>

// //         <TouchableOpacity style={[styles.button, styles.red]}>
// //           <Icon name="trash" size={16} color="#fff" />
// //           <Text style={styles.text}>Clear</Text>
// //         </TouchableOpacity>

// //         <TouchableOpacity style={[styles.button, styles.blue]}>
// //           <Icon name="lock" size={16} color="#fff" />
// //           <Text style={styles.text}>Save</Text>
// //         </TouchableOpacity>

// //         <TouchableOpacity style={[styles.button, styles.orange]}>
// //           <Icon name="upload" size={16} color="#fff" />
// //           <Text style={styles.text}>Import</Text>
// //         </TouchableOpacity>
// //       </View>
// //     </DrawerContentScrollView>
// //   );
// // };

// // export default CustomDrawerContent;

// // const styles = StyleSheet.create({
// //   buttonContainer: {
// //     marginTop: 20,
// //     // paddingHorizontal: 15,
// //     gap: 10,
// //     display:'flex',
// //     flexDirection:'row',
// //      flexWrap: 'wrap',
// //   },
// //   button: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     borderRadius: 10,
// //     paddingVertical: 6,
// //     paddingHorizontal: 12,
// //     gap: 8,
// //     width:100,
// //   },
// //   text: {
// //     color: '#fff',
// //     fontWeight: 'bold',
// //   },
// //   purple:{backgroundColor: '#8F00FF'},
// //   yellow: { backgroundColor: '#CAF00D' },
// //   red: { backgroundColor: '#c32148' },
// //   blue: { backgroundColor: '#008080' },
// //   orange: { backgroundColor: '#ED2939' },
// // });
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/FontAwesome';
import { captureRef } from 'react-native-view-shot';
import * as Sharing from 'expo-sharing';
import {
  exportDataToFile,
  importDataFromFile,
  exportToExcel
} from '../utils/exportUtils';
import { useMapContext } from '../Context/MapContext';

const CustomDrawerContent = (props) => {
  const {
      webviewRef, viewShotRef,
    countryCategoryMap, setCountryCategoryMap,
    countryCounts, setCountryCounts, categoryCountries, setCategoryCountries, 
    legendLabels, setLegendLabels, countryToContinentMap, setCountryToContinentMap,categoryColors
  } = useMapContext();
const handleImport = async () => {
  try {
    const parsed = await importDataFromFile();

    if (!parsed || !parsed.countryCategoryMap) {
      Alert.alert("Invalid File", "No valid data found.");
      return;
    }

    // Update both once to prevent looping
    setCountryCategoryMap(parsed.countryCategoryMap);
    setCategoryCountries(parsed.countryCategoryMap);
    setCountryCounts(parsed.countryCounts || {});
    setLegendLabels(parsed.legendLabels || {});
    setCountryToContinentMap(parsed.countryToContinentMap || {});

    // Re-color countries
    Object.entries(parsed.countryCategoryMap).forEach(([category, countries]) => {
      const color = categoryColors[category] || '#C0C0C0';
      Object.keys(countries).forEach((country) => {
        if (webviewRef?.current) {
          webviewRef.current.injectJavaScript(`
            if (countryLayers["${country}"]) {
              countryLayers["${country}"].setStyle({ fillColor: "${color}" });
            }
            true;
          `);
        }
      });
    });

    Alert.alert("Success", "Data imported successfully");
  } catch (error) {
    console.error("Import failed:", error);
    Alert.alert("Import Failed", "Something went wrong.");
  }
};




// const handleClear = () => {
//   const clearedMap = {
//     'List 1 (Sun)': {},
//     'List 2 (Air)': {},
//     'List 3 (Trees)': {},
//     'List 4 (Land)': {},
//     'List 5 (Water)': {},
//     'List 6 (Core)': {},
//   };
//   setCountryCategoryMap(clearedMap);
//   setCategoryCountries(clearedMap); // ✅ reset list view
//   setCountryCounts({});
//   setLegendLabels({});

//   if (webviewRef?.current) {
//     webviewRef.current.injectJavaScript(`
//       if (typeof countryLayers === 'object') {
//         Object.values(countryLayers).forEach(layer => {
//           layer.setStyle({ fillColor: '#C0C0C0' });
//         });
//       }
//       true;
//     `);
//   }

//   Alert.alert("Cleared", "Map and data have been reset.");
// };



const handleSaveImage = async () => {
  try {
    if (viewShotRef?.current) {
      const uri = await viewShotRef.current.capture();
      await Sharing.shareAsync(uri);
    } else {
      Alert.alert("Error", "Map reference not available.");
    }
  } catch (error) {
    Alert.alert("Error", "Failed to capture map image.");
    console.error(error);
  }
};


  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <DrawerItemList {...props} />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.blue]}
          onPress={() => exportDataToFile(countryCategoryMap, countryCounts, legendLabels, countryToContinentMap)}

        >
          <Icon name="save" size={16} color="#fff" />
          <Text style={styles.text}>Save</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.orange]}
          onPress={handleImport}
        >
          <Icon name="upload" size={16} color="#fff" />
          <Text style={styles.text}>Import</Text>
        </TouchableOpacity>

     

        <TouchableOpacity
          style={[styles.button, styles.purple]}
          onPress={() => exportToExcel(countryCategoryMap, countryToContinentMap)}

        >
          <Icon name="file-excel-o" size={16} color="#fff" />
          <Text style={styles.text}>Excel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.yellow]}
          onPress={handleSaveImage}
        >
          <Icon name="camera" size={16} color="#fff" />
          <Text style={styles.text}>Capture</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {

    display:'flex',
    flexDirection:'row',
    flexWrap:'wrap',
    padding: 10,
    gap:10,
    borderTopWidth: 1,
    borderColor: '#ccc',
   
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
    padding:10,
    paddingHorizontal:15,
    borderRadius: 6,
  },
  text: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 14,
  },
  blue: { backgroundColor: '#3498db' },
  orange: { backgroundColor: '#e67e22' },
  red: { backgroundColor: '#e74c3c' },
  purple: { backgroundColor: '#8e44ad' },
  yellow: { backgroundColor: '#f1c40f' },
});

export default CustomDrawerContent;
