
import React, { useRef, useState,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity,Alert, Image, ScrollView, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { RadioButton } from 'react-native-paper';
import { useWindowDimensions } from 'react-native';
import { useMapContext } from '../Context/MapContext';
import ViewShot from 'react-native-view-shot';
import { loadContinentData } from '../utils/loadContinentData';
import Feather from 'react-native-vector-icons/Feather';
import { useAppSetting } from '../Context/AppSettingContext';
import axios from 'axios';



const continentColors = {
  'Europe': '#fbc276',
  'Australia': '#FFFFFF',
  'Asia': '#66cc66',
  'Africa': '#ffff66',
  'North America': '#1338BE',
  'South America': '#ff3333',
};

const MapScreen = ({ navigation }) => {
//  const { categoryCountry, setCategoryCountry } = useMapContext();
const { countryCategoryMap, setCountryCategoryMap, countryCounts, setCountryCounts, legendLabels, setLegendLabels, countryToContinentMap, setCountryToContinentMap, } = useMapContext();
const { webviewRef, viewShotRef } = useMapContext();
const { categoryColors } = useMapContext();
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
    const { appId } = useAppSetting();
  const [adImages, setAdImages] = useState({ ad1: '', ad2: '',worldMapImage:'',companyName:'',mark:'' });


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
 worldMapImage,
  
  ad1, ad2, mark, companyName
} = adImages;
 const ads = [ad1, ad2].filter(Boolean);

  const CONTINENT_TO_CATEGORY_MAP = {
  Europe: 'List 1 (Sun)',
  Australia: 'List 2 (Air)',
  Asia: 'List 3 (Trees)',
  Africa: 'List 4 (Land)',
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
const decrementCountryCount = (country, webviewRef, countryClickCounts, setCountryClickCounts) => {
  setCountryClickCounts(prevCounts => {
    const updatedCounts = { ...prevCounts };
    const current = updatedCounts[country] || 0;

    if (current <= 1) {
      delete updatedCounts[country];
    } else {
      updatedCounts[country] = current - 1;
    }

    return updatedCounts;
  });

  setCategoryCountries(prevCategories => {
    const updated = { ...prevCategories };

    Object.entries(updated).forEach(([category, countries]) => {
      if (countries[country]) {
        const newCount = countries[country] - 1;

        if (newCount <= 0) {
          delete updated[category][country];

          // ✅ Inject JS to remove color from the map
          if (webviewRef?.current) {
            webviewRef.current.injectJavaScript(`
              if (window.countryLayers && countryLayers[${JSON.stringify(country)}]) {
                countryLayers[${JSON.stringify(country)}].setStyle({ fillColor: '#C0C0C0' });
              }
              true;
            `);
          }

        } else {
          updated[category][country] = newCount;
        }
      }
    });

    return updated;
  });
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

  setAllCountryNames(countryNames);
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

  // Also reset countryClickCounts
  setCountryClickCounts(prev => {
    const updated = { ...prev };
    delete updated[country];
    return updated;
  });

  // Optionally reset countryToContinentMap
  setCountryToContinentMap(prev => {
    const updated = { ...prev };
    delete updated[country];
    return updated;
  });
}


  };
 const handleClear = () => {
  const clearedMap = {
    'List 1 (Sun)': {},
    'List 2 (Air)': {},
    'List 3 (Trees)': {},
    'List 4 (Land)': {},
    'List 5 (Water)': {},
    'List 6 (Core)': {},
  };
  setCountryCategoryMap(clearedMap);
  setCategoryCountries(clearedMap); // ✅ reset list view
  setCountryCounts({});
  setLegendLabels({});

  if (webviewRef?.current) {
    webviewRef.current.injectJavaScript(`
      if (typeof countryLayers === 'object') {
        Object.values(countryLayers).forEach(layer => {
          layer.setStyle({ fillColor: '#C6EFCE' });
        });
      }
      true;
    `);
  }

  
};

 useEffect(() => {
  setCountryCategoryMap(categoryCountries);

  const newCounts = {};
  Object.keys(categoryCountries).forEach((category) => {
    Object.entries(categoryCountries[category]).forEach(([country, count]) => {
      newCounts[country] = (newCounts[country] || 0) + count;
    });
  });
  setCountryCounts(newCounts);

  const labels = {};
  Object.keys(categoryCountries).forEach((category) => {
    labels[category] = categoryColors[category];
  });

  Object.keys(countryCategoryMap).forEach((category) => {
    if (!labels[category]) {
      labels[category] = categoryColors[category] || '#C0C0C0';
    }
  });

  setLegendLabels(labels);
}, [categoryCountries, countryCategoryMap]);
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
// useEffect(() => {
//   setCategoryCountries(countryCategoryMap);
// }, [countryCategoryMap]);


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
    }#bottomGif {
  position: fixed;
  bottom: 10px;
  right: 10px;
  width: 50px;
  height: 50px;
  z-index: 1001;
  cursor: pointer;
}

    #zoomIn { bottom: 90px; }
    #zoomOut { bottom: 60px; }
    #reset { bottom: 30px; }
    #clearMap { bottom: 5px }

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

<a href="https://www.youtube.com/watch?v=FziD1rpbChY&feature=youtu.be" target="_blank">
  <img
    src="https://ansh.co.in/mapp/uploads/our_images/learn1.gif"
    id="bottomGif"
    alt="Learn More"
  />
</a>



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
      return { fillColor: '#C6EFCE', color: 'black', weight: 1, fillOpacity: 1 };
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
    // Unselect the country
    this.setStyle({ fillColor: '#C6EFCE' });

    if (window.ReactNativeWebView) {
      window.ReactNativeWebView.postMessage(JSON.stringify({
        type: 'COUNTRY_UNSELECTED',
        country: countryName,
      }));
    }
  } else {
    // Select the country
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

    function selectCategory(category, color) {
      selectedCategory = category;
      selectedColor = color;
    }

    window.selectCategory = selectCategory;
    function markCountryWithColor(country, color) {
  const layer = countryLayers[country];
  if (layer) {
    layer.setStyle({ fillColor: '#ffffff' });
  }
}
window.markCountryWithColor = markCountryWithColor;


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

  const renderCategoryList = () => (
   Object.keys(categoryColors)
  .filter(category => category && categoryCountries[category])
  .map((category, index) => (

      <View
        key={index}
        style={[
          styles.listItem,
          { backgroundColor: selectedCategory === category ? '#a2d8adff' : '#C6EFCE',marginLeft:10 },
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
   <Text>
  {categoryNames[category]} ({Object.keys(categoryCountries[category] || {}).length})
</Text>
  </TouchableOpacity>
)}

        </TouchableOpacity>
<TouchableOpacity
  onPress={handleSort}
  style={{
    marginTop: 0,
    alignSelf: 'flex-end',
    marginRight: 10,
    marginBottom: 10,
    padding: 5,
    backgroundColor: '#266532',
    borderRadius: 6,
  }}
>
  <Feather
    name={isSorted ? 'arrow-up' : 'arrow-down'}  // Change these icons as preferred
    size={18}
    color="#fff"
  />
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

     <TouchableOpacity
  onPress={() => {
    setCategoryCountries((prev) => {
      const updated = { ...prev };
      updated[selectedCategory][country] = (updated[selectedCategory][country] || 0) + 1;
      return updated;
    });
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
</TouchableOpacity>

<TouchableOpacity
  onPress={() => {
    setCategoryCountries((prev) => {
      const updated = { ...prev };
      const current = updated[selectedCategory][country] || 0;
      
      if (current <= 1) {
        delete updated[selectedCategory][country];

        // 🔥 Unmark country on the map
        if (webviewRef?.current) {
          webviewRef.current.injectJavaScript(`
            if (window.countryLayers && countryLayers[${JSON.stringify(country)}]) {
              countryLayers[${JSON.stringify(country)}].setStyle({ fillColor: '#C0C0C0' });
            }
            true;
          `);
        }

      } else {
        updated[selectedCategory][country] = current - 1;
      }

      return updated;
    });

    // Also update countryClickCounts
    setCountryClickCounts(prev => {
      const updatedCounts = { ...prev };
      if (updatedCounts[country] <= 1) {
        delete updatedCounts[country];
      } else {
        updatedCounts[country] -= 1;
      }
      return updatedCounts;
    });
  }}
>
  <Text style={{ fontSize: 12 }}>{country}</Text>
</TouchableOpacity>


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
    {Object.keys(continentColors).map((continent, index) => {
      const color = continentColors[continent] || '#C0C0C0';
      return (
        <View key={index} style={styles.continentBlock}>
          <TouchableOpacity onPress={() => setSelectedContinent(continent)}>
            <Text style={styles.continentTitle}>{continent}</Text>
          </TouchableOpacity>

          {selectedContinent === continent && (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 10 }}>
              {continentCountryMap[continent]?.map((country, i) => (
                <View
                  key={`${continent}-${i}`}
                  style={{
                    width: '33.33%',
                    marginBottom: 8,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                >
                  {/* Increment Counter + Mark Country */}
                  <TouchableOpacity
                    onPress={() => {
                      incrementCountryCount(country); // existing method
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

                  {/* Decrement Counter */}
                  <TouchableOpacity
                    onPress={() =>
                      decrementCountryCount(country, webviewRef, countryClickCounts, setCountryClickCounts)
                    }
                  >
                    <Text style={{ fontSize: 12 }}>{country}</Text>
                  </TouchableOpacity>
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
  source={
    mark
      ? { uri: getImageUrl(mark) }
      : { uri: 'https://ansh.co.in/mapp/uploads/our_images/anshin_mark_final.jpg' }
  }
  style={styles.logo}
/>

          </TouchableOpacity>
             {worldMapImage ? (
                <Image source={{ uri: getImageUrl(worldMapImage) }} style={styles.bannerImage} />
              ) : (
                <Text style={styles.banner}>M app</Text>
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
             onPress={() => {
    handleClear(); // Clear selection
    setSelectedOption('category');
  }}
            />
            <Text>By Category</Text>
          </View>

          <View style={styles.radioOption}>
            <RadioButton
              value="continent"
              status={selectedOption === 'continent' ? 'checked' : 'unchecked'}
             onPress={() => {
    handleClear(); // Clear selection
    setSelectedOption('continent');
  }}
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
  © {companyName ? companyName : 'ansh.co.in'}
</Text>
  
        </ScrollView>

 

          
      </>
    );
  } else {

    return (
      <View style={styles.landscapeWrapper}>

        <View style={styles.leftPane}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <Image
  source={
    images.markLogo
      ? { uri: images.markLogo }
      : { uri: 'https://ansh.co.in/mapp/uploads/our_images/anshin_mark_final.jpg' }
  }
  style={styles.logo}
/>
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
    marginTop: 40,
    flexDirection: 'row',
    padding: 10,
    backgroundColor:'#C6EFCE',
    alignItems: 'center',
  },
  logo: { width: 40, height: 40, resizeMode: 'contain' },
  banner: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#266532',
    color: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 6,
    flex: 1,
    height:45,
    textAlign: 'center',
  },
  bannerImage:{
   height:40,
   marginLeft:10,
   borderRadius:6,
    flex:1,
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

  flexGrow: 1, 
    backgroundColor: '#C6EFCE',
     color: '#266532',
 
},

  
  searchAndToggleRow: {
  
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding:0,
    gap: 10,
      backgroundColor: '#C6EFCE',
     color: '#266532',
  },
  searchBar: {
    
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
color: '#266532',
    flexDirection: 'column',
    alignItems: 'flex-start',
    padding: 5,
    fontWeight:600,
    backgroundColor: '#C6EFCE',

    borderRadius: 6,
  },
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
  copyright: {
    fontSize: 14,
    fontWeight:600,
    padding:10,
    backgroundColor: '#266532',
    color: '#C6EFCE',width:450,textAlign:'center'
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
    //    backgroundColor: '#C6EFCE',
    //  color: '#266532',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  continentTitle: {
    fontSize: 18,
    fontWeight: '700',
     backgroundColor: '#C6EFCE',
     color: '#266532',
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
