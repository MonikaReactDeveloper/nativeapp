

// import React, { useEffect, useState } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   StyleSheet,
//   Image,
//   TextInput,
// } from 'react-native';
// import axios from 'axios';

// const Play = () => {
//    const [products, setProducts] = useState([]);
//     const [selectedCategory, setSelectedCategory] = useState('');
//   const [questionCount, setQuestionCount] = useState('10');
//   const [optionCount, setOptionCount] = useState('2');
//   const [gameStarted, setGameStarted] = useState(false);
//   const [questions, setQuestions] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [score, setScore] = useState(0);
//   const [selectedAnswer, setSelectedAnswer] = useState(null);

//    useEffect(() => {
//     axios.get('https://ansh.co.in/qazxswm?api_key=52006ea8-c6d0-4219-93fb-b766007dcafa', { responseType: 'text' })
//       .then(response => {
//         const raw = response.data;
//         const matches = [...raw.matchAll(/\[list_name\] => (.+)/g)];
//         const listNames = matches.map(m => m[1]?.trim());
//         const uniqueSorted = [...new Set(listNames)].sort();
//         setCategories(uniqueSorted);
//       })
//       .catch(err => console.error('Fetch error:', err));
//   }, []);

//   useEffect(() => {
//     axios.get('https://ansh.co.in/qazxswm?api_key=52006ea8-c6d0-4219-93fb-b766007dcafa', { responseType: 'text' })
//       .then(response => {
//         const raw = response.data;
//         const productBlocks = raw.split('[product_name] => ').slice(1);
//         const productList = productBlocks.map(block => {
//           const name = block.split('\n')[0].trim();
//           const labelMatch = block.match(/\[labelname1\] => (.+)/);
//            const notes = block.match(/\[add_notes\] => (.+)/);
//           const label1 = block.match(/\[label1_country\] => (.+)/);
//           const label2 = block.match(/\[label2_country\] => (.+)/);
//           const image = block.match(/\[product_images\] => (.+)/);
//           return {
//             product_name: name,
//             labelname1: labelMatch ? labelMatch[1].trim() : '',
//              notes: notes ? notes[1].trim() : '',
//             label1_country: label1 ? label1[1].trim() : '',
//             label2_country: label2 ? label2[1].trim() : '',
//             image: image ? image[1].trim() : '',
//           };
//         });
//         setProducts(productList.sort((a, b) => a.product_name.localeCompare(b.product_name)));
//       })
//       .catch(err => console.error('Fetch error:', err));
//   }, []);
//   useEffect(() => {
//     if (gameStarted) {
//       const filtered = products.filter(p => p.labelname1.toLowerCase().includes(selectedCategory.toLowerCase()));
//       const shuffled = filtered.sort(() => 0.5 - Math.random()).slice(0, parseInt(questionCount));
//       const generated = shuffled.map((item, idx) => {
//         const correct = item.label1_country || item.label2_country;
//         const wrongOptions = [];
//         for (let i = 1; i < filtered.length && wrongOptions.length < parseInt(optionCount) - 1; i++) {
//           const wrong = filtered[(idx + i) % filtered.length].label1_country;
//           if (wrong !== correct && !wrongOptions.includes(wrong)) {
//             wrongOptions.push(wrong);
//           }
//         }
//         const options = [correct, ...wrongOptions].sort(() => 0.5 - Math.random());
//         return { ...item, correct, options };
//       });
//       setQuestions(generated);
//     }
//   }, [gameStarted]);

//   const handleAnswer = (answer) => {
//     setSelectedAnswer(answer);
//     if (answer === questions[currentIndex].correct) {
//       setScore(prev => prev + 1);
//     }
//     setTimeout(() => {
//       setSelectedAnswer(null);
//       setCurrentIndex(prev => prev + 1);
//     }, 1000);
//   };

//   if (!gameStarted) {
//     return (
//       <View style={styles.container}>
//         {/* <TouchableOpacity onPress={onBack}><Text style={styles.back}>⬅ Back</Text></TouchableOpacity> */}
//         <Text style={styles.header}>Start Quiz for {selectedCategory}</Text>
//         <TextInput placeholder="Number of Questions" keyboardType="number-pad" style={styles.input} value={questionCount} onChangeText={setQuestionCount} />
//         <TextInput placeholder="Options per Question" keyboardType="number-pad" style={styles.input} value={optionCount} onChangeText={setOptionCount} />
//         <TouchableOpacity style={styles.button} onPress={() => setGameStarted(true)}>
//           <Text style={styles.buttonText}>Start Game</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   if (currentIndex >= questions.length) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.header}>Quiz Complete!</Text>
//         <Text style={styles.score}>Your Score: {score}/{questions.length}</Text>
//         <TouchableOpacity style={styles.button} onPress={() => { setGameStarted(false); setCurrentIndex(0); setScore(0); }}>
//           <Text style={styles.buttonText}>Play Again</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   const current = questions[currentIndex];
//   return (
//     <View style={styles.container}>
//       <Text style={styles.score}>Score: {score}/{questions.length}</Text>
//       <Text style={styles.label}>Q{currentIndex + 1}: {current.product_name}</Text>
//       <Text style={styles.question}>Hint: {current.labelname1}</Text>
//       {current.options.map((opt, i) => (
//         <TouchableOpacity
//           key={i}
//           style={styles.option}
//           onPress={() => handleAnswer(opt)}
//           disabled={!!selectedAnswer}
//         >
//           <Text style={{ color: selectedAnswer === opt ? (opt === current.correct ? 'green' : 'red') : '#333' }}>
//             {opt === current.correct && selectedAnswer ? '✅' : ''}
//             {opt !== current.correct && selectedAnswer === opt ? '❌' : ''} {opt}
//           </Text>
//         </TouchableOpacity>
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { padding: 20, flex: 1 },
//   header: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
//   input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginVertical: 10 },
//   button: { backgroundColor: '#6a1b9a', padding: 12, borderRadius: 6, marginTop: 10 },
//   buttonText: { color: 'white', textAlign: 'center' },
//   score: { fontSize: 18, fontWeight: 'bold', marginBottom: 15 },
//   label: { fontSize: 16, fontWeight: '600' },
//   question: { fontSize: 14, color: '#555', marginBottom: 10 },
//   option: { backgroundColor: '#eee', padding: 10, borderRadius: 5, marginVertical: 5 },
//   back: { color: '#0066cc', marginBottom: 10 },
// });

// export default Play;
// import React, { useEffect, useState ,useRef} from 'react';
// import { WebView } from 'react-native-webview';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   ScrollView,
//   StyleSheet,
//   TextInput,Image
// } from 'react-native';
// import axios from 'axios';

// const Play = () => {
//   const [categories, setCategories] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState('');
//   const [questionCount, setQuestionCount] = useState('10');
//   const [optionCount, setOptionCount] = useState('2');
//   const [gameStarted, setGameStarted] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [questions, setQuestions] = useState([]);
// const webViewRef = useRef();
//   const [score, setScore] = useState(0);
// const [selectedAnswers, setSelectedAnswers] = useState({});
// const [scoredQuestions, setScoredQuestions] = useState({});

//   const [showSettings, setShowSettings] = useState(false);


//   useEffect(() => {
//     axios
//       .get('https://ansh.co.in/qazxswm?api_key=52006ea8-c6d0-4219-93fb-b766007dcafa', { responseType: 'text' })
//       .then((response) => {
//         const raw = response.data;
//         const matches = [...raw.matchAll(/\[list_name\] => (.+)/g)];
//         const listNames = matches.map((m) => m[1]?.trim());
//         const uniqueSorted = [...new Set(listNames)].sort();
//         setCategories(uniqueSorted);
//       })
//       .catch((err) => console.error('Fetch error:', err));
//   }, []);

//   // Get product data
//   useEffect(() => {
//     axios
//       .get('https://ansh.co.in/qazxswm?api_key=52006ea8-c6d0-4219-93fb-b766007dcafa', { responseType: 'text' })
//       .then((response) => {
//         const raw = response.data;
//         const productBlocks = raw.split('[product_name] => ').slice(1);
//         const productList = productBlocks.map((block) => {
//           const name = block.split('\n')[0].trim();
//           const labelMatch = block.match(/\[labelname1\] => (.+)/);
//           const notes = block.match(/\[add_notes\] => (.+)/);
//           const label1 = block.match(/\[label1_country\] => (.+)/);
//           const label2 = block.match(/\[label2_country\] => (.+)/);
//           const image = block.match(/\[product_images\] => (.+)/);
//           return {
//             product_name: name,
//             labelname1: labelMatch ? labelMatch[1].trim() : '',
//             notes: notes ? notes[1].trim() : '',
//             label1_country: label1 ? label1[1].trim() : '',
//             label2_country: label2 ? label2[1].trim() : '',
//             image: image ? image[1].trim() : '',
//           };
//         });
//         setProducts(productList);
//       })
//       .catch((err) => console.error('Product fetch error:', err));
//   }, []);

//   // Prepare quiz questions
//   useEffect(() => {
//     if (gameStarted) {
//       const filtered = products.filter((p) =>
//         p.labelname1.toLowerCase().includes(selectedCategory.toLowerCase())
//       );

//       const shuffled = [...filtered].sort(() => 0.5 - Math.random()).slice(0, parseInt(questionCount));

//       const generated = shuffled.map((item) => {
//         const correct = item.label1_country || item.label2_country;
//         const countryPool = filtered
//           .map(p => p.label1_country)
//           .filter(c => c && c !== correct);

//         const wrongOptions = [];
//         while (wrongOptions.length < parseInt(optionCount) - 1 && countryPool.length) {
//           const index = Math.floor(Math.random() * countryPool.length);
//           const option = countryPool.splice(index, 1)[0];
//           if (!wrongOptions.includes(option)) wrongOptions.push(option);
//         }

//         const options = [...wrongOptions, correct].sort(() => 0.5 - Math.random());
//         return { ...item, correct, options };
//       });

//       setQuestions(generated);
//     }
//   }, [gameStarted]);

// const handleAnswer = (index, answer) => {
//   const isCorrect = questions[index].correct === answer;

//   setSelectedAnswers((prev) => ({
//     ...prev,
//     [index]: {
//       answer,
//       isCorrect,
//     },
//   }));

//   // Only increment score once for each question
//   if (isCorrect && !scoredQuestions[index]) {
//     setScore((prev) => prev + 1);
//     setScoredQuestions((prev) => ({
//       ...prev,
//       [index]: true,
//     }));
//   }
// };


//   const resetGame = () => {
//     setGameStarted(false);
//     setCurrentIndex(0);
//     setScore(0);
//   };

//   if (!selectedCategory) {
//     return (
//       <ScrollView style={styles.container}>
//         <Text style={styles.title}>Quiz yourself</Text>
//         <Text style={styles.subtitle}>By Category</Text>
//         {categories.map((cat, i) => (
//           <TouchableOpacity
//             key={i}
//             style={styles.categoryButton}
//             onPress={() => setSelectedCategory(cat)}
//           >
          
//             <Text style={styles.categoryText}>
//                 <Image source={{ uri: 'https://ansh.co.in/public/uploads/all_logos/tickfinal.png' }} style={styles.tick} /> {i + 1}. {cat}</Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>
//     );
//   }

//   if (!gameStarted && selectedCategory) {
//     return (
//       <View style={styles.container}>
//         <View style={styles.map}>
//           <WebView
//   ref={webViewRef}
//    originWhitelist={['*']}
//             javaScriptEnabled
//             source={{ html: mapHtml }}
//             domStorageEnabled
//     allowFileAccess
//           />
//           </View>
//         <Text style={styles.title}>Quiz yourself</Text>
//         <Text style={styles.subtitle}>{selectedCategory}</Text>
//         <Text style={styles.label}>Select Game Settings</Text>

//         <Text style={styles.settingTitle}>How many questions?</Text>
//         {[5, 10, 15].map((q) => (
//           <TouchableOpacity key={q} onPress={() => setQuestionCount(q.toString())}>
//             <Text style={questionCount === q.toString() ? styles.radioSelected : styles.radio}>
//               ⭕ {q}
//             </Text>
//           </TouchableOpacity>
//         ))}

//         <Text style={styles.settingTitle}>How many options?</Text>
//         {[2, 4].map((o) => (
//           <TouchableOpacity key={o} onPress={() => setOptionCount(o.toString())}>
//             <Text style={optionCount === o.toString() ? styles.radioSelected : styles.radio}>
//               ⭕ {o}
//             </Text>
//           </TouchableOpacity>
//         ))}

//         <TouchableOpacity style={styles.button} onPress={() => setGameStarted(true)}>
//           <Text style={styles.buttonText}>Start Game</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//   <ScrollView style={styles.container}>
//     <Text style={styles.title}>Your Score: ({score}/{questions.length})</Text>
//     <Text style={styles.question}>Of {selectedCategory}</Text>
     

//     {questions.map((question, index) => {
//   const userSelection = selectedAnswers[index]?.answer;
//   const isCorrect = selectedAnswers[index]?.isCorrect;

//   return (
//     <View key={index} style={{ marginBottom: 25, backgroundColor: '#eee', padding: 10, borderRadius: 8 }}>
//       <Text style={styles.product}>{question.labelname1}</Text>
//       <Text style={styles.product}>Q{index + 1}: {question.product_name}</Text>

//       {question.options.map((opt, i) => {
//         const selected = userSelection === opt;
//         const correct = question.correct === opt;

//         return (
//           <TouchableOpacity
//             key={i}
//             style={[styles.option, selected && styles.optionSelected]}
//             onPress={() => handleAnswer(index, opt)}
//           >
//             <Text style={{
//               color: selected
//                 ? (correct ? 'green' : 'red')
//                 : '#222',
//               fontWeight: selected ? 'bold' : 'normal'
//             }}>
//               {selected && correct ? '✅ ' : ''}
//               {selected && !correct ? '❌ ' : ''}
//               {opt}
//             </Text>
//           </TouchableOpacity>
//         );
//       })}

//       {isCorrect && (
//         <View style={{ marginTop: 10, alignItems: 'flex-end' }}>
//           <Text style={{ fontWeight: 'bold' }}>✅ Details:</Text>
//           <Text>Label: {question.labelname1}</Text>
//           <Text>Correct Answer: {question.correct}</Text>
//           {question.product_images ? (
//             <Image
//               source={{ uri: question.product_images }}
//               style={{ width: 80, height: 80, borderRadius: 8, marginTop: 5 }}
//               resizeMode="cover"
//             />
//           ) : (
//             <Text>No image available</Text>
//           )}
//         </View>
//       )}
//     </View>
//   );
// })}

//     {Object.keys(selectedAnswers).length === questions.length && (
//       <TouchableOpacity style={styles.button} onPress={resetGame}>
//         <Text style={styles.buttonText}>Play Again</Text>
//       </TouchableOpacity>
//     )}
//   </ScrollView>
// );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1},
//   map:{height:330},
//   tick:{height:20,width:20},
//   title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: '#fff' },
//   subtitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#222' },
//   label: { fontSize: 16, fontWeight: 'bold', marginVertical: 10 },
//   settingTitle: { fontSize: 14, fontWeight: '600', marginTop: 10, color: '#333' },
//   radio: { fontSize: 16, color: '#555', padding: 4 },
//   radioSelected: { fontSize: 16, fontWeight: 'bold', color: '#000', padding: 4 },
//   categoryButton: { backgroundColor: '#e0d7ff', padding: 10, borderRadius: 5, marginBottom: 5 },
//   categoryText: { fontSize: 14, color: '#222' },
//   button: { backgroundColor: '#6a1b9a', padding: 12, borderRadius: 6, marginTop: 20 },
//   buttonText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
//   question: { fontSize: 15, marginBottom: 8, fontWeight: '600' },
//   product: { fontSize: 17, fontWeight: 'bold', marginBottom: 10 },
//   option: { backgroundColor: '#f3e5f5', padding: 10, borderRadius: 5, marginVertical: 5 },
// });

// export default Play;
import React, { useEffect, useState, useRef } from 'react';
import { WebView } from 'react-native-webview';import { Linking } from 'react-native';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
} from 'react-native';import { useMapContext } from '../Context/MapContext';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'; // Required for back & drawer

import ViewShot from 'react-native-view-shot';
import { useAppSetting } from '../Context/AppSettingContext';

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
          layer.setStyle({ fillColor: '#e6d1ff' });
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

    function selectCategory(label1) {
      selectedCategory = label1;
      resetHighlights();

      if (label1) markCountryWithColor(label1, '#f81c0dff'); 
   
    }

 window.selectCategory = selectCategory;
window.markCountryWithColor = markCountryWithColor;
window.highlightCountry = function (country, color) {
  markCountryWithColor(country, color);
};
function zoomToCountry(countryName) {
  const layer = Object.values(labelCountryMap).find(
    (layer) => layer.options && layer.options.name === countryName
  );

  if (layer) {
    map.fitBounds(layer.getBounds());
    layer.setStyle({ fillColor: 'yellow', color: 'red' });
    setTimeout(() => {
      layer.setStyle({ fillColor: '#3388ff', color: '#3388ff' }); // Reset style
    }, 3000);
  }
}


    function style(feature) {
      return { fillColor: '#e6d1ff', color: 'black', weight: 1, fillOpacity: 1 };
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



const Play = () => {
  const navigation = useNavigation();
   const { webviewRef, viewShotRef } = useMapContext();
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [questionCount, setQuestionCount] = useState('10');
  const [optionCount, setOptionCount] = useState('2');
  const [gameStarted, setGameStarted] = useState(false);
  const [products, setProducts] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
   const [countryCoordinates, setCountryCoordinates] = useState({});
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [scoredQuestions, setScoredQuestions] = useState({});
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
  
  ad1, ad2, play, companyName
} = adImages;
 const ads = [ad1, ad2].filter(Boolean);

  useEffect(() => {
    axios.get('https://ansh.co.in/qazxswm?api_key=52006ea8-c6d0-4219-93fb-b766007dcafa', { responseType: 'text' })
      .then(response => {
        const raw = response.data;
        const matches = [...raw.matchAll(/\[list_name\] => (.+)/g)];
        const listNames = matches.map((m) => m[1]?.trim());
        const uniqueSorted = [...new Set(listNames)].sort();
        setCategories(uniqueSorted);
      })
      .catch(err => console.error('Fetch error:', err));
  }, []);

  useEffect(() => {
    axios.get('https://ansh.co.in/qazxswm?api_key=52006ea8-c6d0-4219-93fb-b766007dcafa', { responseType: 'text' })
      .then((response) => {
        const raw = response.data;
        const productBlocks = raw.split('[product_name] => ').slice(1);
        const productList = productBlocks.map((block) => {
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
        setProducts(productList);
      })
      .catch(err => console.error('Product fetch error:', err));
  }, []);

  useEffect(() => {
    if (gameStarted) {
      const filtered = products.filter((p) =>
        p.labelname1.toLowerCase().includes(selectedCategory.toLowerCase())
      );

      const shuffled = [...filtered].sort(() => 0.5 - Math.random()).slice(0, parseInt(questionCount));

   
const generated = shuffled
  .filter(item => item.label1_country || item.label2_country) // filter out empty correct answers
  .map((item) => {
    const correct = item.label1_country || item.label2_country;

    const countryPool = filtered
      .map(p => p.label1_country || p.label2_country)
      .filter(c => c && c !== correct);

    const wrongOptions = [];
    while (wrongOptions.length < parseInt(optionCount) - 1 && countryPool.length) {
      const index = Math.floor(Math.random() * countryPool.length);
      const option = countryPool.splice(index, 1)[0];
      if (option && !wrongOptions.includes(option)) wrongOptions.push(option);
    }

    const options = [...wrongOptions, correct].sort(() => 0.5 - Math.random());
    return { ...item, correct, options };
  });

      setQuestions(generated);
    }
  }, [gameStarted]);

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
  const handleAnswer = (index, answer) => {
  const question = questions[index];
  const isCorrect = question.correct === answer;

  setSelectedAnswers((prev) => ({
    ...prev,
    [index]: {
      answer,
      isCorrect,
    },
  }));
  const highlightCountry = isCorrect ? question.correct : answer;
  const color = isCorrect ? 'green' : 'red';

  if (highlightCountry && webviewRef.current) {
    webviewRef.current.injectJavaScript(
      `selectCategory(${JSON.stringify(highlightCountry)}, ${JSON.stringify(color)}); true;`
    );
  }


  if (isCorrect && !scoredQuestions[index]) {
    setScore((prev) => prev + 1);
    setScoredQuestions((prev) => ({
      ...prev,
      [index]: true,
    }));
      setActiveQuestionIndex(index);
       // 🔥 update active question index
  }

  // Send message to WebView to mark selected country
  // webViewRef.current?.postMessage(
  //   JSON.stringify({
  //     action: 'mark',
  //     country: selectedOption,
  //     color: isCorrect ? 'green' : 'red',
  //   })
  // );
};


  const resetGame = () => {
    setGameStarted(false);
    setScore(0);
    setSelectedAnswers({});
    setScoredQuestions({});
  };

  const HeaderWithMap = () => (
    <>
      <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image
              source={
                play
                  ? { uri: getImageUrl(play) }
                  : { uri: 'https://ansh.co.in/mapp/uploads/our_images/anshin_play_final.jpg' }
              }
              style={styles.logo}
            />
            </TouchableOpacity>
             {worldMapImage ? (
                                  <Image source={{ uri: getImageUrl(worldMapImage) }} style={styles.bannerImage} />
                                ) : (
              <Text style={styles.banner}>World Play</Text>
            )}
          </View>
     
    </>
  );

  // Category Selection Screen
 const renderContent = () => {
  // 1️⃣ CATEGORY SELECTION SCREEN
  if (!selectedCategory) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.bottomSction}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.title}>Quiz yourself</Text>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL('https://www.youtube.com/watch?v=FziD1rpbChY&feature=youtu.be')
              }
            >
              <Image
                source={{ uri: 'https://ansh.co.in/mapp/uploads/our_images/learn1.gif' }}
                style={{ height: 50, width: 100, resizeMode: 'contain' }}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.subtitle}> By Category</Text>

          <View style={styles.gridWrapper}>
            {categories.map((cat, i) => (
              <View key={i} style={styles.categoryWrapper}>
                <TouchableOpacity
                  style={styles.categoryButton}
                  onPress={() => setSelectedCategory(cat)}
                >
                  <Text style={styles.categoryText}>
                    <Image
                      source={{
                        uri: 'https://ansh.co.in/public/uploads/all_logos/tickfinal.png',
                      }}
                      style={styles.tick}
                    />
                    {i + 1}. {cat}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    );
  }

  // 2️⃣ SETTINGS SCREEN
  if (!gameStarted) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.bottomSction}>
          <Text style={styles.title}>Quiz yourself</Text>
          <View style={styles.topHeader}>
            <TouchableOpacity
              onPress={() => setSelectedCategory(null)}
             
            >
              <Image
                source={{ uri: 'https://ansh.co.in/public/uploads/all_logos/arrow.png' }}
                style={styles.backlogo}
              />
            </TouchableOpacity>

            <View
              style={{
                flexDirection: 'row',
             justifyContent:'space-evenly',
             gap:30
               
              }}
            >
              <Text style={styles.subtitle}>{selectedCategory}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => setGameStarted(true)}
              >
                <Text style={styles.buttonText}>Start Game</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL('https://www.youtube.com/watch?v=FziD1rpbChY&feature=youtu.be')
                }
              >
                <Image
                  source={{ uri: 'https://ansh.co.in/mapp/uploads/our_images/learn1.gif' }}
                  style={{ height: 50, width: 100, resizeMode: 'contain' }}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              backgroundColor: '#fff',
              margin: 10,
              borderRadius: 10,
            }}
          >
            {/* Left: Settings */}
            <View style={[styles.suboption, { flex: 1 }]}>
              <Text style={styles.label}>Select Game Settings</Text>

              <Text style={styles.settingTitle}>How many questions?</Text>
              {[5, 10, 15].map((q) => (
                <TouchableOpacity key={q} onPress={() => setQuestionCount(q.toString())}>
                  <Text style={questionCount === q.toString() ? styles.radioSelected : styles.radio}>
                    ⭕ {q}
                  </Text>
                </TouchableOpacity>
              ))}

              <Text style={styles.settingTitle}>How many options?</Text>
              {[2, 4].map((o) => (
                <TouchableOpacity key={o} onPress={() => setOptionCount(o.toString())}>
                  <Text style={optionCount === o.toString() ? styles.radioSelected : styles.radio}>
                    ⭕ {o}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Right: GIF */}
            <View style={{ width: 200, height: 260 }}>
              <WebView
                source={{
                  html: `
                    <html>
                      <body style="margin:0; padding:0; background:transparent;">
                        <img 
                          src="https://ansh.co.in/public/uploads/coin_ansh_globe.gif" 
                          style="background:transparent; width:80%; height:80%;" 
                        />
                      </body>
                    </html>
                  `,
                }}
                style={{ width: 260, height: 260, backgroundColor: 'transparent' }}
                originWhitelist={['*']}
                javaScriptEnabled={true}
                scrollEnabled={false}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }

  // 3️⃣ QUIZ SCREEN
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.bottomSction}>
        {selectedAnswers[activeQuestionIndex]?.isCorrect && (
          <View style={styles.fixedDetailCard}>
            <Text style={{ fontSize: 10 }}>
              {questions[activeQuestionIndex].labelname1}
            </Text>
            <View style={styles.detailOption}>
              <TouchableOpacity
  onPress={() => {
    const selectedCountry = questions[activeQuestionIndex]?.correct;
    if (selectedCountry) {
      webviewRef.current.injectJavaScript(`zoomToCountry(${JSON.stringify(selectedCountry)}); true;`);
    }
  }}
>
  <Text style={{ fontSize: 10 }}>
    <Image
      source={{ uri: 'https://ansh.co.in/public/uploads/all_logos/tickfinal.png' }}
      style={styles.tick}
    />{' '}
    {questions[activeQuestionIndex]?.correct} 📍
  </Text>
</TouchableOpacity>

              <Image
                source={{
                  uri: `https://ansh.co.in/public/uploads/product_files/${questions[activeQuestionIndex].image}`,
                }}
                style={styles.detailImage}
              />
            </View>
          </View>
        )}

        <ScrollView style={styles.container}>
          <View style={styles.topHeader}>
            <TouchableOpacity onPress={() => setGameStarted(false)} >
              <Image
                source={{ uri: 'https://ansh.co.in/public/uploads/all_logos/arrow.png' }}
                style={styles.backlogo}
              />
            </TouchableOpacity>

            <Text style={styles.title}>Your Score: ({score}/{questions.length})</Text>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL('https://www.youtube.com/watch?v=FziD1rpbChY&feature=youtu.be')
              }
            >
              <Image
                source={{ uri: 'https://ansh.co.in/mapp/uploads/our_images/learn1.gif' }}
                style={{ height: 50, width: 50, resizeMode: 'contain' }}
              />
            </TouchableOpacity>
          </View>

          <Text style={styles.question}>Of {selectedCategory}</Text>

          {questions.map((question, index) => {
            const userSelection = selectedAnswers[index]?.answer;
            const isCorrect = selectedAnswers[index]?.isCorrect;

            return (
              <View key={index} style={{ marginBottom: 5, padding: 10, borderRadius: 8 }}>
                {index === 0 && (
                  <Text style={styles.product}>{question.labelname1}</Text>
                )}

                <Text style={styles.product}>Q{index + 1}: {question.product_name}</Text>

                <View style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                }}>
                  {question.options.map((opt, i) => {
                    const selected = userSelection === opt;
                    const correct = question.correct === opt;

                    return (
                      <TouchableOpacity
                        key={i}
                        style={[
                          styles.option,
                          selected && styles.optionSelected,
                          { width: '45%' }
                        ]}
                        onPress={() => handleAnswer(index, opt)}
                      >
                        <View style={styles.optionContent}>
                          <View style={styles.radioOuter}>
                            {selected && <View style={styles.radioInner} />}
                          </View>
                          <Text style={{ fontWeight: 'bold', flex: 1,color:'#4c02a3' }}>{opt}</Text>
                          {selected && (
                            <Text style={{ fontSize: 16 }}>
                              {correct ? (
                                <Image
                                  source={{
                                    uri: 'https://ansh.co.in/public/uploads/all_logos/tickfinal.png'
                                  }}
                                  style={styles.tick}
                                />
                              ) : '❌'}
                            </Text>
                          )}
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            );
          })}

          {Object.keys(selectedAnswers).length === questions.length && (
            <TouchableOpacity style={styles.button} onPress={resetGame}>
              <Text style={styles.buttonText}>Play Again</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

return (
  <View style={{ flex: 1 }}>
    {/* 🔝 Header always visible */}
    <HeaderWithMap  />
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
    {/* 📦 Dynamic content */}
    {renderContent()}
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

}

const styles = StyleSheet.create({
  container: { flex: 1,color:'#4c02a3',backgroundColor:'#e6d1ff' },
  bottomSction:{backgroundColor:'#e6d1ff',flex:1,color:'#4c02a3'},
  topHeader:{flexDirection:'row',alignItems:'center'},
   copyright: {
    fontSize: 14,fontWeight:600,
    backgroundColor: '#4c02a3',
    color: '#e6d1ff',

    padding:10,width:430,textAlign:'center'
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
  logo: { width: 40, height: 40 },
  suboption:{padding:10,marginTop:20,marginBottom:30,height:370,color:'#4c02a3'},
   backlogo: { width: 25,height:25,margin:10 },
header: { marginTop: 40, flexDirection: 'row', padding: 10, backgroundColor: '#e6d1ff', alignItems: 'center' },
  map: { height: 330 },
  tick: { height: 20, width: 20 },
  title: { fontSize: 20, fontWeight: 'bold', margin: 10, color: '#4c02a3' ,margin:10,marginBottom:8},
  subtitle: { fontSize: 18, fontWeight: 'bold', marginBottom:10, color: '#4c02a3',paddingLeft:10 },
  label: { fontSize: 16, fontWeight: 'bold', marginVertical: 10 },gridWrapper: {
  flexDirection: 'row', // Make it bigger than default
margin:10,
  flexWrap: 'wrap',
  justifyContent: 'space-between',
},
  option: {
    borderRadius: 8,
    // marginVertical: 4,
   
  },fixedDetailCard: {
  position: 'absolute',
  top: -50, // adjust as needed
  right: 2,
  zIndex: 999,
  backgroundColor: '#fff',
  padding: 2,
  borderRadius: 8,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 3,
  elevation: 5,
  width: 160
},
detailOption: {
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: 5
},
detailImage: {
  width: 150,
  height: 100,
  resizeMode: 'contain',
  marginTop: 5
}
,


  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    
    color:'#4c02a3'
  },
  radioOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#555',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: 'black',
  },
categoryWrapper: {
  width: '48%', // roughly half width
  marginBottom: 5,
},

  settingTitle: { fontSize: 14, fontWeight: '600', marginTop: 10, color: '#333' },
  radio: { fontSize: 16, color: '#555', padding: 4 },
  radioSelected: { fontSize: 16, fontWeight: 'bold', color: '#000', padding: 4 },
  // categoryButton: { backgroundColor: '#e0d7ff', padding: 10, borderRadius: 5, marginBottom: 5 },
  categoryText: { fontSize: 16, fontWeight:700,color:'#4c02a3',paddingVertical:4 },
  button: { backgroundColor: '#4c02a3', borderRadius: 6,textAlign:'center',paddingVertical:10,paddingHorizontal:10 },
  buttonText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
  question: { fontSize: 15, fontWeight: '600',marginLeft:'10',color:'#4c02a3' },
  product: { fontSize: 15, fontWeight: 'bold',width:'55%',marginBottom:10,color:'#4c02a3' },
  option: { padding: 5, borderRadius: 5,color:'#4c02a3' },
   banner: { marginLeft: 10, fontSize: 18, fontWeight: 'bold', backgroundColor: '#4c02a3', color: 'white', paddingHorizontal: 20, paddingVertical: 10, height:45,borderRadius: 6, flex: 1, textAlign: 'center' },
  bannerImage: { height: 50, marginLeft: 10, borderRadius: 6, flex: 1 }
});

export default Play;
