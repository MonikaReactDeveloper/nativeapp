// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import image1 from '../Screens/assets/logo.png'

// const SettingsScreen = () => {
//   const [images, setImages] = useState({
//     companyBanner: null,
//     companyIcon:null,
//     markLogo: null,
//     knowLogo: null,
//     playLogo: null,
//     adBanner1: null,
//     adBanner2: null,
//   });

//   const pickImage = async (key) => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setImages((prev) => ({
//         ...prev,
//         [key]: result.assets[0].uri,
//       }));
//     }
//   };

//   const handleSave = () => {
//     // Replace this with logic to save images (e.g., to FileSystem or backend)
//     Alert.alert('Saved', 'Images saved successfully.');
//     console.log(images);
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
    

//       {[
//          { label: 'icon', key: 'companyIcon' },
//         { label: 'Banner', key: 'companyBanner' },
//         { label: 'Mark', key: 'markLogo' },
//         { label: 'Know', key: 'knowLogo' },
//         { label: 'Play', key: 'playLogo' },
//         { label: 'Ads 1', key: 'adBanner1' },
//         { label: 'Ads 2', key: 'adBanner2' },
//       ].map(({ label, key }) => (
//         <View key={key} style={styles.row}>
//           <TouchableOpacity style={styles.button} onPress={() => pickImage(key)}>
//             <Text style={styles.buttonText}>{label}</Text>
//           </TouchableOpacity>
//           {images[key] && (
//             //  <Image source={require('./assets/logo.png')} style={styles.imagePreview}/>
//             <Image source={{ uri: images[key] }} style={styles.imagePreview} />
//           )}
//         </View>
//       ))}

//       <TouchableOpacity style={[styles.button, styles.save]} onPress={handleSave}>
//         <Text style={styles.buttonText}>Save All</Text>
//       </TouchableOpacity>
      
//       <TouchableOpacity style={[styles.button, styles.save]} onPress={handleSave}>
//         <Text style={styles.buttonText}>Generate APK</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// export default SettingsScreen;

// const styles = StyleSheet.create({
//   container: {
//     paddingTop: 10,
//     marginTop:50,
//     paddingHorizontal: 20,
//     backgroundColor: '#f0f4f7',
//     alignItems: 'center',
//   },
//   heading: {
//     fontSize: 22,
//     fontWeight: '700',
//     marginBottom: 30,
//     color: '#344e41',
//   },
//   row: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//     width: '100%',
//     justifyContent: 'space-evenly',
//   },
//   button: {
//     backgroundColor: '#00AEEF',
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     borderRadius: 10,
//     width:130,
//     marginRight: 10,
   
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: '600',
//     fontSize: 14,
//     textAlign:'center'
//   },
//   imagePreview: {
//     width: 40,
//     height: 40,
//     borderRadius: 6,
//     backgroundColor: '#ccc',
//   },
//   save: {
//     backgroundColor: '#2ecc71',
//     marginTop: 30,
//     width: 130,
//     alignItems: 'center',
//   },
// });
// SettingsScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useMapContext } from '../Context/MapContext';

const SettingsScreen = () => {
  const { saveImages } = useMapContext();

  const [images, setImages] = useState({
    companyBanner: null,
    companyIcon: null,
    markLogo: null,
    knowLogo: null,
    playLogo: null,
    adBanner1: null,
    adBanner2: null,
  });

  const pickImage = async (key) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImages((prev) => ({
        ...prev,
        [key]: result.assets[0].uri,
      }));
    }
  };

  const handleSave = () => {
    saveImages(images); // ⬅ Save to global MapContext
    Alert.alert('Saved', 'Images saved successfully.');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {[
        { label: 'Icon', key: 'companyIcon' },
        { label: 'Banner', key: 'companyBanner' },
        { label: 'Mark', key: 'markLogo' },
        { label: 'Know', key: 'knowLogo' },
        { label: 'Play', key: 'playLogo' },
        { label: 'Ads 1', key: 'adBanner1' },
        { label: 'Ads 2', key: 'adBanner2' },
      ].map(({ label, key }) => (
        <View key={key} style={styles.row}>
          <TouchableOpacity style={styles.button} onPress={() => pickImage(key)}>
            <Text style={styles.buttonText}>{label}</Text>
          </TouchableOpacity>
          {images[key] && <Image source={{ uri: images[key] }} style={styles.imagePreview} />}
        </View>
      ))}

      <TouchableOpacity style={[styles.button, styles.save]} onPress={handleSave}>
        <Text style={styles.buttonText}>Save All</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    marginTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#f0f4f7',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
    justifyContent: 'space-evenly',
  },
  button: {
    backgroundColor: '#00AEEF',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    width: 130,
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
    textAlign: 'center',
  },
  imagePreview: {
    width: 40,
    height: 40,
    borderRadius: 6,
    backgroundColor: '#ccc',
  },
  save: {
    backgroundColor: '#2ecc71',
    marginTop: 30,
    width: 130,
    alignItems: 'center',
  },
});

