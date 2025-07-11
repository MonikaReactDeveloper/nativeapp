
// import React, { useRef, useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
// import { WebView } from 'react-native-webview';
// import { RadioButton } from 'react-native-paper';
// import { useWindowDimensions } from 'react-native';

// const categoryColors = {
//   'List 1 (Sun)': '#fbc276',
//   'List 2 (Air)': '#FFFFFF',
//   'List 3 (Trees)': '#66cc66',
//   'List 4 (Land)': '#ffff66',
//   'List 5 (Water)': '#b3e0ff',
//   'List 6 (Core)': '#ff3333'
// };

// const MapScreen = ({ navigation }) => {
//   const webviewRef = useRef();
//    const { width, height } = useWindowDimensions();
//   const isPortrait = height >= width;
//   const [selectedOption, setSelectedOption] = useState('category');
//   const [search, setSearch] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('List 1 (Sun)');
//   const continents = ['Asia', 'Africa', 'Europe', 'North America', 'South America', 'Australia'];
//   const [categoryCountries, setCategoryCountries] = useState({
//     'List 1 (Sun)': [],
//     'List 2 (Air)': [],
//     'List 3 (Trees)': [],
//     'List 4 (Land)': [],
//     'List 5 (Water)': [],
//     'List 6 (Core)': []
//   });

//   const handleCategoryClick = (category) => {
//     setSelectedCategory(category);
//     const color = categoryColors[category];
//     webviewRef.current.injectJavaScript(`selectCategory(${JSON.stringify(category)}, ${JSON.stringify(color)}); true;`);
//   };

//   const handleMessage = (event) => {
//     const data = JSON.parse(event.nativeEvent.data);
//     if (data.type === 'COUNTRY_SELECTED') {
//       const { country, category } = data;
//       setCategoryCountries((prev) => {
//         const updated = { ...prev };
//         if (!updated[category].includes(country)) {
//           updated[category] = [...updated[category], country];
//         }
//         return updated;
//       });
//     }
//   };
//  const leafletHTML= `<!DOCTYPE html>
// <html>
// <head>
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
//   <style>
//     html, body, #map {
//       height: 100%;
//       margin: 0;
//       background-color: white; /* white background */
//     }
//     .map-button {
//       position: absolute;
//       z-index: 1000;
//       background: #fff;
//       border: 1px solid #ccc;
//       padding: 5px 10px;
//       font-size: 18px;
//       cursor: pointer;
//       border-radius: 5px;
//     }
//     #zoomIn { top: 10px; left: 10px; }
//     #zoomOut { top: 50px; left: 10px; }
//     #reset { top: 90px; left: 10px; }
//   </style>
// </head>
// <body>
//   <div id="map"></div>
//   <div id="zoomIn" class="map-button">+</div>
//   <div id="zoomOut" class="map-button">−</div>
//   <div id="reset" class="map-button">=</div>

//   <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
//   <script>
//     const initialCenter = [25, 0];
//     const initialZoom = 0;
//     let selectedCategory = 'List 1 (Sun)';
//     let selectedColor = '#fbc276'; // default color (Sun)

//     const map = L.map('map', {
//       zoomSnap: 0.1,
//       zoomDelta: 0.1,
//       maxZoom: 10,
//       minZoom: 1
//     }).setView(initialCenter, initialZoom);

//     // Optional: skip tileLayer if you want only vector map with background color
//     // or you can use an empty tile layer
//     // Example:
//     L.tileLayer('', { attribution: '' }).addTo(map);

//     const countryLayers = {};

//     function style(feature) {
//       return {
//         fillColor: '#C0C0C0',
//         color: 'white',
//         weight: 1,
//         fillOpacity: 1
//       };
//     }

//     function onEachFeature(feature, layer) {
//       const countryName = feature.properties.ADMIN;
//       countryLayers[countryName] = layer;

//       layer.on('click', function () {
//         this.setStyle({ fillColor: selectedColor });

//         if (window.ReactNativeWebView) {
//           window.ReactNativeWebView.postMessage(JSON.stringify({
//             type: 'COUNTRY_SELECTED',
//             country: countryName,
//             category: selectedCategory
//           }));
//         }
//       });
//     }

//     fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
//       .then(res => res.json())
//       .then(data => {
//         L.geoJSON(data, {
//           style: style,
//           onEachFeature: onEachFeature
//         }).addTo(map);
//       });

//     function selectCategory(category, color) {
//       selectedCategory = category;
//       selectedColor = color;
//     }

//     window.selectCategory = selectCategory;

//     // Zoom buttons
//     document.getElementById('zoomIn').onclick = () => map.setZoom(map.getZoom() + 0.3);
//     document.getElementById('zoomOut').onclick = () => map.setZoom(map.getZoom() - 0.3);
//     document.getElementById('reset').onclick = () => map.setView(initialCenter, initialZoom);
//   </script>
// </body>
// </html>`

//   return (<>
    
//     <View style={styles.container}>
     

//       {isPortrait ? (
//         <>
//          {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.openDrawer()}>
//           <Image source={require('../Screens/assets/logo.png')} style={styles.logo} />
//         </TouchableOpacity>
//         <Text style={styles.banner}>I am Mark</Text>
//       </View>
//           {/* WebView Map */}
//           <View style={styles.map}>
//             <WebView
//               ref={webviewRef}
//               originWhitelist={['*']}
//               onMessage={handleMessage}
//               javaScriptEnabled
//               source={{ html: leafletHTML }} // Replace with leafletHTML
//             />
//           </View>

//          <View style={styles.searchAndToggleRow}>
 

//   <View style={styles.radioOption}>
//     <RadioButton
//       value="category"
//       status={selectedOption === 'category' ? 'checked' : 'unchecked'}
//       onPress={() => setSelectedOption('category')}
//     />
//     <Text>By Category</Text>
//   </View>

//   <View style={styles.radioOption}>
//     <RadioButton
//       value="continent"
//       status={selectedOption === 'continent' ? 'checked' : 'unchecked'}
//       onPress={() => setSelectedOption('continent')}
//     />
//     <Text>By Continent</Text>
//   </View>
//    <TextInput
//     placeholder="Search"
//     value={search}
//     onChangeText={setSearch}
//     style={styles.searchBar}
//   />
// </View>

//          <ScrollView style={styles.scrollList}>
//   {selectedOption === 'category'
//     ? Object.keys(categoryColors).map((category, index) => (
//         <View
//           key={index}
//           style={[
//             styles.listItem,
//             { backgroundColor: selectedCategory === category ? '#ddd' : '#fff' },
//           ]}
//         >
//           <TouchableOpacity
//             onPress={() => handleCategoryClick(category)}
//             style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
//           >
//             <View
//               style={{
//                 width: 15,
//                 height: 15,
//                 backgroundColor: categoryColors[category],
//                 marginRight: 10,
//               }}
//             />
//             <Text>{category}</Text>
//           </TouchableOpacity>

//           {Array.isArray(categoryCountries[category]) &&
//             categoryCountries[category].length > 0 &&
//             selectedCategory === category && (
//               <View style={{ marginTop: 5, marginLeft: 25 }}>
//                 {categoryCountries[category].map((country, i) => (
//                   <Text key={i} style={{ fontSize: 12 }}>• {country}</Text>
//                 ))}
//               </View>
//             )}
//         </View>
//       ))
//     : continents.map((continent, index) => (
//         <View key={index} style={styles.listItem}>
//           <TouchableOpacity
//             onPress={() => {
//               setSelectedCategory(continent);
//               webviewRef.current.injectJavaScript(
//                 `selectCategory(${JSON.stringify(continent)}, '#ccc'); true;`
//               );
//             }}
//             style={{ flexDirection: 'row', alignItems: 'center' }}
//           >
//             <Text>{continent}</Text>
//           </TouchableOpacity>
//         </View>
//       ))}
// </ScrollView>

//             <View style={styles.addarea}>
//               <View style={styles.add}>
      
//         <Text  >This is ads area</Text>
//       </View>
//             <View style={styles.add}>
      
//         <Text >This is ads area</Text>
//       </View>
//           </View> 
//         </>
//       ) : (
//         <View style={styles.landscapeWrapper}>
         
//           <View style={styles.mapLandscape}>
//              {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.openDrawer()}>
//           <Image source={require('../Screens/assets/logo.png')} style={styles.logo} />
//         </TouchableOpacity>
//         <Text style={styles.banner}>I am Mark</Text>
//       </View>
//             <WebView
//               ref={webviewRef}
//               originWhitelist={['*']}
//               onMessage={handleMessage}
//               javaScriptEnabled
//               source={{ html: leafletHTML }} // Replace with leafletHTML
//             />
//           </View>

//           {/* Right Pane */}
//           <View style={styles.rightPane}>
//              <View style={styles.searchAndToggleRow}>
 

//   <View style={styles.radioOption}>
//     <RadioButton
//       value="category"
//       status={selectedOption === 'category' ? 'checked' : 'unchecked'}
//       onPress={() => setSelectedOption('category')}
//     />
//     <Text>By Category</Text>
//   </View>

//   <View style={styles.radioOption}>
//     <RadioButton
//       value="continent"
//       status={selectedOption === 'continent' ? 'checked' : 'unchecked'}
//       onPress={() => setSelectedOption('continent')}
//     />
//     <Text>By Continent</Text>
//   </View>
//    <TextInput
//     placeholder="Search"
//     value={search}
//     onChangeText={setSearch}
//     style={styles.searchBar}
//   />
// </View>
//             {/* List */}
//           <ScrollView style={styles.scrollList}>
//   {selectedOption === 'category'
//     ? Object.keys(categoryColors).map((category, index) => (
//         <View
//           key={index}
//           style={[
//             styles.listItem,
//             { backgroundColor: selectedCategory === category ? '#ddd' : '#fff' },
//           ]}
//         >
//           <TouchableOpacity
//             onPress={() => handleCategoryClick(category)}
//             style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
//           >
//             <View
//               style={{
//                 width: 15,
//                 height: 15,
//                 backgroundColor: categoryColors[category],
//                 marginRight: 10,
//               }}
//             />
//             <Text>{category}</Text>
//           </TouchableOpacity>

//           {Array.isArray(categoryCountries[category]) &&
//             categoryCountries[category].length > 0 &&
//             selectedCategory === category && (
//               <View style={{ marginTop: 5, marginLeft: 25 }}>
//                 {categoryCountries[category].map((country, i) => (
//                   <Text key={i} style={{ fontSize: 12 }}>• {country}</Text>
//                 ))}
//               </View>
//             )}
//         </View>
//       ))
//     : continents.map((continent, index) => (
//         <View key={index} style={styles.listItem}>
//           <TouchableOpacity
//             onPress={() => {
//               setSelectedCategory(continent);
//               webviewRef.current.injectJavaScript(
//                 `selectCategory(${JSON.stringify(continent)}, '#ccc'); true;`
//               );
//             }}
//             style={{ flexDirection: 'row', alignItems: 'center' }}
//           >
//             <Text>{continent}</Text>
//           </TouchableOpacity>
//         </View>
//       ))}
// </ScrollView>

//               <View style={styles.addarea}>
//               <View style={styles.add}>
      
//         <Text  >This is ads area</Text>
//       </View>
//             <View style={styles.add}>
      
//         <Text >This is ads area</Text>
//       </View>
//           </View> 
//           </View>
//         </View>
//       )}
//     </View>
//  </> );
// };

// export default MapScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   header: {
//     marginTop: 40,
//     flexDirection: 'row',
//     padding: 10,
//     backgroundColor: '#f0f0f0',
//     alignItems: 'center',
//   },
//   logo: {
//     width: 40,
//     height: 40,
//     resizeMode: 'contain',
//   },
//   banner: {
//     marginLeft: 10,
//     fontSize: 18,
//     fontWeight: 'bold',
//     backgroundColor: '#D177F6',
//     color: 'white',
//     paddingHorizontal: 20,
//     paddingVertical: 5,
//     borderRadius: 6,
//     flex: 1,
//     textAlign: 'center',
//   },
//   map: {
//     height: 320,
//   },
//   mapLandscape: {
//     flex: 1,
//     height: '100%',
//   },
//   landscapeWrapper: {
//     flex: 1,
//     flexDirection: 'row',
//   },
//   rightPane: {
//     width: '48%',
//     marginTop: 50,
//   },
//   searchAndToggleRow: {
//   flexDirection: 'row',
//   alignItems: 'center',
//   justifyContent: 'space-between',
//   marginBottom: 10,
//   gap: 10, // Optional for spacing if using newer React Native versions
// },

// searchBar: {
//   backgroundColor: '#eee',
//   padding: 8,
//   borderRadius: 8,
//   flex: 1, // Allow it to take remaining space
//   marginRight: 10,
// },

// radioOption: {
//   flexDirection: 'row',
//   alignItems: 'center',
//   marginHorizontal: 5,
// },

 
//   radioGroup: {
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',
//     marginBottom: 10,
//   },
  
//   scrollList: {
//     flex: 1,
//   },
//   listItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     padding: 5,
//     backgroundColor: '#f5f5f5',
//     marginVertical: 4,
//     borderRadius: 6,
//   },
//   addarea:{
//     display:'flex',
//     justifyContent:'space-between',
//     flexDirection:'row'
//   },
//   add:{
//     backgroundColor:'#F1BEB5',
  
//     padding:20,
//   borderRadius:5,
//   width:220
 
//   }
// });

// import React, { useRef, useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
// import { WebView } from 'react-native-webview';
// import { RadioButton } from 'react-native-paper';
// import { useWindowDimensions } from 'react-native';


// const categoryColors = {
//   'List 1 (Sun)': '#fbc276',
//   'List 2 (Air)': '#FFFFFF',
//   'List 3 (Trees)': '#66cc66',
//   'List 4 (Land)': '#ffff66',
//   'List 5 (Water)': '#b3e0ff',
//   'List 6 (Core)': '#ff3333'
// };

// const MapScreen = ({ navigation }) => {
// //  const { categoryCountry, setCategoryCountry } = useMapContext();
//   const webviewRef = useRef();
//   const { width, height } = useWindowDimensions();
//   const isPortrait = height >= width;

//   const [selectedOption, setSelectedOption] = useState('category');
//   const [search, setSearch] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('List 1 (Sun)');
//   const continents = ['Asia', 'Africa', 'Europe', 'North America', 'South America', 'Australia'];
//   const [categoryCountries, setCategoryCountries] = useState({
//     'List 1 (Sun)': {},
//     'List 2 (Air)': {},
//     'List 3 (Trees)': {},
//     'List 4 (Land)': {},
//     'List 5 (Water)': {},
//     'List 6 (Core)': {},
//   });

//   const handleCategoryClick = (category) => {
//     setSelectedCategory(category);
//     const color = categoryColors[category];
//     webviewRef.current.injectJavaScript(`selectCategory(${JSON.stringify(category)}, ${JSON.stringify(color)}); true;`);
//   };

//   const handleMessage = (event) => {
//     const data = JSON.parse(event.nativeEvent.data);
//     if (data.type === 'COUNTRY_SELECTED') {
//       const { country, category } = data;

//       setCategoryCountries((prev) => {
//         const updated = { ...prev };
//         if (!updated[category][country]) {
//           updated[category][country] = 1;
//         } else {
//           updated[category][country] += 1;
//         }
//         return { ...updated };
//       });
//     }
//   };

//   const leafletHTML = `<!DOCTYPE html>
// <html>
// <head>
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
//   <style>
//     html, body, #map { height: 100%; margin: 0; background-color: white; }
//     .map-button {
//       position: absolute;
//       z-index: 1000;
//       background: #fff;
//       border: 1px solid #ccc;
//       padding: 5px 10px;
//       font-size: 18px;
//       cursor: pointer;
//       border-radius: 5px;
//     }
//     #zoomIn { top: 10px; left: 10px; }
//     #zoomOut { top: 50px; left: 10px; }
//     #reset { top: 90px; left: 10px; }
//   </style>
// </head>
// <body>
//   <div id="map"></div>
//   <div id="zoomIn" class="map-button">+</div>
//   <div id="zoomOut" class="map-button">−</div>
//   <div id="reset" class="map-button">=</div>

//   <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
//   <script>
//     const initialCenter = [25, 0];
//     const initialZoom = 0;
//     let selectedCategory = 'List 1 (Sun)';
//     let selectedColor = '#fbc276';

//     const map = L.map('map', {
//       zoomSnap: 0.1,
//       zoomDelta: 0.1,
//       maxZoom: 10,
//       minZoom: 1
//     }).setView(initialCenter, initialZoom);

//     L.tileLayer('', { attribution: '' }).addTo(map);

//     const countryLayers = {};

//     function style(feature) {
//       return { fillColor: '#C0C0C0', color: 'white', weight: 1, fillOpacity: 1 };
//     }

//    function onEachFeature(feature, layer) {
//   const countryName = feature.properties.name || feature.properties.ADMIN || feature.properties.NAME || 'Unknown';
//   countryLayers[countryName] = layer;

//   layer.on('click', function () {
//     this.setStyle({ fillColor: selectedColor });

//     if (window.ReactNativeWebView) {
//       window.ReactNativeWebView.postMessage(JSON.stringify({
//         type: 'COUNTRY_SELECTED',
//         country: countryName,
//         category: selectedCategory
//       }));
//     }
//   });
// }


//     fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
//       .then(res => res.json())
//       .then(data => {
//         L.geoJSON(data, { style: style, onEachFeature: onEachFeature }).addTo(map);
//       });

//     function selectCategory(category, color) {
//       selectedCategory = category;
//       selectedColor = color;
//     }

//     window.selectCategory = selectCategory;

//     document.getElementById('zoomIn').onclick = () => map.setZoom(map.getZoom() + 0.3);
//     document.getElementById('zoomOut').onclick = () => map.setZoom(map.getZoom() - 0.3);
//     document.getElementById('reset').onclick = () => map.setView(initialCenter, initialZoom);
//   </script>
// </body>
// </html>`;

//   const renderCategoryList = () => (
//     Object.keys(categoryColors).map((category, index) => (
//       <View
//         key={index}
//         style={[
//           styles.listItem,
//           { backgroundColor: selectedCategory === category ? '#ddd' : '#fff' },
//         ]}
//       >
//         <TouchableOpacity
//           onPress={() => handleCategoryClick(category)}
//           style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
//         >
//           <View style={{
//             width: 15,
//             height: 15,
//             backgroundColor: categoryColors[category],
//             marginRight: 10,
//           }} />
//           <Text>{category}</Text>
//         </TouchableOpacity>

//         {/* Show country list with count */}
//         {selectedCategory === category &&
//           Object.entries(categoryCountries[category]).map(([country, count], i) => (
//             <View key={i} style={{ marginLeft: 30, marginTop: 4, flexDirection: 'row', alignItems: 'center' }}>
//               <Text style={{
//                 backgroundColor: categoryColors[category],
//                 paddingHorizontal: 6,
//                 paddingVertical: 2,
//                 borderRadius: 4,
//                 fontWeight: 'bold',
//                 fontSize: 10,
//                 marginRight: 6,
//                 color: '#000'
//               }}>
//                 {String(count).padStart(2, '0')}
//               </Text>
//               <Text style={{ fontSize: 12 }}>{country}</Text>
//             </View>
//           ))}
//       </View>
//     ))
//   );

//   const renderContinentList = () => (
//     continents.map((continent, index) => (
//       <View key={index} style={styles.listItem}>
//         <TouchableOpacity
//           onPress={() => {
//             setSelectedCategory(continent);
//             webviewRef.current.injectJavaScript(
//               `selectCategory(${JSON.stringify(continent)}, '#ccc'); true;`
//             );
//           }}
//           style={{ flexDirection: 'row', alignItems: 'center' }}
//         >
//           <Text>{continent}</Text>
//         </TouchableOpacity>
//       </View>
//     ))
//   );

//   const renderMainContent = () => {
//   if (isPortrait) {
//     return (
//       <>
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.openDrawer()}>
//             <Image source={require('../Screens/assets/logo.png')} style={styles.logo} />
//           </TouchableOpacity>
//           <Text style={styles.banner}>I am Mark</Text>
//         </View>

//         <View style={styles.map}>
//           <WebView
//             ref={webviewRef}
//             originWhitelist={['*']}
//             onMessage={handleMessage}
//             javaScriptEnabled
//             source={{ html: leafletHTML }}
//           />
//         </View>

//         <View style={styles.searchAndToggleRow}>
//           <View style={styles.radioOption}>
//             <RadioButton
//               value="category"
//               status={selectedOption === 'category' ? 'checked' : 'unchecked'}
//               onPress={() => setSelectedOption('category')}
//             />
//             <Text>By Category</Text>
//           </View>

//           <View style={styles.radioOption}>
//             <RadioButton
//               value="continent"
//               status={selectedOption === 'continent' ? 'checked' : 'unchecked'}
//               onPress={() => setSelectedOption('continent')}
//             />
//             <Text>By Continent</Text>
//           </View>

//           <TextInput
//             placeholder="Search"
//             value={search}
//             onChangeText={setSearch}
//             style={styles.searchBar}
//           />
//         </View>

//         <ScrollView style={styles.scrollList}>
//           {selectedOption === 'category' ? renderCategoryList() : renderContinentList()}
//         </ScrollView>

//         <View style={styles.addarea}>
//           <View style={styles.add}><Text>This is ads area</Text></View>
//           <View style={styles.add}><Text>This is ads area</Text></View>
//         </View>
//       </>
//     );
//   } else {
//     // LANDSCAPE view
//     return (
//       <View style={styles.landscapeWrapper}>
//         {/* LEFT SIDE */}
//         <View style={styles.leftPane}>
//           <View style={styles.header}>
//             <TouchableOpacity onPress={() => navigation.openDrawer()}>
//               <Image source={require('../Screens/assets/logo.png')} style={styles.logo} />
//             </TouchableOpacity>
//             <Text style={styles.banner}>I am Mark</Text>
//           </View>

//           <View style={styles.mapLandscape}>
//             <WebView
//               ref={webviewRef}
//               originWhitelist={['*']}
//               onMessage={handleMessage}
//               javaScriptEnabled
//               source={{ html: leafletHTML }}
//             />
//           </View>
//         </View>

//         {/* RIGHT SIDE */}
//         <View style={styles.rightPane}>
//           <View style={styles.searchAndToggleRow}>
//             <View style={styles.radioOption}>
//               <RadioButton
//                 value="category"
//                 status={selectedOption === 'category' ? 'checked' : 'unchecked'}
//                 onPress={() => setSelectedOption('category')}
//               />
//               <Text>By Category</Text>
//             </View>

//             <View style={styles.radioOption}>
//               <RadioButton
//                 value="continent"
//                 status={selectedOption === 'continent' ? 'checked' : 'unchecked'}
//                 onPress={() => setSelectedOption('continent')}
//               />
//               <Text>By Continent</Text>
//             </View>

//             <TextInput
//               placeholder="Search"
//               value={search}
//               onChangeText={setSearch}
//               style={styles.searchBar}
//             />
//           </View>

//           <ScrollView style={styles.scrollList}>
//             {selectedOption === 'category' ? renderCategoryList() : renderContinentList()}
//           </ScrollView>

//           <View style={styles.addarea}>
//             <View style={styles.add}><Text>This is ads area</Text></View>
//             <View style={styles.add}><Text>This is ads area</Text></View>
//           </View>
//         </View>
//       </View>
//     );
//   }
// };


// return <View style={styles.container}>{renderMainContent()}</View>;

// };

// export default MapScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   header: {
//     marginTop: 40,
//     flexDirection: 'row',
//     padding: 10,
//     backgroundColor: '#f0f0f0',
//     alignItems: 'center',
//   },
//   logo: { width: 40, height: 40, resizeMode: 'contain' },
//   banner: {
//     marginLeft: 10,
//     fontSize: 18,
//     fontWeight: 'bold',
//     backgroundColor: '#D177F6',
//     color: 'white',
//     paddingHorizontal: 20,
//     paddingVertical: 5,
//     borderRadius: 6,
//     flex: 1,
//     textAlign: 'center',
//   },
//   map: { height: 320 },
//   landscapeWrapper: {
//   flex: 1,
//   flexDirection: 'row',
//   padding: 10,
//   gap: 10,
// },
// leftPane: {
//   width: '52%',
//   paddingRight: 5,
// },
// rightPane: {
//   width: '48%',
//   paddingLeft: 5,
// },
// mapLandscape: {
//   flex: 1,
//   borderWidth: 1,
//   borderColor: '#ccc',
//   marginTop: 10,
// },
// scrollList: {
//   flex: 1,
//   marginTop: 10,
// },

  
//   searchAndToggleRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//     gap: 10,
//   },
//   searchBar: {
//     backgroundColor: '#eee',
//     padding: 8,
//     borderRadius: 8,
//     flex: 1,
//     marginRight: 10,
//   },
//   radioOption: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginHorizontal: 5,
//   },

//   listItem: {
//     flexDirection: 'column',
//     alignItems: 'flex-start',
//     padding: 5,
//     backgroundColor: '#f5f5f5',
//     marginVertical: 4,
//     borderRadius: 6,
//   },
//   addarea: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     flexDirection: 'row',
//   },
//   add: {
//     backgroundColor: '#F1BEB5',
//     padding: 20,
//     borderRadius: 5,
//     width: 220,
//   },
// });

// import React, { useRef, useState,useEffect } from 'react';
// import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
// import { WebView } from 'react-native-webview';
// import { RadioButton } from 'react-native-paper';
// import { useWindowDimensions } from 'react-native';
// import { useMapContext } from '../Context/MapContext';
// import ViewShot from 'react-native-view-shot';
// import { loadContinentData } from '../utils/loadContinentData';

// const categoryColors = {
//   'List 1 (Sun)': '#fbc276',
//   'List 2 (Air)': '#FFFFFF',
//   'List 3 (Trees)': '#66cc66',
//   'List 4 (Land)': '#ffff66',
//   'List 5 (Water)': '#1338BE',
//   'List 6 (Core)': '#ff3333'
// };

// const MapScreen = ({ navigation }) => {
// //  const { categoryCountry, setCategoryCountry } = useMapContext();
// const { countryCategoryMap, setCountryCategoryMap, countryCounts, setCountryCounts, legendLabels, setLegendLabels } = useMapContext();
// const viewShotRef = useRef();
//   const webviewRef = useRef();
//   const { width, height } = useWindowDimensions();
//   const isPortrait = height >= width;
// const[allCountryNames,setAllCountryNames]=useState([]);
// const [filteredCountries, setFilteredCountries] = useState([]);
//  const [isSorted, setIsSorted] = useState(false);
// const [countryCoordinates, setCountryCoordinates] = useState({});
//   const [selectedOption, setSelectedOption] = useState('category');
//   const [search, setSearch] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('List 1 (Sun)');
//    const [continentCountryMap, setContinentCountryMap] = useState({});
//   const [countryClickCounts, setCountryClickCounts] = useState({});
//   const [selectedContinent, setSelectedContinent] = useState(null);


//   const continents = ['Asia', 'Africa', 'Europe', 'North America', 'South America', 'Australia'];
//   const [categoryCountries, setCategoryCountries] = useState({
//     'List 1 (Sun)': {},
//     'List 2 (Air)': {},
//     'List 3 (Trees)': {},
//     'List 4 (Land)': {},
//     'List 5 (Water)': {},
//     'List 6 (Core)': {},
//   });
//   const { images } = useMapContext();
//   const handleSort = () => {
//     setIsSorted(prev => !prev);
//   };

//   const handleCategoryClick = (category) => {
//     setSelectedCategory(category);
//     const color = categoryColors[category];
//     webviewRef.current.injectJavaScript(`selectCategory(${JSON.stringify(category)}, ${JSON.stringify(color)}); true;`);
//   };
// useEffect(() => {
//   const fetchData = async () => {
//     const data = await loadContinentData();
//     setContinentCountryMap(data);
//   };
//   fetchData();
// }, []);


//   const incrementCountryCount = (country) => {
//     setCountryClickCounts(prev => ({
//       ...prev,
//       [country]: (prev[country] || 0) + 1
//     }));

//     if (webviewRef?.current) {
//       webviewRef.current.injectJavaScript(`
//         markCountry(${JSON.stringify(country)});
//         true;
//       `);
//     }
//   };
//   const handleMessage = (event) => {
//     const data = JSON.parse(event.nativeEvent.data);
//     if (data.type === 'COUNTRY_SELECTED') {
//       const { country, category } = data;

//       setCategoryCountries((prev) => {
//         const updated = { ...prev };
//         if (!updated[category][country]) {
//           updated[category][country] = 1;
//         } else {
//           updated[category][country] += 1;
//         }
//         return { ...updated };
//       });
//     }
//     if (data.type === 'COUNTRY_LIST') {
//   const countryNames = data.countries.map(c => c.name);
//   const coordinatesMap = {};

//   data.countries.forEach(c => {
//     coordinatesMap[c.name] = c.coords;
//   });

//   setAllCountryNames(countryNames);
//   setCountryCoordinates(coordinatesMap);
// }

//   };
//   useEffect(() => {
//   setCountryCategoryMap(categoryCountries);

//   // Optional: auto-calculate counts per country
//   const newCounts = {};
//   Object.keys(categoryCountries).forEach((category) => {
//     Object.entries(categoryCountries[category]).forEach(([country, count]) => {
//       newCounts[country] = (newCounts[country] || 0) + count;
//     });
//   });
//   setCountryCounts(newCounts);

//   // Set colors used
//   const labels = {};
//   Object.keys(categoryCountries).forEach((category) => {
//     labels[category] = categoryColors[category];
//   });
//   setLegendLabels(labels);

// }, [categoryCountries]);

// useEffect(() => {
//   if (search.trim() === '') {
//     setFilteredCountries([]);
//   } else {
//     const filtered = allCountryNames.filter(name =>
//       name.toLowerCase().includes(search.toLowerCase())
//     );
//     setFilteredCountries(filtered);
//   }
// }, [search]);
// const handleAddCountry = (countryName) => {
//   setCategoryCountries(prev => {
//     const updated = { ...prev };
//     if (!updated[selectedCategory][countryName]) {
//       updated[selectedCategory][countryName] = 1;
//     } else {
//       updated[selectedCategory][countryName]++;
//     }
//     return updated;
//   });

//   setSearch('');
//   setFilteredCountries([]);
// };

// const handleZoomToCountry = (countryName) => {
//   const coords = countryCoordinates[countryName];
//   if (coords) {
//     webviewRef.current.injectJavaScript(`
//       map.setView([${coords[0]}, ${coords[1]}], 4);
//       true;
//     `);
//   }
// };


//   const leafletHTML = `<!DOCTYPE html>
// <html>
// <head>
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
//   <style>
//     html, body, #map {
//       height: 100%;
//       margin: 0;
//       padding: 0;
//       background-color:#d4f1f9;
//     }
//     .map-button {
//       position: fixed;
//       z-index: 1000;
//       background: #fff;
//       border: 1px solid #ccc;
//       padding: 5px 10px;
//       font-size: 18px;
//       cursor: pointer;
//       border-radius: 5px;
//       left: 10px;
//     }
//     #zoomIn { bottom: 80px; }
//     #zoomOut { bottom: 50px; }
//     #reset { bottom: 20px; }

//     .leaflet-control-container .leaflet-control-attribution {
//       display: none;
//     }
//   </style>
// </head>
// <body>
//   <div id="map"></div>
//   <div id="zoomIn" class="map-button">+</div>
//   <div id="zoomOut" class="map-button">−</div>
//   <div id="reset" class="map-button">=</div>

//   <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
//   <script>
//     const initialCenter = [25, 0];
//     const initialZoom = 0;
//     let selectedCategory = 'List 1 (Sun)';
//     let selectedColor = '#fbc276';

//     const map = L.map('map', {
//       zoomSnap: 0.1,
//       zoomDelta: 0.1,
//       maxZoom: 10,
//       minZoom: 1,
//       attributionControl: false // disables leaflet logo attribution
//     }).setView(initialCenter, initialZoom);

//     // Empty tileLayer keeps background color visible
//     L.tileLayer('', {}).addTo(map);

//     const countryLayers = {};

//     function style(feature) {
//       return { fillColor: '#C0C0C0', color: 'white', weight: 1, fillOpacity: 1 };
//     }

//     fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
//       .then(res => res.json())
//       .then(data => {
//         const countryList = [];

//         L.geoJSON(data, {
//           style: style,
//           onEachFeature: (feature, layer) => {
//             const countryName = feature.properties.name || feature.properties.ADMIN || feature.properties.NAME || 'Unknown';
//             countryLayers[countryName] = layer;

//             layer.on('click', function () {
//               this.setStyle({ fillColor: selectedColor });

//               if (window.ReactNativeWebView) {
//                 window.ReactNativeWebView.postMessage(JSON.stringify({
//                   type: 'COUNTRY_SELECTED',
//                   country: countryName,
//                   category: selectedCategory
//                 }));
//               }
//             });

//             const latlng = layer.getBounds().getCenter();
//             countryList.push({ name: countryName, coords: [latlng.lat, latlng.lng] });
//           }
//         }).addTo(map);

//         if (window.ReactNativeWebView) {
//           window.ReactNativeWebView.postMessage(JSON.stringify({
//             type: 'COUNTRY_LIST',
//             countries: countryList
//           }));
//         }
//       });

//     function selectCategory(category, color) {
//       selectedCategory = category;
//       selectedColor = color;
//     }

//     window.selectCategory = selectCategory;

//     document.getElementById('zoomIn').onclick = () => map.setZoom(map.getZoom() + 0.3);
//     document.getElementById('zoomOut').onclick = () => map.setZoom(map.getZoom() - 0.3);
//     document.getElementById('reset').onclick = () => map.setView(initialCenter, initialZoom);
//   </script>
// </body>
// </html>`;

//   const renderCategoryList = () => (
//     Object.keys(categoryColors).map((category, index) => (
//       <View
//         key={index}
//         style={[
//           styles.listItem,
//           { backgroundColor: selectedCategory === category ? '#ddd' : '#fff' },
//         ]}
//       >
//         <View style={{display:'flex',justifyContent:'space-between',flexDirection:'row'}}>
//         <TouchableOpacity
//           onPress={() => handleCategoryClick(category)}
//           style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
//         >
//           <View style={{
//             width: 15,
//             height: 15,
//            borderWidth:1,
//             borderColor:'black',
//             backgroundColor: categoryColors[category],
//             marginRight: 10,
            
//           }} />
//           <Text>{category}</Text>
//         </TouchableOpacity>
// <TouchableOpacity
//             onPress={handleSort}
//             style={{
//               marginTop:0,
//               alignSelf: 'flex-end',
//               marginRight: 10,
//               marginBottom:10,
//               // marginBottom: 8,
//               paddingHorizontal: 5,
//               paddingVertical: 4,
//               backgroundColor: '#00AEEF',
//               borderRadius: 6,
//             }}
//           >
//             <Text style={{ color: '#fff', fontSize: 12, fontWeight: '600' }}>
//               {isSorted ? 'Unsort' : 'Sort A-Z'}
//             </Text>
//           </TouchableOpacity>
//           </View>
//         <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
//         {selectedCategory === category &&
//          (
//         <>
//           {/* Sort Button */}
          

//           {/* Country List */}
//           <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginLeft: 12 }}>
//             {Object.entries(categoryCountries[selectedCategory])
//               .sort(([a], [b]) => {
//                 if (!isSorted) return 0;
//                 return a.localeCompare(b);
//               })
//               .map(([country, count], i) => (
//                 <View
//                   key={i}
//                   style={{
//                     width: '33.33%',
//                     marginBottom: 8,
//                     flexDirection: 'row',
//                     alignItems: 'center',
//                   }}
//                 >
//                   <Text
//                     style={{
//                       backgroundColor: categoryColors[selectedCategory],
//                       paddingHorizontal: 6,
//                       paddingVertical: 2,
//                       borderRadius: 4,
//                       fontWeight: 'bold',
//                       fontSize: 10,
//                       marginRight: 6,
//                       color: '#000',
//                     }}
//                   >
//                     {String(count).padStart(2, '0')}
//                   </Text>
//                   <Text style={{ fontSize: 12 }}>{country}</Text>
//                 </View>
//               ))}
//           </View>
//         </>
//       )}
//       </View>
//       </View>
//     ))
//   );

//   const renderContinentList = () => (
//       <ScrollView contentContainerStyle={{ padding: 16 }}>
//       {Object.keys(continentCountryMap).map((continent, index) => (
//         <View key={index} style={styles.continentBlock}>
//           <TouchableOpacity onPress={() => setSelectedContinent(continent)}>
//             <Text style={styles.continentTitle}>{continent}</Text>
//           </TouchableOpacity>

//           {selectedContinent === continent && (
//             continentCountryMap[continent].map((country, i) => (
//               <TouchableOpacity
//                 key={`${continent}-${i}`}
//                 style={styles.countryButton}
//                 onPress={() => incrementCountryCount(country)}
//               >
//                 <View style={styles.countBox}>
//                   <Text style={styles.countText}>
//                     {(countryClickCounts[country] || 0).toString().padStart(2, '0')}
//                   </Text>
//                 </View>
//                 <Text style={styles.countryName}>{country}</Text>
//               </TouchableOpacity>
//             ))
//           )}
//         </View>
//       ))}
//     </ScrollView>
//   );

//   const renderMainContent = () => {
//   if (isPortrait) {
//     return (
//       <>
//         <View style={styles.header}>
//           <TouchableOpacity onPress={() => navigation.openDrawer()}>
//             <Image
//                      source={images.markLogo ? { uri: images.markLogo } : require('../Screens/assets/logo.png')}
//                      style={styles.logo}
//                    />
//           </TouchableOpacity>
//              {images.companyBanner ? (
//           <Image source={{ uri: images.companyBanner }} style={styles.bannerImage} />
//         ) : (
//           <Text style={styles.banner}>I am Mark</Text>
//         )}
//         </View>

//         <View style={styles.map}>
//           {/* <ViewShot ref={viewShotRef} options={{ format: 'jpg', quality: 0.9 }}> */}
//           <WebView
//             ref={webviewRef}
//             originWhitelist={['*']}
//             onMessage={handleMessage}
//             javaScriptEnabled
//             source={{ html: leafletHTML }}
//           />
//           {/* </ViewShot> */}
//         </View>
      

//         <View style={styles.searchAndToggleRow}>
//           <View style={styles.radioOption}>
//             <RadioButton
//               value="category"
//               status={selectedOption === 'category' ? 'checked' : 'unchecked'}
//               onPress={() => setSelectedOption('category')}
//             />
//             <Text>By Category</Text>
//           </View>

//           <View style={styles.radioOption}>
//             <RadioButton
//               value="continent"
//               status={selectedOption === 'continent' ? 'checked' : 'unchecked'}
//               onPress={() => setSelectedOption('continent')}
//             />
//             <Text>By Continent</Text>
//           </View>

//           <TextInput
//             placeholder="Search"
//             value={search}
//             onChangeText={setSearch}
//             style={styles.searchBar}
//           />
//         </View>
//         {filteredCountries.length > 0 && (
//   <ScrollView style={styles.searchResults}>
//     {filteredCountries.map((name, index) => (
//       <View key={index} style={styles.resultItem}>
//         <Text style={styles.countryName}>{name}</Text>

//         <View style={styles.icons}>
//           {/* ➕ Add Icon */}
//           <TouchableOpacity
//             onPress={() => handleAddCountry(name)}
//             style={styles.iconButton}
//           >
//             <Text style={styles.plusIcon}>➕</Text>
//           </TouchableOpacity>

//           {/* 📍 Location Icon */}
//           <TouchableOpacity
//             onPress={() => handleZoomToCountry(name)}
//             style={styles.iconButton}
//           >
//             <Image source={require('../Screens/assets/tick.jpg')} style={styles.tick} />
//           </TouchableOpacity>
//         </View>
//       </View>
//     ))}
//   </ScrollView>

// )}


//         <ScrollView style={styles.scrollList}>
//           {selectedOption === 'category' ? renderCategoryList() : renderContinentList()}
//         </ScrollView>

//         <View style={styles.addarea}>
//            {images.adBanner1 ? (
//           <Image source={{ uri: images.adBanner1 }} style={styles.adbanner} />
//         ) : (
//           <Text style={{display:'none'}}>add area</Text>
//         )}
//            {images.adBanner2 ? (
//           <Image source={{ uri: images.adBanner2 }} style={styles.adbanner} />
//         ) : (
//           <Text style={{display:'none'}}>add area</Text>
//         )}
//         </View>
//       </>
//     );
//   } else {
//     // LANDSCAPE view
//     return (
//       <View style={styles.landscapeWrapper}>
//         {/* LEFT SIDE */}
//         <View style={styles.leftPane}>
//           <View style={styles.header}>
//             <TouchableOpacity onPress={() => navigation.openDrawer()}>
//               <Image source={require('../Screens/assets/logo.png')} style={styles.logo} />
//             </TouchableOpacity>
//             <Text style={styles.banner}>I am Mark</Text>
//           </View>

//           <View style={styles.mapLandscape}>
//             <WebView
//               ref={webviewRef}
//               originWhitelist={['*']}
//               onMessage={handleMessage}
//               javaScriptEnabled
//               source={{ html: leafletHTML }}
//             />
//           </View>
//         </View>

//         {/* RIGHT SIDE */}
//         <View style={styles.rightPane}>
//           <View style={styles.searchAndToggleRow}>
//             <View style={styles.radioOption}>
//               <RadioButton
//                 value="category"
//                 status={selectedOption === 'category' ? 'checked' : 'unchecked'}
//                 onPress={() => setSelectedOption('category')}
//               />
//               <Text>By Category</Text>
//             </View>

//             <View style={styles.radioOption}>
//               <RadioButton
//                 value="continent"
//                 status={selectedOption === 'continent' ? 'checked' : 'unchecked'}
//                 onPress={() => setSelectedOption('continent')}
//               />
//               <Text>By Continent</Text>
//             </View>

//             <TextInput
//               placeholder="Search"
//               value={search}
//               onChangeText={setSearch}
//               style={styles.searchBar}
//             />
//              {filteredCountries.length > 0 && (
//   <ScrollView style={styles.searchResults}>
//     {filteredCountries.map((name, index) => (
//       <View key={index} style={styles.resultItem}>
//         <Text style={styles.countryName}>{name}</Text>

//         <View style={styles.icons}>
//           {/* ➕ Add Icon */}
//           <TouchableOpacity
//             onPress={() => handleAddCountry(name)}
//             style={styles.iconButton}
//           >
//             <Text style={styles.plusIcon}>➕</Text>
//           </TouchableOpacity>

//           {/* 📍 Location Icon */}
//           <TouchableOpacity
//             onPress={() => handleZoomToCountry(name)}
//             style={styles.iconButton}
//           >
//             <Text style={styles.locationIcon}>📍</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     ))}
//   </ScrollView>)}
//           </View>

//           <ScrollView style={styles.scrollList}>
//             {selectedOption === 'category' ? renderCategoryList() : renderContinentList()}
//           </ScrollView>

//           <View style={styles.addarea}>
//             <Image
//                      source={images.adBanner1 ? { uri: images.adBanner1 } : require('../Screens/assets/logo.png')}
//                      style={styles.adbanner}
//                    />
//            <Image
//                     source={images.adBanner2 ? { uri: images.adBanner2 } :  require('../Screens/assets/logo.png')}
//                    style={styles.adbanner}
//                   />
//           </View>
//         </View>
//       </View>
//     );
//   }
// };


// return <View style={styles.container}>{renderMainContent()}</View>;

// };

// export default MapScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   header: {
//     marginTop: 30,
//     flexDirection: 'row',
//     padding: 10,
//     backgroundColor: '#f0f0f0',
//     alignItems: 'center',
//   },
//   logo: { width: 40, height: 40, resizeMode: 'contain' },
//   banner: {
//     marginLeft: 10,
//     fontSize: 18,
//     fontWeight: 'bold',
//     backgroundColor: '#D177F6',
//     color: 'white',
//     paddingHorizontal: 20,
//     paddingVertical: 5,
//     borderRadius: 6,
//     flex: 1,
//     textAlign: 'center',
//   },
//   bannerImage:{
//    height:40,
//    marginLeft:10,
//    borderRadius:6,
//     flex:1,
//   },
//   adbanner:{
//     height:50,
//     width:220
//   },
//   tick:{
//   height:20,
//   width:20
//   },
//   map: { height: 310 },
//   landscapeWrapper: {
//   flex: 1,
//   flexDirection: 'row',
//   padding: 10,
//   gap: 10,
// },
// leftPane: {
//   width: '52%',

//   paddingRight: 5,
// },
// rightPane: {
//   width: '48%',
//   paddingLeft: 5,
//     marginTop:30,
// },
// mapLandscape: {
//   flex: 1,
//   borderWidth: 1,
//   borderColor: '#ccc',
//   marginTop: 10,
// },
// scrollList: {
//   flex: 1,
//   // marginTop: 10,
// },

  
//   searchAndToggleRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     padding:0,
//     gap: 10,
//   },
//   searchBar: {
//     backgroundColor: '#eee',
//     // padding: 8,
//     borderRadius: 8,
//     flex: 1,
//     marginRight: 10,
//   },
//   radioOption: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginHorizontal: 5,
//   },

//   listItem: {

//     flexDirection: 'column',
//     alignItems: 'flex-start',
//     padding: 5,
//     backgroundColor: '#f5f5f5',
//     // marginVertical: 3,
//     borderRadius: 6,
//   },
//   addarea: {
//     display: 'flex',
//     justifyContent: 'space-around',
//     flexDirection: 'row',
//     // gap:10
//   },
//   add: {
//  width:230,
//     backgroundColor: '#F1BEB5',
//     padding: 20,
//     borderRadius: 5,
 
//   },
//   searchResults: {
//   maxHeight:150,
//     marginLeft:20,
//     marginRight:20,
//   backgroundColor: '#fff',
//   borderRadius: 6,
//   elevation: 3,
//   padding: 6,
// },
// resultItem: {
//   flexDirection: 'row',
//   justifyContent: 'space-between',
//   alignItems: 'center',
//   paddingVertical: 6,
//   borderBottomWidth: 1,
//   borderBottomColor: '#eee',
// },
// continentBlock: {
//     backgroundColor: '#e0e0e0',
//     borderRadius: 8,
//     padding: 10,
//     marginBottom: 20,
//   },
//   continentTitle: {
//     fontSize: 18,
//     fontWeight: '700',
//     color: '#333',
//     marginBottom: 10,
//   },
//   countryButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 6,
//   },
//   countBox: {
//     backgroundColor: '#f0a500',
//     paddingHorizontal: 8,
//     paddingVertical: 4,
//     borderRadius: 4,
//     marginRight: 10,
//   },
//   countText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   countryName: {
//     fontSize: 14,
//     color: '#333',
//   },
// countryName: {
//   flex: 1,
//   fontSize: 14,
//   color: '#000',
// },
// icons: {
//   flexDirection: 'row',
//   gap: 12,
// },
// plusIcon: {
//   fontSize: 16,
//   color: 'purple',
// },
// locationIcon: {
//   fontSize: 16,
//   color: 'red',
// },

// });

import React, { useRef, useState,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { RadioButton } from 'react-native-paper';
import { useWindowDimensions } from 'react-native';
import { useMapContext } from '../Context/MapContext';
import ViewShot from 'react-native-view-shot';
import { loadContinentData } from '../utils/loadContinentData';

const categoryColors = {
  'List 1 (Sun)': '#fbc276',
  'List 2 (Air)': '#FFFFFF',
  'List 3 (Trees)': '#66cc66',
  'List 4 (Land)': '#ffff66',
  'List 5 (Water)': '#1338BE',
  'List 6 (Core)': '#ff3333'
};
const continentColors = {
  'Europe': '#FFFFFF',
  'Australia': '#ffff66',
  'Asia': '#fbc276',
  'Africa': '#66cc66',
  'North America': '#1338BE',
  'South America': '#ff3333',
};

const MapScreen = ({ navigation }) => {
//  const { categoryCountry, setCategoryCountry } = useMapContext();
const { countryCategoryMap, setCountryCategoryMap, countryCounts, setCountryCounts, legendLabels, setLegendLabels, countryToContinentMap, setCountryToContinentMap, } = useMapContext();
const { webviewRef, viewShotRef } = useMapContext();
  const { width, height } = useWindowDimensions();
  const isPortrait = height >= width;
const[allCountryNames,setAllCountryNames]=useState([]);
const [filteredCountries, setFilteredCountries] = useState([]);
 const [isSorted, setIsSorted] = useState(false);
const [countryCoordinates, setCountryCoordinates] = useState({});
  const [selectedOption, setSelectedOption] = useState('category');
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('List 1 (Sun)');
   const [continentCountryMap, setContinentCountryMap] = useState({});
  const [countryClickCounts, setCountryClickCounts] = useState({});
  const [selectedContinent, setSelectedContinent] = useState(null);
  const CONTINENT_TO_CATEGORY_MAP = {
  Asia: 'List 1 (Sun)',
  Europe: 'List 2 (Air)',
  Africa: 'List 3 (Trees)',
  Australia: 'List 4 (Land)',
  North_America: 'List 5 (Water)',
  South_America: 'List 6 (Core)',
};

const [categoryNames, setCategoryNames] = useState({
  'List 1 (Sun)': 'List 1 (Sun)',
  'List 2 (Air)': 'List 2 (Air)',
  'List 3 (Trees)': 'List 3 (Trees)',
  'List 4 (Land)': 'List 4 (Land)',
  'List 5 (Water)': 'List 5 (Water)',
  'List 6 (Core)': 'List 6 (Core)',
});
const [editingCategory, setEditingCategory] = useState(null);
const [editedName, setEditedName] = useState('');
  // const continents = ['Asia', 'Africa', 'Europe', 'North America', 'South America', 'Australia'];
  const [categoryCountries, setCategoryCountries] = useState({
    'List 1 (Sun)': {},
    'List 2 (Air)': {},
    'List 3 (Trees)': {},
    'List 4 (Land)': {},
    'List 5 (Water)': {},
    'List 6 (Core)': {},
  });
  const { images } = useMapContext();
  const handleSort = () => {
    setIsSorted(prev => !prev);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    const color = categoryColors[category];
    webviewRef.current.injectJavaScript(`selectCategory(${JSON.stringify(category)}, ${JSON.stringify(color)}); true;`);
  };
useEffect(() => {
  const fetchData = async () => {
    const data = await loadContinentData();
    setContinentCountryMap(data);
  };
  fetchData();
}, []);
const incrementCountryCount = (country) => {
  const continent = Object.keys(continentCountryMap).find((cont) =>
    continentCountryMap[cont].includes(country)
  );

  if (!continent) return;

  const categoryKey = CONTINENT_TO_CATEGORY_MAP[continent] || 'List 1 (Sun)';
  const color = categoryColors[categoryKey] || '#C0C0C0';

  // Save continent info
  setCountryToContinentMap(prev => ({
    ...prev,
    [country]: continent,
  }));

  setCountryClickCounts(prev => ({
    ...prev,
    [country]: (prev[country] || 0) + 1,
  }));

  setCountryCategoryMap(prev => {
    const updated = { ...prev };
    if (!updated[categoryKey]) updated[categoryKey] = {};
    updated[categoryKey][country] = (updated[categoryKey][country] || 0) + 1;
    return updated;
  });

  if (webviewRef?.current) {
    webviewRef.current.injectJavaScript(`
      markCountryWithColor(${JSON.stringify(country)}, ${JSON.stringify(color)});
      true;
    `);
  }
};


useEffect(() => {
  const newCounts = {};
  Object.keys(countryCategoryMap).forEach((category) => {
    Object.entries(countryCategoryMap[category]).forEach(([country, count]) => {
      newCounts[country] = (newCounts[country] || 0) + count;
    });
  });
  setCountryCounts(newCounts);

  const labels = {};
  Object.keys(countryCategoryMap).forEach((category) => {
    labels[category] = categoryColors[category] || continentColors[category.replace('Continent: ', '')] || '#C0C0C0';
  });
  setLegendLabels(labels);
}, [countryCategoryMap]);

useEffect(() => {
  const fetchData = async () => {
    const data = await loadContinentData();
    setContinentCountryMap(data);

    // Merge continentColors into categoryColors
    Object.entries(continentColors).forEach(([continent, color]) => {
      categoryColors[`Continent: ${continent}`] = color;
    });
  };
  fetchData();
}, []);


  const handleMessage = (event) => {
    const data = JSON.parse(event.nativeEvent.data);
    if (data.type === 'COUNTRY_SELECTED') {
      const { country, category } = data;

      setCategoryCountries((prev) => {
        const updated = { ...prev };
        if (!updated[category][country]) {
          updated[category][country] = 1;
        } else {
          updated[category][country] += 1;
        }
        return { ...updated };
      });
    }
    if (data.type === 'COUNTRY_LIST') {
  const countryNames = data.countries.map(c => c.name);
  const coordinatesMap = {};

  data.countries.forEach(c => {
    coordinatesMap[c.name] = c.coords;
  });

  setAllCountryNames(countryNames);
  setCountryCoordinates(coordinatesMap);
}

  };
//  useEffect(() => {
//   setCountryCategoryMap(categoryCountries);

//   const newCounts = {};
//   Object.keys(categoryCountries).forEach((category) => {
//     Object.entries(categoryCountries[category]).forEach(([country, count]) => {
//       newCounts[country] = (newCounts[country] || 0) + count;
//     });
//   });
//   setCountryCounts(newCounts);

//   const labels = {};
//   Object.keys(categoryCountries).forEach((category) => {
//     labels[category] = categoryColors[category];
//   });

//   Object.keys(countryCategoryMap).forEach((category) => {
//     if (!labels[category]) {
//       labels[category] = categoryColors[category] || '#C0C0C0';
//     }
//   });

//   setLegendLabels(labels);
// }, [categoryCountries, countryCategoryMap]);
// When countryCategoryMap updates (including from import), update counts and labels
useEffect(() => {
  const newCounts = {};
  const labels = {};

  Object.entries(countryCategoryMap).forEach(([category, countries]) => {
    Object.entries(countries).forEach(([country, count]) => {
      newCounts[country] = (newCounts[country] || 0) + count;
    });
    labels[category] = categoryColors[category] || '#C0C0C0';
  });

  setCountryCounts(newCounts);
  setLegendLabels(labels);
}, [countryCategoryMap]);

// Set categoryCountries only if you want to re-sync UI from data
useEffect(() => {
  setCategoryCountries(countryCategoryMap);
}, [countryCategoryMap]);


useEffect(() => {
  if (search.trim() === '') {
    setFilteredCountries([]);
  } else {
    const filtered = allCountryNames.filter(name =>
      name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredCountries(filtered);
  }
}, [search]);
const handleAddCountry = (countryName) => {
  setCategoryCountries(prev => {
    const updated = { ...prev };
    if (!updated[selectedCategory][countryName]) {
      updated[selectedCategory][countryName] = 1;
    } else {
      updated[selectedCategory][countryName]++;
    }
    return updated;
  });

  setSearch('');
  setFilteredCountries([]);
};

const handleZoomToCountry = (countryName) => {
  const coords = countryCoordinates[countryName];
  if (coords) {
    webviewRef.current.injectJavaScript(`
      map.setView([${coords[0]}, ${coords[1]}], 4);
      true;
    `);
  }
};


  const leafletHTML = `<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <style>
    html, body, #map {
      height: 100%;
      margin: 0;
      padding: 0;
      background-color:#d4f1f9;
    }
    .map-button {
      position: fixed;
      z-index: 1000;
      background: #fff;
      border: 1px solid #ccc;
      padding: 5px 10px;
      font-size: 18px;
      cursor: pointer;
      border-radius: 5px;
      left: 10px;
    }
    #zoomIn { bottom: 80px; }
    #zoomOut { bottom: 50px; }
    #reset { bottom: 20px; }

    .leaflet-control-container .leaflet-control-attribution {
      display: none;
    }
  </style>
</head>
<body>
  <div id="map"></div>
  <div id="zoomIn" class="map-button">+</div>
  <div id="zoomOut" class="map-button">−</div>
  <div id="reset" class="map-button">=</div>

  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <script>
    const initialCenter = [25, 0];
    const initialZoom = 0;
    let selectedCategory = 'List 1 (Sun)';
    let selectedColor = '#fbc276';

    const map = L.map('map', {
      zoomControl: false,
      zoomSnap: 0.1,
      zoomDelta: 0.1,
      maxZoom: 10,
      minZoom: 1,
      attributionControl: false // disables leaflet logo attribution
    }).setView(initialCenter, initialZoom);

    // Empty tileLayer keeps background color visible
    L.tileLayer('', {}).addTo(map);

    const countryLayers = {};
    window.countryLayers = countryLayers;

    function style(feature) {
      return { fillColor: '#C0C0C0', color: 'white', weight: 1, fillOpacity: 1 };
    }

    fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
      .then(res => res.json())
      .then(data => {
        const countryList = [];

        L.geoJSON(data, {
          style: style,
          onEachFeature: (feature, layer) => {
            const countryName = feature.properties.name || feature.properties.ADMIN || feature.properties.NAME || 'Unknown';
            countryLayers[countryName] = layer;

            layer.on('click', function () {
              this.setStyle({ fillColor: selectedColor });

              if (window.ReactNativeWebView) {
                window.ReactNativeWebView.postMessage(JSON.stringify({
                  type: 'COUNTRY_SELECTED',
                  country: countryName,
                  category: selectedCategory
                }));
              }
            });

            const latlng = layer.getBounds().getCenter();
            countryList.push({ name: countryName, coords: [latlng.lat, latlng.lng] });
          }
        }).addTo(map);

        if (window.ReactNativeWebView) {
          window.ReactNativeWebView.postMessage(JSON.stringify({
            type: 'COUNTRY_LIST',
            countries: countryList
          }));
        }
      });

    function selectCategory(category, color) {
      selectedCategory = category;
      selectedColor = color;
    }

    window.selectCategory = selectCategory;
    function markCountryWithColor(country, color) {
  const layer = countryLayers[country];
  if (layer) {
    layer.setStyle({ fillColor: color });
  }
}
window.markCountryWithColor = markCountryWithColor;


    document.getElementById('zoomIn').onclick = () => map.setZoom(map.getZoom() + 0.3);
    document.getElementById('zoomOut').onclick = () => map.setZoom(map.getZoom() - 0.3);
    document.getElementById('reset').onclick = () => map.setView(initialCenter, initialZoom);
  </script>
</body>
</html>`;

  const renderCategoryList = () => (
   Object.keys(categoryColors)
  .filter(category => category && categoryCountries[category])
  .map((category, index) => (

      <View
        key={index}
        style={[
          styles.listItem,
          { backgroundColor: selectedCategory === category ? '#ddd' : '#fff' },
        ]}
      >
        <View style={{display:'flex',justifyContent:'space-between',flexDirection:'row'}}>
        <TouchableOpacity
          onPress={() => handleCategoryClick(category)}
          style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}
        >
          <View style={{
            width: 15,
            height: 15,
           borderWidth:1,
            borderColor:'black',
            backgroundColor: categoryColors[category],
            marginRight: 10,
            
          }} />
          {/* <Text>{category}</Text> */}
          {editingCategory === category ? (
  <TextInput
    style={{ borderBottomWidth: 1, minWidth: 100 }}
    value={editedName}
    onChangeText={setEditedName}
    onBlur={() => {
      const updatedNames = { ...categoryNames, [category]: editedName };
      setCategoryNames(updatedNames);
      setEditingCategory(null);
    }}
    autoFocus
  />
) : (
  <TouchableOpacity onLongPress={() => {
    setEditingCategory(category);
    setEditedName(categoryNames[category]);
  }}>
    <Text>{categoryNames[category]}</Text>
  </TouchableOpacity>
)}

        </TouchableOpacity>
<TouchableOpacity
            onPress={handleSort}
            style={{
              marginTop:0,
              alignSelf: 'flex-end',
              marginRight: 10,
              marginBottom:10,
              // marginBottom: 8,
              paddingHorizontal: 5,
              paddingVertical: 4,
              backgroundColor: '#00AEEF',
              borderRadius: 6,
            }}
          >
            <Text style={{ color: '#fff', fontSize: 12, fontWeight: '600' }}>
              {isSorted ? 'Unsort' : 'Sort A-Z'}
            </Text>
          </TouchableOpacity>
          </View>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {selectedCategory === category &&
         (
        <>
          {/* Sort Button */}
          

          {/* Country List */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginLeft: 12 }}>
            {Object.entries(categoryCountries[selectedCategory])
              .sort(([a], [b]) => {
                if (!isSorted) return 0;
                return a.localeCompare(b);
              })
              .map(([country, count], i) => (
                <View
                  key={i}
                  style={{
                    width: '33.33%',
                    marginBottom: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <Text
                    style={{
                      backgroundColor: categoryColors[selectedCategory],
                      paddingHorizontal: 6,
                      paddingVertical: 2,
                      borderRadius: 4,
                      fontWeight: 'bold',
                      fontSize: 10,
                      marginRight: 6,
                      color: '#000',
                    }}
                  >
                    {String(count).padStart(2, '0')}
                  </Text>
                  <Text style={{ fontSize: 12 }}>{country}</Text>
                </View>
              ))}
          </View>
        </>
      )}
      </View>
      </View>
    ))
  );

 const renderContinentList = () => (
  <ScrollView contentContainerStyle={{ padding: 16 }}>
    {Object.keys(continentCountryMap).map((continent, index) => {
      const color = continentColors[continent] || '#C0C0C0';
      return (
        <View key={index} style={styles.continentBlock}>
          <TouchableOpacity onPress={() => setSelectedContinent(continent)}>
            <Text style={styles.continentTitle}>{continent}</Text>
          </TouchableOpacity>

          {selectedContinent === continent && (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
              {continentCountryMap[continent].map((country, i) => (
                <View
                  key={`${continent}-${i}`}
                  style={{
                    width: '33.33%',
                    marginBottom: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      incrementCountryCount(country); // handles coloring on map
                    }}
                    style={{
                      backgroundColor: color,
                      paddingHorizontal: 6,
                      paddingVertical: 2,
                      borderRadius: 4,
                      marginRight: 6,
                    }}
                  >
                    <Text style={{ fontWeight: 'bold', fontSize: 10, color: '#000' }}>
                      {(countryClickCounts[country] || 0).toString().padStart(2, '0')}
                    </Text>
                  </TouchableOpacity>
                  <Text style={{ fontSize: 12 }}>{country}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      );
    })}
  </ScrollView>
);



  const renderMainContent = () => {
  if (isPortrait) {
    return (
      <>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image
                     source={images.markLogo ? { uri: images.markLogo } : require('../Screens/assets/logo.png')}
                     style={styles.logo}
                   />
          </TouchableOpacity>
             {images.companyBanner ? (
          <Image source={{ uri: images.companyBanner }} style={styles.bannerImage} />
        ) : (
          <Text style={styles.banner}>I am Mark</Text>
        )}
        </View>

        <View style={styles.map}>
          <ViewShot
  ref={viewShotRef}
  options={{ format: "jpg", quality: 0.9 }}
  style={{ flex: 1 }} // full width & height
>
          <WebView
            ref={webviewRef}
            originWhitelist={['*']}
            onMessage={handleMessage}
            javaScriptEnabled
            source={{ html: leafletHTML }}
            domStorageEnabled
    allowFileAccess
          />
          </ViewShot>
        </View>
      

        <View style={styles.searchAndToggleRow}>
          <View style={styles.radioOption}>
            <RadioButton
              value="category"
              status={selectedOption === 'category' ? 'checked' : 'unchecked'}
              onPress={() => setSelectedOption('category')}
            />
            <Text>By Category</Text>
          </View>

          <View style={styles.radioOption}>
            <RadioButton
              value="continent"
              status={selectedOption === 'continent' ? 'checked' : 'unchecked'}
              onPress={() => setSelectedOption('continent')}
            />
            <Text>By Continent</Text>
          </View>

          <TextInput
            placeholder="Search"
            value={search}
            onChangeText={setSearch}
            style={styles.searchBar}
          />
        </View>
        {filteredCountries.length > 0 && (
  <ScrollView style={styles.searchResults}>
    {filteredCountries.map((name, index) => (
      <View key={index} style={styles.resultItem}>
        <Text style={styles.countryName}>{name}</Text>

        <View style={styles.icons}>
          {/* ➕ Add Icon */}
          <TouchableOpacity
            onPress={() => handleAddCountry(name)}
            style={styles.iconButton}
          >
            <Text style={styles.plusIcon}>➕</Text>
          </TouchableOpacity>


          <TouchableOpacity
            onPress={() => handleZoomToCountry(name)}
            style={styles.iconButton}
          >
            <Image source={require('../Screens/assets/tick.jpg')} style={styles.tick} />
          </TouchableOpacity>
        </View>
      </View>
    ))}
  </ScrollView>

)}


        <ScrollView style={styles.scrollList}>
          {selectedOption === 'category' ? renderCategoryList() : renderContinentList()}
        </ScrollView>

           <View style={styles.addarea}>
           
                    {images.adBanner1 ? (
          <Image source={{ uri: images.adBanner1 }} style={styles.add} />
        ) : (
          <Text ></Text>
        )}
           
                    {images.adBanner2 ? (
          <Image source={{ uri: images.adBanner2 }} style={styles.add} />
        ) : (
          <Text ></Text>
        )}
          </View>
      </>
    );
  } else {

    return (
      <View style={styles.landscapeWrapper}>

        <View style={styles.leftPane}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image source={require('../Screens/assets/logo.png')} style={styles.logo} />
            </TouchableOpacity>
             {images.companyBanner ? (
          <Image source={{ uri: images.companyBanner }} style={styles.bannerImage} />
        ) : (
          <Text style={styles.banner}>I am Mark</Text>
        )}
          </View>

          <View style={styles.mapLandscape}>
            <WebView
              ref={webviewRef}
              originWhitelist={['*']}
              onMessage={handleMessage}
              javaScriptEnabled
              source={{ html: leafletHTML }}
            />
          </View>
        </View>

        {/* RIGHT SIDE */}
        <View style={styles.rightPane}>
          <View style={styles.searchAndToggleRow}>
            <View style={styles.radioOption}>
              <RadioButton
                value="category"
                status={selectedOption === 'category' ? 'checked' : 'unchecked'}
                onPress={() => setSelectedOption('category')}
              />
              <Text>By Category</Text>
            </View>

            <View style={styles.radioOption}>
              <RadioButton
                value="continent"
                status={selectedOption === 'continent' ? 'checked' : 'unchecked'}
                onPress={() => setSelectedOption('continent')}
              />
              <Text>By Continent</Text>
            </View>

            <TextInput
              placeholder="Search"
              value={search}
              onChangeText={setSearch}
              style={styles.searchBar}
            />
             {filteredCountries.length > 0 && (
  <ScrollView style={styles.searchResults}>
    {filteredCountries.map((name, index) => (
      <View key={index} style={styles.resultItem}>
        <Text style={styles.countryName}>{name}</Text>

        <View style={styles.icons}>
          {/* ➕ Add Icon */}
          <TouchableOpacity
            onPress={() => handleAddCountry(name)}
            style={styles.iconButton}
          >
            <Text style={styles.plusIcon}>➕</Text>
          </TouchableOpacity>

          {/* 📍 Location Icon */}
          <TouchableOpacity
            onPress={() => handleZoomToCountry(name)}
            style={styles.iconButton}
          >
            <Text style={styles.locationIcon}>📍</Text>
          </TouchableOpacity>
        </View>
      </View>
    ))}
  </ScrollView>)}
          </View>

          <ScrollView style={styles.scrollList}>
            {selectedOption === 'category' ? renderCategoryList() : renderContinentList()}
          </ScrollView>

          <View style={styles.addarea}>
            <Image
                     source={images.adBanner1 ? { uri: images.adBanner1 } : require('../Screens/assets/logo.png')}
                     style={styles.adbanner}
                   />
           <Image
                    source={images.adBanner2 ? { uri: images.adBanner2 } :  require('../Screens/assets/logo.png')}
                   style={styles.adbanner}
                  />
          </View>
        </View>
      </View>
    );
  }
};


return <View style={styles.container}>{renderMainContent()}</View>;

};

export default MapScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    marginTop: 30,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  logo: { width: 40, height: 40, resizeMode: 'contain' },
  banner: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#D177F6',
    color: 'white',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 6,
    flex: 1,
    textAlign: 'center',
  },
  bannerImage:{
   height:40,
   marginLeft:10,
   borderRadius:6,
    flex:1,
  },
  adbanner:{
    height:50,
    width:220
  },
  tick:{
  height:20,
  width:20
  },
  map: { height: 310 },
  landscapeWrapper: {
  flex: 1,
  flexDirection: 'row',
  padding: 10,
  gap: 10,
},
leftPane: {
  width: '52%',

  paddingRight: 5,
},
rightPane: {
  width: '48%',
  paddingLeft: 5,
    marginTop:30,
},
mapLandscape: {
  flex: 1,
  borderWidth: 1,
  borderColor: '#ccc',
  marginTop: 10,
},
scrollList: {
  flex: 1,
  // marginTop: 10,
},

  
  searchAndToggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding:0,
    gap: 10,
  },
  searchBar: {
    backgroundColor: '#eee',
    // padding: 8,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
  },

  listItem: {

    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 5,
    backgroundColor: '#f5f5f5',
    // marginVertical: 3,
    borderRadius: 6,
  },
  addarea: {
    display: 'flex',
    justifyContent: 'space-around',
    flexDirection: 'row',
    // gap:10
  },
  add: {
 width:230,
    backgroundColor: '#F1BEB5',
    padding: 20,
    borderRadius: 5,
 
  },
  searchResults: {
  maxHeight:150,
    marginLeft:20,
    marginRight:20,
  backgroundColor: '#fff',
  borderRadius: 6,
  elevation: 3,
  padding: 6,
},
resultItem: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: 6,
  borderBottomWidth: 1,
  borderBottomColor: '#eee',
},
continentBlock: {
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  continentTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
  },
  countryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  countBox: {
    backgroundColor: '#f0a500',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 10,
  },
  countText: {
    color: 'white',
    fontWeight: 'bold',
  },
  countryName: {
    fontSize: 14,
    color: '#333',
  },
countryName: {
  flex: 1,
  fontSize: 14,
  color: '#000',
},
icons: {
  flexDirection: 'row',
  gap: 12,
},
plusIcon: {
  fontSize: 16,
  color: 'purple',
},
locationIcon: {
  fontSize: 16,
  color: 'red',
},

});
