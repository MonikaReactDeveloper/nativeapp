
// import {React,useState,useEffect} from 'react';
// import { View, Text, ScrollView, StyleSheet, Dimensions,TouchableOpacity,Image } from 'react-native';
// import { WebView } from 'react-native-webview';
// import { useMapContext } from '../Context/MapContext';
// import axios from 'axios';
// const Know = ({navigation}) => {
//    const [isSorted, setIsSorted] = useState(false);
//    const [categories, setCategories] = useState([]);
//    const [products, setProducts] = useState([]);
// const [selectedCategory, setSelectedCategory] = useState('');
// const [filteredProducts, setFilteredProducts] = useState([]);
//      const { images } = useMapContext();
//      const handleSort = () => {
//        setIsSorted(prev => !prev);
//      };
   
//       useEffect(() => {
//   axios.get('https://ansh.co.in/qazxswm?api_key=52006ea8-c6d0-4219-93fb-b766007dcafa', { responseType: 'text' })
//     .then(response => {
//       const raw = response.data;
//       const matches = [...raw.matchAll(/\[list_name\] => (.+)/g)];
//       const listNames = matches.map(m => m[1]?.trim());

//       console.log('Extracted list_names:', listNames);
//       setCategories(listNames);
//     })
//     .catch(err => console.error('Fetch error:', err));
// }, []);
// useEffect(() => {
//   axios.get('https://ansh.co.in/qazxswm?api_key=52006ea8-c6d0-4219-93fb-b766007dcafa', { responseType: 'text' })
//     .then(response => {
//       const raw = response.data;

//       // Match all list_names
//       const gameMatches = [...raw.matchAll(/\[list_name\] => (.+)/g)];
//       const categoryList = gameMatches.map(m => m[1].trim());
//       setCategories(categoryList);

//       // Match product_info blocks
//       const productBlocks = raw.split('[product_name] => ').slice(1);
//       const productList = productBlocks.map(block => {
//         const name = block.split('\n')[0].trim();
//         const labelMatch = block.match(/\[labelname1\] => (.+)/);
//         return {
//           product_name: name,
//           labelname1: labelMatch ? labelMatch[1].trim() : '',
//         };
//       });
//       setProducts(productList);
//     })
//     .catch(err => console.error('Fetch error:', err));
// }, []);
// const handleCategoryPress = (category) => {
//   setSelectedCategory(category);

//   const matches = products.filter(product =>
//     product.labelname1.toLowerCase().includes(category.toLowerCase())
//   );

//   setFilteredProducts(matches);
// };

//   const mapHtml = `
//     <!DOCTYPE html>
//     <html>
//       <head>
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css" />
//         <style>
//           html, body, #map {
//             margin: 0;
//             height: 100%;
//             width: 100%;
//             background-color: white;
//           }
//           .leaflet-control-attribution {
//             display: none !important;
//           }
//         </style>
//       </head>
//       <body>
//         <div id="map"></div>
//         <script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"></script>
//         <script>
//          const initialCenter = [25, 0];
//     const initialZoom = 0;
//           const map = L.map('map', {
//             zoomControl: true,
//       zoomSnap: 0.1,
//       zoomDelta: 0.1,
//       maxZoom: 10,
//       minZoom: 1,
        
//             attributionControl: false
//           }).setView(initialCenter, initialZoom);

//           // Transparent tileLayer to maintain white background
//           L.tileLayer('', {}).addTo(map);

//           fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
//             .then(res => res.json())
//             .then(geoData => {
//               L.geoJSON(geoData, {
//                 style: {
//                   fillColor: '#77dd77',
//                   fillOpacity: 0.8,
//                   color: '#666',
//                   weight: 1
//                 }
//               }).addTo(map);
//             });
//         </script>
//       </body>
//     </html>
//   `;



//   return (
//     <View style={styles.container}>
//     <View style={styles.header}>
//               <TouchableOpacity onPress={() => navigation.openDrawer()}>
//                 <Image
//                          source={images.markLogo ? { uri: images.markLogo } : require('../Screens/assets/anshin_know_final.jpg')}
//                          style={styles.logo}
//                        />
//               </TouchableOpacity>
//                  {images.companyBanner ? (
//               <Image source={{ uri: images.companyBanner }} style={styles.bannerImage} />
//             ) : (
//               <Text style={styles.banner}>I am know</Text>
//             )}
//             </View>

//       <WebView
//         originWhitelist={['*']}
//         source={{ html: mapHtml }}
//         style={styles.map}
//         scrollEnabled={false}
//       />

//   <View style={styles.categoryContainer}>
//   <Text style={styles.categoryHeader}>Know detail by category</Text>
//   <ScrollView contentContainerStyle={styles.scrollContent}>
//     {categories.map((item, index) => (
//       <Text
//         key={index}
//         style={[
//           styles.categoryItem,
//           selectedCategory === item && { fontWeight: 'bold', color: '#000' }
//         ]}
//         onPress={() => handleCategoryPress(item)}
//       >
//         🟢 {item}
//       </Text>
//     ))}
//   </ScrollView>

//   {filteredProducts.length > 0 && (
//     <View style={styles.productList}>
//       <Text style={styles.subHeader}>{selectedCategory}</Text>
//       {filteredProducts.map((p, idx) => (
//         <Text key={idx} style={styles.productItem}>✅ {p.product_name}</Text>
//       ))}
//     </View>
//   )}
// </View>

//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   map: {
//     height: Dimensions.get('window').height * 0.5,
//   },
//   categoryContainer: {
//     flex: 1,
//     backgroundColor: '#ffffff',
//     paddingHorizontal: 15,
//     paddingTop: 10,
//   },
//   categoryHeader: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   scrollContent: {
//     paddingBottom: 20,
//   },
//   categoryItem: {
//     fontSize: 16,
//     paddingVertical: 4,
//     color: '#333',
//   },header: {
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
// });

// export default Know;
// // ProductList.js
// // import React, { useEffect, useState } from 'react';
// // import { View, Text, FlatList, ActivityIndicator, Image, TouchableOpacity, StyleSheet } from 'react-native';

// // export default function ProductList() {
// //   const [products, setProducts] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   const fetchProducts = async () => {
// //     try {
// //       const response = await fetch('https://ansh.co.in/getProducts.php');
// //       const data = await response.json();
// //       setProducts(data);
// //     } catch (error) {
// //       console.error('Error fetching products:', error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchProducts();
// //   }, []);

// //   const renderItem = ({ item }) => (
// //     <TouchableOpacity
// //       style={styles.productItem}
// //       onPress={() => {
// //         // Do something with item when pressed
// //         console.log('Product Pressed:', item.product_name);
// //       }}
// //     >
// //       <Image
// //         source={{ uri: 'https://ansh.co.in/public/uploads/all_logos/tickfinal.png' }}
// //         style={styles.tickIcon}
// //       />
// //       <Text style={styles.productName}>{item.product_name}</Text>
// //     </TouchableOpacity>
// //   );

// //   if (loading) return <ActivityIndicator size="large" color="#00aeef" />;

// //   return (
// //     <FlatList
// //       data={products}
// //       keyExtractor={(item) => item.id.toString()}
// //       renderItem={renderItem}
// //       contentContainerStyle={{ padding: 16 }}
// //     />
// //   );
// // }

// // const styles = StyleSheet.create({
// //   productItem: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginBottom: 12,
// //     padding: 10,
// //     borderWidth: 1,
// //     borderColor: '#ddd',
// //     borderRadius: 8,
// //   },
// //   tickIcon: {
// //     width: 14,
// //     height: 14,
// //     marginRight: 10,
// //   },
// //   productName: {
// //     fontSize: 16,
// //     fontWeight: '500',
// //   },
// // });
// File: Know.js

import React, { useState, useEffect,useRef } from 'react';
import {
  View, Text, ScrollView, StyleSheet, Dimensions, TouchableOpacity, Image
} from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';
import { useMapContext } from '../Context/MapContext';
import { Linking } from 'react-native';
import ViewShot from 'react-native-view-shot';
import { useAppSetting } from '../Context/AppSettingContext';


const Know = ({ navigation }) => {
  const [zoomImage, setZoomImage] = useState(null);
  const { webviewRef, viewShotRef } = useMapContext();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [countryCoordinates, setCountryCoordinates] = useState({});
// const webviewRef = useRef();
  const { images } = useMapContext();
   
   const { appId } = useAppSetting();
  const [adImages, setAdImages] = useState({ ad1: '', ad2: '',companyBanner:'',worldMapImage:'',companyName:'',know:'' });


  useEffect(() => {
    const fetchAdBanners = async () => {
      if (!appId) return;

      try {
        const response = await axios.get(`http://10.0.2.2:8080/api/admin/app/${appId}`);
   
   

     
          setAdImages(response.data);
          
     
        
      } catch (error) {
        console.error('Failed to fetch ads:', error);
      }
    };

    fetchAdBanners();
  }, [appId]);
 const getImageUrl = (path) => {
  return path ? `http://10.0.2.2:8080/${path}` : null;
};
  
const {
  companyBanner, logo,worldMapImage,
  
  ad1, ad2, know, companyName
} = adImages;
 const ads = [ad1, ad2].filter(Boolean);


  function zoomToCountry(country) {
  const layer = countryLayers[country];
  if (layer) {
    map.fitBounds(layer.getBounds(), { padding: [20, 20] });
  }
}
window.zoomToCountry = zoomToCountry;
function clearHighlightedCountries() {
  Object.values(countryLayers).forEach(layer => {
    layer.setStyle({ fillColor: '#C0C0C0' }); // Reset to default
  });
}
window.clearHighlightedCountries = clearHighlightedCountries;

  useEffect(() => {
    axios.get('https://ansh.co.in/qazxswm?api_key=52006ea8-c6d0-4219-93fb-b766007dcafa', { responseType: 'text' })
      .then(response => {
        const raw = response.data;
        const matches = [...raw.matchAll(/\[list_name\] => (.+)/g)];
        const listNames = matches.map(m => m[1]?.trim());
        const uniqueSorted = [...new Set(listNames)].sort();
        setCategories(uniqueSorted);
      })
      .catch(err => console.error('Fetch error:', err));
  }, []);

  useEffect(() => {
    axios.get('https://ansh.co.in/qazxswm?api_key=52006ea8-c6d0-4219-93fb-b766007dcafa', { responseType: 'text' })
      .then(response => {
        const raw = response.data;
        const productBlocks = raw.split('[product_name] => ').slice(1);
        const productList = productBlocks.map(block => {
          const name = block.split('\n')[0].trim();
          const labelMatch = block.match(/\[labelname1\] => (.+)/);
           const notes = block.match(/\[add_notes\] => (.+)/);
          const label1 = block.match(/\[label1_country\] => (.+)/);
          const label2 = block.match(/\[label2_country\] => (.+)/);
          const image = block.match(/\[product_images\] => (.+)/);
          return {
            product_name: name,
            labelname1: labelMatch ? labelMatch[1].trim() : '',
             notes: notes ? notes[1].trim() : '',
            label1_country: label1 ? label1[1].trim() : '',
            label2_country: label2 ? label2[1].trim() : '',
            image: image ? image[1].trim() : '',
          };
        });
        setProducts(productList.sort((a, b) => a.product_name.localeCompare(b.product_name)));
      })
      .catch(err => console.error('Fetch error:', err));
  }, []);


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
      background-color:#ffffff;
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
    #zoomIn { bottom: 90px; }
    #zoomOut { bottom: 60px; }
    #reset { bottom: 30px; }
    #clearMap { bottom: 5px; }

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
  <div id="clearMap" class="map-button">x</div>

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
      attributionControl: false
    }).setView(initialCenter, initialZoom);

    L.tileLayer('', {}).addTo(map);

    const countryLayers = {};
    window.countryLayers = countryLayers;

    const highlightedCountries = [];

    function resetHighlights() {
      highlightedCountries.forEach(country => {
        const layer = countryLayers[country];
        if (layer) {
          layer.setStyle({ fillColor: '#CBE3FF' });
        }
      });
      highlightedCountries.length = 0;
    }

    function markCountryWithColor(country, color) {
      const layer = countryLayers[country];
      if (layer) {
        layer.setStyle({ fillColor: color });
        if (!highlightedCountries.includes(country)) {
          highlightedCountries.push(country);
        }
      }
    }

    function selectCategory(label1, label2) {
      selectedCategory = label1;
      resetHighlights();

      if (label1) markCountryWithColor(label1, '#180f8bff');  // Orange
      if (label2) markCountryWithColor(label2, '#84D2C5');  // Teal
    }

    window.selectCategory = selectCategory;
    window.markCountryWithColor = markCountryWithColor;

    function style(feature) {
      return { fillColor: '#CBE3FF', color: 'black', weight: 1, fillOpacity: 1 };
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
              const currentColor = this.options.fillColor || this.options.style?.fillColor;
              const isSelected = currentColor === selectedColor;

              if (isSelected) {
                this.setStyle({ fillColor: '#C0C0C0' });

                if (window.ReactNativeWebView) {
                  window.ReactNativeWebView.postMessage(JSON.stringify({
                    type: 'COUNTRY_UNSELECTED',
                    country: countryName,
                  }));
                }
              } else {
                this.setStyle({ fillColor: selectedColor });

                if (window.ReactNativeWebView) {
                  window.ReactNativeWebView.postMessage(JSON.stringify({
                    type: 'COUNTRY_SELECTED',
                    country: countryName,
                    category: selectedCategory
                  }));
                }
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

    window.zoomToCountry = function (countryName) {
      const layer = countryLayers[countryName];
      if (layer) {
        map.fitBounds(layer.getBounds(), { padding: [20, 20] });
      }
    };
document.addEventListener("message", function (event) {
  try {
    const data = JSON.parse(event.data);
    if (data.type === "RESET_MAP") {
      map.setView(initialCenter, initialZoom);
      resetHighlights(); // ✅ Clear highlights correctly
    }
  } catch (err) {
    console.error("Error handling message from React Native:", err);
  }
});



    document.getElementById('zoomIn').onclick = () => map.setZoom(map.getZoom() + 0.3);
    document.getElementById('zoomOut').onclick = () => map.setZoom(map.getZoom() - 0.3);
    document.getElementById('reset').onclick = () => map.setView(initialCenter, initialZoom);
    document.getElementById('clearMap').onclick = () => {
      if (window.ReactNativeWebView) {
        window.ReactNativeWebView.postMessage(JSON.stringify({
          type: 'CLEAR_MAP_REQUEST'
        }));
      }
    };
  </script>
</body>
</html>`;


const handleMessage = (event) => {
    const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'CLEAR_MAP_REQUEST') {
    handleClear(); // 🔥 call your clear logic
  }

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

  // setAllCountryNames(countryNames);
  setCountryCoordinates(coordinatesMap);
}
if (data.type === 'COUNTRY_UNSELECTED') {
  const { country } = data;

  // Remove country from categoryCountries
  setCategoryCountries(prev => {
    const updated = { ...prev };
    Object.keys(updated).forEach(category => {
      if (updated[category][country]) {
        delete updated[category][country];
      }
    });
    return updated;
  });

  // Remove from countryCategoryMap too
  setCountryCategoryMap(prev => {
    const updated = { ...prev };
    Object.keys(updated).forEach(category => {
      if (updated[category][country]) {
        delete updated[category][country];
      }
    });
    return updated;
  });


}


  };
const handleCategoryPress = (category) => {
  setSelectedCategory(category);
  setSelectedProduct(null);

  const rawKeywords = category.includes('-')
    ? category.split('-').pop().trim().toLowerCase()
    : category.trim().toLowerCase();

  // Split by space and special characters (like '&', ',')
  const keywords = rawKeywords
    .split(/[\s,&]+/)
    .filter(Boolean)
    .map(word => word.slice(0, 3)); // Use first 3 letters of each keyword

  let filtered;

  if (keywords.length === 1) {
    // Single keyword - simple includes match
    filtered = products.filter(product =>
      product.labelname1.toLowerCase().includes(keywords[0])
    );
  } else {
    // Multiple keywords - match if at least 2 match
    filtered = products.filter(product => {
      const label = product.labelname1.toLowerCase();
      const matchCount = keywords.filter(k => label.includes(k)).length;
      return matchCount >= 2;
    });
  }

  setFilteredProducts(filtered);
};


const handleProductPress = (product) => {
  setSelectedProduct(product);
  const { label1_country, label2_country } = product;

  const validLabel1 = label1_country?.trim() || '';
  const validLabel2 = label2_country?.trim() || '';

     webviewRef.current.injectJavaScript(`selectCategory(${JSON.stringify(validLabel1)}, ${JSON.stringify(validLabel2)}); true;`);
};


  // const renderBackButton = (onPress) => (
  //   <TouchableOpacity onPress={onPress}>
  //   <Image source={{ uri: 'https://ansh.co.in/public/uploads/all_logos/arrow.png' }} style={styles.backButton} />
    
  //   </TouchableOpacity>
  // );
const renderBackButton = (onPress) => (
  <TouchableOpacity
    onPress={() => {
      // Send reset message to WebView
      if (webviewRef.current) {
        webviewRef.current.postMessage(JSON.stringify({ type: 'RESET_MAP' }));
      }

      // Reset selected product
      onPress();
    }}
  >
    <Image
      source={{ uri: 'https://ansh.co.in/public/uploads/all_logos/arrow.png' }}
      style={styles.backButton}
    />
  </TouchableOpacity>
);

  const renderCountryMarker = (country, label) => (
    <TouchableOpacity onPress={() => markCountryOnMap(country)}>
     <Text style={styles.countryText}> {country} <Text style={styles.pin}>📍</Text></Text>

    </TouchableOpacity>
  );
const markCountryOnMap = (countryName) => {
  if (webviewRef.current && countryName) {
    webviewRef.current.injectJavaScript(`
      window.zoomToCountry(${JSON.stringify(countryName)});
    `);
  }
};


  const renderProductDetail = () => {
    if (!selectedProduct) return null;
    return (
      <ScrollView>
      <View>
     
        <Text style={styles.detailTitle}>   {renderBackButton(() => setSelectedProduct(null))}{selectedProduct.product_name}</Text>
        <Text style={styles.label}>{selectedProduct.labelname1}</Text>
        
        {renderCountryMarker(selectedProduct.label1_country, 'label1')}
        {selectedProduct?.label2_country && (
  <>
    <Text style={styles.notes}>Also available in...</Text>
    {renderCountryMarker(selectedProduct.label2_country, 'label2')}
  </>
)}

        {selectedProduct?.notes ? (
  <Text style={styles.notes}>Notes:- <Text style={styles.notecontent}>{selectedProduct.notes}</Text></Text>
) : null}

      {selectedProduct.image ? (
 <TouchableOpacity onPress={() => setZoomImage(`https://ansh.co.in/public/uploads/product_files/${selectedProduct.image}`)}>
  <Image
    source={{ uri: `https://ansh.co.in/public/uploads/product_files/${selectedProduct.image}` }}
    style={styles.productImage}
  />
</TouchableOpacity>

) : null}


      </View>
      </ScrollView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
<Image
  source={
    know
      ? { uri: getImageUrl(know) }
      : { uri: 'https://ansh.co.in/mapp/uploads/our_images/anshin_know_final.jpg' }
  }
  style={styles.logo}
/>

        </TouchableOpacity>
        {worldMapImage ? (
                       <Image source={{ uri: getImageUrl(worldMapImage) }} style={styles.bannerImage} />
                     ) : (
          <Text style={styles.banner}>Know The World</Text>
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
      
      <View style={styles.categoryContainer}>
        {/* <View style={styles.topHeader}> */}
       <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
  <Text style={[styles.categoryHeader, { flex: 1 }]}>Know detail by category</Text>
  <TouchableOpacity
    onPress={() => Linking.openURL('https://www.youtube.com/watch?v=FziD1rpbChY&feature=youtu.be')}
  >
    <Image
      source={{ uri: 'https://ansh.co.in/mapp/uploads/our_images/learn1.gif' }}
      style={{ height: 50, width: 100, resizeMode: 'contain' }}
    />
  </TouchableOpacity>
</View>

{/* </View> */}
        {!selectedCategory && (
         <ScrollView contentContainerStyle={styles.scrollContent}>
  <Text style={styles.detailTitle}>Categories</Text>
  <View style={styles.twoColumnWrap}>
    {categories.map((item, index) => (
      <TouchableOpacity key={index} onPress={() => handleCategoryPress(item)} style={styles.columnItem}>
        <Image source={{ uri: 'https://ansh.co.in/public/uploads/all_logos/tickfinal.png' }} style={styles.tick} />
        <Text style={styles.categoryItemText}>{item}</Text>
      </TouchableOpacity>
    ))}
  </View>
</ScrollView>

        )}

        {selectedCategory && !selectedProduct && (
          <ScrollView>
            <Text style={styles.subHeader}> {renderBackButton(() => setSelectedCategory(''))}{selectedCategory}</Text>
          
          <View style={styles.twoColumnWrap}>
  {filteredProducts.map((p, idx) => (
    <TouchableOpacity key={idx} onPress={() => handleProductPress(p)} style={styles.columnItem}>
      <Image source={{ uri: 'https://ansh.co.in/public/uploads/all_logos/tickfinal.png' }} style={styles.tick} />
      
      <View>
        <Text style={styles.productLine1}>{p.product_name}</Text>
        {/* <Text style={styles.productLine2}>{p.labelname1}</Text> */}
      </View>
    </TouchableOpacity>
  ))}
  
</View>

</ScrollView>

        )}

        {selectedProduct && renderProductDetail()}
      </View>
      {zoomImage && (
  <View style={styles.modalOverlay}>
    <TouchableOpacity onPress={() => setZoomImage(null)} style={styles.modalClose}>
      <Text style={{ fontSize: 20, color: 'white' }}>Close</Text>
    </TouchableOpacity>
    <Image source={{ uri: zoomImage }} style={styles.zoomedImage} />
  </View>
)}
 {ads.length > 0 && (
                      <View style={ads.length === 2 ? styles.adsRow : styles.adsSingle}>
                        {ads.map((ad, i) => (
                          <Image
                            key={i}
                            source={{ uri: getImageUrl(ad) }}
                            style={ads.length === 2 ? styles.adBox : styles.adBoxFull}
                          />
                        ))}
                      </View>
                    )}

           <Text style={styles.copyright}>
  © {adImages.companyName ? adImages.companyName : 'ansh.co.in'}
</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  // map: { height: Dimensions.get('window').height * 0.5 },
  categoryContainer: { flex: 1, backgroundColor:'#CBE3FF',color:'#044490', paddingHorizontal: 15, paddingTop: 10 },
  categoryHeader: { fontSize: 20, fontWeight: 'bold', marginBottom: 8,color:'blue' },
  scrollContent: { paddingBottom: 20 },  map: { height: 310 },
  categoryItem: { fontSize: 20, paddingVertical: 4,fontWeight:'700',color:'blue' },
  productItem: { fontSize: 20,fontWeight:'700', paddingVertical: 4, color: 'blue' },
  twoColumnWrap: {
  flexDirection: 'row',pin: { fontSize: 28 }, // Make it bigger than default

  flexWrap: 'wrap',
  justifyContent: 'space-between',
},  copyright: {
    fontSize: 12,
    backgroundColor: '#044490',
    color: '#CBE3FF',

    padding:10,width:430,textAlign:'center'
  },
notes:{
fontSize:18,
fontWeight:'700'
},
notecontent:{
fontWeight:'400'
},
columnItem: {
  width: '48%',
  flexDirection: 'row',
  alignItems: 'flex-start',
  marginBottom: 10,
},
topHeader:{
display:'flex',
flexDirection:'column',
justifyContent:'space-between'
},
categoryItemText: {
  fontSize: 16,
  fontWeight:'500',
  color: 'blue',
  marginLeft: 5,
  flexShrink: 1,
},
productLine1: { fontSize: 16, fontWeight: '500', color: 'blue' },

  adsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  adsSingle: {
    alignItems: 'center',
    marginVertical: 10,
  },
  adBox: { width: '48%', height: 50, resizeMode: 'cover' },
  adBoxFull: { width: '90%', height: 50, resizeMode: 'cover' },
  // productList: { marginTop: 10 },
  tick:{height:15,width:15},
  subHeader: { fontSize: 20, fontWeight: 700,color:'#044490' },
  label: { fontSize: 16, marginTop: 10 },
  detailTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 10,color:'#044490' },
  countryText: {  fontSize: 20, marginVertical: 4 },
  productImage: { width: '100%', height: 200, resizeMode: 'contain', marginVertical: 10 },
  backButton: { height:20,width:20, marginTop:10 },
  backText: { fontSize: 16, color: 'blue' },
  header: { marginTop: 40, flexDirection: 'row', padding: 10,  backgroundColor:'#CBE3FF', alignItems: 'center' },
  logo: { width: 40, height: 40, resizeMode: 'contain' },
  banner: { marginLeft: 10, fontSize: 18, fontWeight: 'bold', backgroundColor: '#044490', color: 'white', paddingHorizontal: 20, paddingVertical: 10,height:45, borderRadius: 6, flex: 1, textAlign: 'center' },
  bannerImage: { height: 50, marginLeft: 10, borderRadius: 6, flex: 1 }
});

export default Know;