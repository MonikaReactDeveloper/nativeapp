
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, ScrollView, TextInput} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useMapContext } from '../Context/MapContext';
import { useAppSetting } from '../Context/AppSettingContext';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';


const SettingsScreen = () => {
  const [adminData, setAdminData] = useState({
  companyName: '',
  email: '',
  phone: '',
  page1: '',
  page1_link: '',
  page2:'',
  page2_link:'',
  page3:'',
  page3_link:'',
  page4:'',
  page4_link:'',
  page5:'',
  page5_link:'',
  page6:'',
  page6_link:'',
  appId:''
});
// const [appId,setAppId]=useState(null);
const { appId,setAppId } = useAppSetting();
const [isAuthenticated, setIsAuthenticated] = useState(false);
const [adminId, setAdminId] = useState(null);
const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
//  const { appId } = useAppSetting();
const [tempPage, setTempPage] = useState({ name: '', link: '' });
const [pageCount, setPageCount] = useState(1); // default still 1
const MAX_PAGES = 6;
const navigation = useNavigation();

  const [images, setImages] = useState({
    companyBanner: null,
    companyIcon: null,
    markLogo: null,
    knowLogo: null,
    playLogo: null,
    adBanner1: null,
    adBanner2: null,
  });
const handleInputChange = (key, value) => {
  setAdminData((prev) => ({
    ...prev,
    [key]: value,
  }));
  

};
useFocusEffect(
  useCallback(() => {
    if (!isAuthenticated) {
      // Reset email and password
      setEmail('');
      setPassword('');
    }
  }, [isAuthenticated])
);

const handleAddPage = () => {
if (pageCount > MAX_PAGES) {
  Alert.alert('Limit Reached', `You can only add up to ${MAX_PAGES} pages.`);
}

  if (!tempPage.name.trim() || !tempPage.link.trim()) {
    Alert.alert('Missing Info', 'Please fill both fields before adding.');
    return;
  }

  const updatedAdminData = {
    ...adminData,
    [`page${pageCount}`]: tempPage.name,
    [`page${pageCount}_link`]: tempPage.link,
  };

  setAdminData(updatedAdminData);
  setTempPage({ name: '', link: '' });
  setPageCount(pageCount + 1);
};
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
const chunkArray = (arr, size) => {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
};


//   const handleSave = async () => {

//   const admin = {
//     ...adminData,
//     appId: appId, // Add app_id from context here
//   };

//   const formData = new FormData();
//   formData.append('admin', JSON.stringify(admin));

//   // Append files
//   const appendFile = (key, uri, fallbackAsset) => {
//     if (!uri && fallbackAsset) {
//       formData.append(key, {
//         uri: Image.resolveAssetSource(fallbackAsset).uri,
//         name: 'logo.jpg',
//         type: 'image/jpeg',
//       });
//       return;
//     }

//     if (!uri) return;

//     const filename = uri.split('/').pop();
//     const match = /\.(\w+)$/.exec(filename ?? '');
//     const ext = match?.[1] ?? 'jpg';
//     const type = `image/${ext}`;

//     formData.append(key, {
//       uri,
//       name: filename,
//       type,
//     });
//   };

//   appendFile('logo', images.companyIcon, require('../Screens/assets/logo.png'));
//   appendFile('companyBanner', images.companyBanner);
//   appendFile('marklogo', images.markLogo);
//   appendFile('knowlogo', images.knowLogo);
//   appendFile('playlogo', images.playLogo);
//   appendFile('ads1', images.adBanner1);
//   appendFile('ads2', images.adBanner2);
//   appendFile('worldMapImage', images.worldMapImage);

//   try {
//     const response = await fetch('http://10.0.2.2:8080/api/admin/create', {
//       method: 'POST',
//       body: formData,
//     });

//     const result = await response.json();
//     if (response.ok) {
//       Alert.alert('Success', 'Admin created successfully.');
//       console.log(admin);
//         navigation.navigate('Home');

//     } else {
//       console.error('Server error:', result);
//       Alert.alert('Error', result.message || 'Upload failed.');
//     }
//   } catch (err) {
//     console.error('Upload error:', err);
//     Alert.alert('Error', 'Failed to upload data.');
//   }
// };
const handleSave = async () => {
  try {
    // Step 1: Check if admin with this appId exists
    const getResponse = await fetch(`http://10.0.2.2:8080/api/admin/app/${appId}`);
    const adminExists = getResponse.ok ? await getResponse.json() : null;

    const admin = {
      ...adminData,
      // appId: appId,
    };

    const formData = new FormData();
    formData.append('admin', JSON.stringify(admin));

    // Step 2: Append files (same logic you have)
    const appendFile = (key, uri, fallbackAsset) => {
      if (!uri && fallbackAsset) {
        formData.append(key, {
          uri: Image.resolveAssetSource(fallbackAsset).uri,
          name: 'logo.jpg',
          type: 'image/jpeg',
        });
        return;
      }

      if (!uri) return;

      const filename = uri.split('/').pop();
      const match = /\.(\w+)$/.exec(filename ?? '');
      const ext = match?.[1] ?? 'jpg';
      const type = `image/${ext}`;

      formData.append(key, {
        uri,
        name: filename,
        type,
      });
    };

    // Append all images
    appendFile('logo', images.companyIcon, require('../Screens/assets/logo.png'));
    appendFile('companyBanner', images.companyBanner);
    appendFile('marklogo', images.markLogo);
    appendFile('knowlogo', images.knowLogo);
    appendFile('playlogo', images.playLogo);
    appendFile('ads1', images.adBanner1);
    appendFile('ads2', images.adBanner2);
    appendFile('worldMapImage', images.worldMapImage);

    let response;

    // Step 3: Call PUT if admin exists, else POST
    if (adminExists && adminExists.id) {
      response = await fetch(`http://10.0.2.2:8080/api/admin/update/${adminExists.id}`, {
        method: 'PUT',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } else {
      response = await fetch('http://10.0.2.2:8080/api/admin/create', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    }

    const result = await response.json();

    if (response.ok) {
      Alert.alert('Success', adminExists ? 'Admin updated successfully.' : 'Admin created successfully.');
      navigation.navigate('Home');
    } else {
      console.error('Server error:', result);
      Alert.alert('Error', result.message || 'Operation failed.');
    }
  } catch (err) {
    console.error('Error during save:', err);
    Alert.alert('Error', 'Something went wrong while saving data.');
  }
};

// const handleLogin = async () => {
//   if (!email || !password) {
//     Alert.alert("Missing Fields", "Please enter both email and password.");
//     return;
//   }

//   try {
//     const formBody = `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

//     const response = await fetch("http://10.0.2.2:8080/api/app-settings/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       body: formBody,
//     });

//     const result = await response.json();

//     if (response.ok) {
//       setIsAuthenticated(true);
//       setAdminData((prev) => ({ ...prev, appId: result.id }));
//       await AsyncStorage.setItem('appId', result.id.toString());
//       setAdminId(result.id);

//       // Load full admin data
//       const adminRes = await fetch(`http://10.0.2.2:8080/api/admin/app/${result.id}`);
//       if (adminRes.ok) {
//         const admin = await adminRes.json();
//         setAdminData(admin);
//         setPageCount(getNextPageCount(admin));
//         setAppId(result.id);
//         // setAppId(result.appId)setAppId(result.id);;
//       }
//     } else {
//       Alert.alert("Login Failed", "Invalid credentials.");
//     }
//   } catch (error) {
//     console.error("Login error:", error);
//     Alert.alert("Error", "Something went wrong. Please try again.");
//   }
// };
const handleLogin = async () => {
  if (!email || !password) {
    Alert.alert("Missing Fields", "Please enter both email and password.");
    return;
  }

  try {
    const formBody = `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

    const response = await fetch("http://10.0.2.2:8080/api/app-settings/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody,
    });

    const result = await response.json();

    if (response.ok) {
      await AsyncStorage.setItem('appId', result.id.toString());
      setAppId(result.id); // Always store appId

      if (result.default_setting !== 'A') {
        Alert.alert("Not Allowed", "You are not allowed to update settings.");
        navigation.navigate('Home');
        return;
      }

      setIsAuthenticated(true);
      setAdminData((prev) => ({ ...prev, appId: result.id }));
      setAdminId(result.id);

      // Load full admin data
      const adminRes = await fetch(`http://10.0.2.2:8080/api/admin/app/${result.id}`);
      if (adminRes.ok) {
        const admin = await adminRes.json();
        setAdminData(admin);
        setPageCount(getNextPageCount(admin));
      }

    } else {
      Alert.alert("Login Failed", "Invalid credentials.");
    }
  } catch (error) {
    console.error("Login error:", error);
    Alert.alert("Error", "Something went wrong. Please try again.");
  }
};

const getNextPageCount = (admin) => {
  for (let i = MAX_PAGES; i >= 1; i--) {
    if (admin[`page${i}`] && admin[`page${i}_link`]) {
      return i + 1;
    }
  }
  return 1;
};
if (!isAuthenticated) {
  return (
    <View style={styles.container}>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} style={styles.input} />
      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
  style={styles.input}
  placeholder="Company Name"
  value={adminData.companyName}
  onChangeText={(text) => handleInputChange('companyName', text)}
/>
<TextInput
  style={styles.input}
  placeholder="Email"
  keyboardType="email-address"
  value={adminData.email}
  onChangeText={(text) => handleInputChange('email', text)}
/>
<TextInput
  style={styles.input}
  placeholder="Phone"
  keyboardType="phone-pad"
  value={adminData.phone}
  onChangeText={(text) => handleInputChange('phone', text)}
/>
<TextInput
  style={styles.input}
  placeholder={`Page ${pageCount} Name`}
  value={tempPage.name}
  onChangeText={(text) => setTempPage({ ...tempPage, name: text })}
/>
<TextInput
  style={styles.input}
  placeholder={`Page ${pageCount} Link`}
  value={tempPage.link}
  onChangeText={(text) => setTempPage({ ...tempPage, link: text })}
/>

<TouchableOpacity style={[styles.button, { backgroundColor: '#ff9800' }]} onPress={handleAddPage}>
  <Text style={styles.buttonText}>➕ Add Another Page</Text>
</TouchableOpacity>


     {chunkArray([
 { label: 'Banner (40x200)', key: 'companyBanner' },
  { label: 'home image (40x200)', key: 'worldMapImage' },
  { label: 'logo (40x40)', key: 'logo' },
  { label: 'Mark (40x40)', key: 'markLogo' },
  { label: 'Know (40x40)', key: 'knowLogo' },
  { label: 'Play (40x40)', key: 'playLogo' },
  { label: 'Ads 1 (50x220)', key: 'adBanner1' },
  { label: 'Ads 2 (50x220)', key: 'adBanner2' },
], 2).map((pair, rowIndex) => (
  <View key={rowIndex} style={styles.row}>
    {pair.map(({ label, key }) => (
      <View key={key} style={styles.uploadBox}>
        <TouchableOpacity style={styles.button} onPress={() => pickImage(key)}>
          <Text style={styles.buttonText}>{label}</Text>
        </TouchableOpacity>
        {images[key] && (
          <Image source={{ uri: images[key] }} style={styles.imagePreview} />
        )}
      </View>
    ))}
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
    paddingBottom:100
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
    width: 180,
    marginRight: 10,
    margin:10
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
  },input: {
  width: '100%',
  backgroundColor: '#fff',
  padding: 10,
  marginBottom: 15,
  borderRadius: 8,
  borderWidth: 1,
  borderColor: '#ccc',
  fontSize: 14,
},

});


// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, ScrollView, TextInput} from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import { useMapContext } from '../Context/MapContext';
// import { useAppSetting } from '../Context/AppSettingContext';
// import axios from 'axios';

// const SettingsScreen = () => {
//   const [adminData, setAdminData] = useState({
//   companyName: '',
//   email: '',
//   phone: '',
//   page1: '',
//   page1_link: '',
//   page2:'',
//   page2_link:'',
//   page3:'',
//   page3_link:'',
//   page4:'',
//   page4_link:'',
//   page5:'',
//   page5_link:'',
//   page6:'',
//   page6_link:'',
//   appId:''
// });
// const { setAppId } = useAppSetting();
// const [tempPage, setTempPage] = useState({ name: '', link: '' });
// const [pageCount, setPageCount] = useState(1); // default still 1
// const MAX_PAGES = 6;
// const [isAuthenticated, setIsAuthenticated] = useState(false);
// const [email, setEmail] = useState('');
// const [password, setPassword] = useState('');
// const [adminId, setAdminId] = useState(null);

//   const [images, setImages] = useState({
//     companyBanner: null,
//     companyIcon: null,
//     markLogo: null,
//     knowLogo: null,
//     playLogo: null,
//     adBanner1: null,
//     adBanner2: null,
//   });
// const handleInputChange = (key, value) => {
//   setAdminData((prev) => ({
//     ...prev,
//     [key]: value,
//   }));
  

// };
// const handleAddPage = () => {
// if (pageCount > MAX_PAGES) {
//   Alert.alert('Limit Reached', `You can only add up to ${MAX_PAGES} pages.`);
// }

//   if (!tempPage.name.trim() || !tempPage.link.trim()) {
//     Alert.alert('Missing Info', 'Please fill both fields before adding.');
//     return;
//   }

//   const updatedAdminData = {
//     ...adminData,
//     [`page${pageCount}`]: tempPage.name,
//     [`page${pageCount}_link`]: tempPage.link,
//   };

//   setAdminData(updatedAdminData);
//   setTempPage({ name: '', link: '' });
//   setPageCount(pageCount + 1);
// };
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
// const chunkArray = (arr, size) => {
//   const result = [];
//   for (let i = 0; i < arr.length; i += size) {
//     result.push(arr.slice(i, i + size));
//   }
//   return result;
// };

//  const handleSave = async () => {
// //   // e.preventDefault();
// //   // ensureDefaultPages();

// //   // Include app_id in adminData before sending
//   const admin = {
//     ...adminData,
//    appId: appId, // Add app_id from context here
//    };

//    const formData = new FormData();
//   formData.append('admin', JSON.stringify(admin));

//   // Append files
//  const appendFile = (key, uri, fallbackAsset) => {
//     if (!uri && fallbackAsset) {
//       formData.append(key, {
//          uri: Image.resolveAssetSource(fallbackAsset).uri,
//         name: 'logo.jpg',
//         type: 'image/jpeg',
//       });
//       return;
//      }

//     if (!uri) return;

//     const filename = uri.split('/').pop();
//     const match = /\.(\w+)$/.exec(filename ?? '');
//     const ext = match?.[1] ?? 'jpg';
//     const type = `image/${ext}`;

//     formData.append(key, {
//       uri,
//       name: filename,
//       type,
//     });
//   };

//   appendFile('logo', images.companyIcon, require('../Screens/assets/logo.png'));
//   appendFile('companyBanner', images.companyBanner);
//   appendFile('marklogo', images.markLogo);
//   appendFile('knowlogo', images.knowLogo);
//   appendFile('playlogo', images.playLogo);
//   appendFile('ads1', images.adBanner1);
//   appendFile('ads2', images.adBanner2);
//   appendFile('worldMapImage', images.worldMapImage);

//   try {
//      const response = await fetch('http://10.0.2.2:8080/api/admin/create', {
//        method: 'POST',
//       body: formData,
//     });

//     const result = await response.json();
//     if (response.ok) {
//       Alert.alert('Success', 'Admin created successfully.');
//       console.log(admin);

//     } else {
//       console.error('Server error:', result);
//       Alert.alert('Error', result.message || 'Upload failed.');
//     }
//   } catch (err) {
//     console.error('Upload error:', err);
//     Alert.alert('Error', 'Failed to upload data.');
//   }
// };
// const handleLogin = async () => {
//   if (!email || !password) {
//     Alert.alert("Missing Fields", "Please enter both email and password.");
//     return;
//   }

//   try {
//     const formBody = `email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

//     const response = await fetch("http://10.0.2.2:8080/api/app-settings/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded",
//       },
//       body: formBody,
//     });

//     const result = await response.json();

//     if (response.ok) {
//       setIsAuthenticated(true);
//       setAdminData((prev) => ({ ...prev, appId: result.id }));
//       setAdminId(result.id);
// setAppId(response.data.appId);
//       // Load full admin data
//       const adminRes = await fetch(`http://10.0.2.2:8080/api/admin/app/${result.id}`);
//       if (adminRes.ok) {
//         const admin = await adminRes.json();
//         setAdminData(admin);
//         setPageCount(getNextPageCount(admin));
//       }
//     } else {
//       Alert.alert("Login Failed", "Invalid credentials.");
//     }
//   } catch (error) {
//     console.error("Login error:", error);
//     Alert.alert("Error", "Something went wrong. Please try again.");
//   }
// };

// const getNextPageCount = (admin) => {
//   for (let i = MAX_PAGES; i >= 1; i--) {
//     if (admin[`page${i}`] && admin[`page${i}_link`]) {
//       return i + 1;
//     }
//   }
//   return 1;
// };



// if (!isAuthenticated) {
//   return (
//     <View style={styles.container}>
//       <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
//       <TextInput placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} style={styles.input} />
//       <TouchableOpacity onPress={handleLogin} style={styles.button}>
//         <Text style={styles.buttonText}>Login</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }
//   return (
//     <ScrollView contentContainerStyle={[styles.container, { flexGrow: 1 }]}>
//       <TextInput
//   style={styles.input}
//   placeholder="Company Name"
//   value={adminData.companyName}
//   onChangeText={(text) => handleInputChange('companyName', text)}
// />
// <TextInput
//   style={styles.input}
//   placeholder="Email"
//   keyboardType="email-address"
//   value={adminData.email}
//   onChangeText={(text) => handleInputChange('email', text)}
// />
// <TextInput
//   style={styles.input}
//   placeholder="Phone"
//   keyboardType="phone-pad"
//   value={adminData.phone}
//   onChangeText={(text) => handleInputChange('phone', text)}
// />
// <TextInput
//   style={styles.input}
//   placeholder={`Page ${pageCount} Name`}
//   value={tempPage.name}
//   onChangeText={(text) => setTempPage({ ...tempPage, name: text })}
// />
// <TextInput
//   style={styles.input}
//   placeholder={`Page ${pageCount} Link`}
//   value={tempPage.link}
//   onChangeText={(text) => setTempPage({ ...tempPage, link: text })}
// />

// <TouchableOpacity style={[styles.button, { backgroundColor: '#ff9800' }]} onPress={handleAddPage}>
//   <Text style={styles.buttonText}>➕ Add Another Page</Text>
// </TouchableOpacity>


//      {chunkArray([
//  { label: 'Banner (40x200)', key: 'companyBanner' },
//   { label: 'home image (40x200)', key: 'worldMapImage' },
//   { label: 'logo (40x40)', key: 'logo' },
//   { label: 'Mark (40x40)', key: 'markLogo' },
//   { label: 'Know (40x40)', key: 'knowLogo' },
//   { label: 'Play (40x40)', key: 'playLogo' },
//   { label: 'Ads 1 (50x220)', key: 'adBanner1' },
//   { label: 'Ads 2 (50x220)', key: 'adBanner2' },
// ], 2).map((pair, rowIndex) => (
//   <View key={rowIndex} style={styles.row}>
//     {pair.map(({ label, key }) => (
//       <View key={key} style={styles.uploadBox}>
//         <TouchableOpacity style={styles.button} onPress={() => pickImage(key)}>
//           <Text style={styles.buttonText}>{label}</Text>
//         </TouchableOpacity>
//         {images[key] && (
//           <Image source={{ uri: images[key] }} style={styles.imagePreview} />
//         )}
//       </View>
//     ))}
//   </View>
// ))}


//       <TouchableOpacity style={[styles.button, styles.save]} onPress={handleSave}>
//         <Text style={styles.buttonText}>Save All</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// export default SettingsScreen;

// const styles = StyleSheet.create({
//   container: {
//     paddingTop: 10,
//     marginTop: 50,
//     paddingHorizontal: 20,
//     backgroundColor: '#f0f4f7',
//     alignItems: 'center',
//     paddingBottom:100
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
//     width: 180,
//     marginRight: 10,
//     margin:10
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: '600',
//     fontSize: 14,
//     textAlign: 'center',
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
//   },input: {
//   width: '100%',
//   backgroundColor: '#fff',
//   padding: 10,
//   marginBottom: 15,
//   borderRadius: 8,
//   borderWidth: 1,
//   borderColor: '#ccc',
//   fontSize: 14,
// },

// });

