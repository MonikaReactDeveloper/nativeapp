// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, Image, Platform } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import { Picker } from '@react-native-picker/picker';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import { StyleSheet } from 'react-native';

// const AppSetting = () => {
//   const [icon, setIcon] = useState(null);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [defaultSetting, setDefaultSetting] = useState('');
//   const [issueDate, setIssueDate] = useState(new Date());
//   const [expiryDate, setExpiryDate] = useState(new Date());
//   const [showIssuePicker, setShowIssuePicker] = useState(false);
//   const [showExpiryPicker, setShowExpiryPicker] = useState(false);

//   const pickImage = async () => {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [1, 1],
//       quality: 0.5,
//     });

//     if (!result.canceled) {
//       setIcon(result.assets[0].uri);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.label}>Upload App Icon</Text>
//       <TouchableOpacity onPress={pickImage} style={styles.imageUpload}>
//         {icon ? (
//           <Image source={{ uri: icon }} style={styles.icon} />
//         ) : (
//           <Text style={styles.uploadText}>Choose Icon</Text>
//         )}
//       </TouchableOpacity>

//       <Text style={styles.label}>Email ID</Text>
//       <TextInput
//         value={email}
//         onChangeText={setEmail}
//         style={styles.input}
//         keyboardType="email-address"
//       />

//       <Text style={styles.label}>Password</Text>
//       <TextInput
//         value={password}
//         onChangeText={setPassword}
//         style={styles.input}
//         secureTextEntry
//       />

//       <Text style={styles.label}>Default Setting</Text>
//       <View style={styles.pickerContainer}>
//         <Picker
//           selectedValue={defaultSetting}
//           onValueChange={(itemValue) => setDefaultSetting(itemValue)}
//         >
//           <Picker.Item label="Select Setting" value="" />
//           <Picker.Item label="Setting A" value="A" />
//           <Picker.Item label="Setting B" value="B" />
//           <Picker.Item label="Setting C" value="C" />
//         </Picker>
//       </View>

//       <Text style={styles.label}>Issue Date</Text>
//       <TouchableOpacity onPress={() => setShowIssuePicker(true)} style={styles.input}>
//         <Text>{issueDate.toDateString()}</Text>
//       </TouchableOpacity>
//       {showIssuePicker && (
//         <DateTimePicker
//           value={issueDate}
//           mode="date"
//           display="default"
//           onChange={(event, selectedDate) => {
//             setShowIssuePicker(false);
//             if (selectedDate) setIssueDate(selectedDate);
//           }}
//         />
//       )}

//       <Text style={styles.label}>Expiry Date</Text>
//       <TouchableOpacity onPress={() => setShowExpiryPicker(true)} style={styles.input}>
//         <Text>{expiryDate.toDateString()}</Text>
//       </TouchableOpacity>
//       {showExpiryPicker && (
//         <DateTimePicker
//           value={expiryDate}
//           mode="date"
//           display="default"
//           onChange={(event, selectedDate) => {
//             setShowExpiryPicker(false);
//             if (selectedDate) setExpiryDate(selectedDate);
//           }}
//         />
//       )}
//     </View>
//   );
// };

// export default AppSetting;

// const styles = StyleSheet.create({
//   container: {
//     padding: 20,
//     backgroundColor: '#fff',
//     flex: 1,
//   },
//   label: {
//     marginTop: 15,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#aaa',
//     padding: 10,
//     borderRadius: 8,
//   },
//   pickerContainer: {
//     borderWidth: 1,
//     borderColor: '#aaa',
//     borderRadius: 8,
//     overflow: 'hidden',
//   },
//   imageUpload: {
//     height: 100,
//     width: 100,
//     backgroundColor: '#eee',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 10,
//     borderRadius: 10,
//   },
//   icon: {
//     height: 100,
//     width: 100,
//     borderRadius: 10,
//   },
//   uploadText: {
//     color: '#555',
//   },
// });
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useAppSetting } from '../Context/AppSettingContext';



const AppSetting = () => {
  const [icon, setIcon] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [defaultSetting, setDefaultSetting] = useState('');
  const [issueDate, setIssueDate] = useState(new Date());
  const [expiryDate, setExpiryDate] = useState(new Date());
  const [showIssuePicker, setShowIssuePicker] = useState(false);
  const [showExpiryPicker, setShowExpiryPicker] = useState(false);
  const { setAppId } = useAppSetting();
const navigation = useNavigation();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled) {
      setIcon(result.assets[0].uri);
    }
  };
const handleSave = async () => {
  try {
    const formData = new FormData();

 formData.append('email', String(email));
formData.append('password', String(password));
formData.append('default_setting', String(defaultSetting));
formData.append('issue_date', issueDate.toISOString().split('T')[0]);
formData.append('expiry_date', expiryDate.toISOString().split('T')[0]);


    // Optional app_icon
    if (icon) {
      const fileName = icon.split('/').pop();
      const fileType = fileName.split('.').pop();

      formData.append('app_icon', {
        uri: icon,
        name: fileName,
        type: `image/${fileType === 'jpg' ? 'jpeg' : fileType}`,
      });
    }

    const response = await axios.post(
      'http://10.0.2.2:8080/api/app-settings/create',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  const createdId = response.data?.id;
    if (createdId) {
      setAppId(createdId);
    }
    console.log('Upload success:', response.data);
    alert('Saved!');
    navigation.navigate('Settings');
  } catch (error) {
    console.error('Upload failed:', error.response?.data || error.message);
    alert('Upload failed');
  }
};



  return (
    <View style={styles.container}>
      <Text style={styles.label}>Upload App Icon</Text>
      <TouchableOpacity onPress={pickImage} style={styles.imageUpload}>
        {icon ? (
          <Image source={{ uri: icon }} style={styles.icon} />
        ) : (
          <Text style={styles.uploadText}>Choose Icon</Text>
        )}
      </TouchableOpacity>

      <Text style={styles.label}>Email ID</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <Text style={styles.label}>Default Setting</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={defaultSetting}
          onValueChange={(itemValue) => setDefaultSetting(itemValue)}
        >
          <Picker.Item label="Select Setting" value="" />
          <Picker.Item label="Yes" value="A" />
          <Picker.Item label="No" value="B" />
     
        </Picker>
      </View>

      <Text style={styles.label}>Issue Date</Text>
      <TouchableOpacity onPress={() => setShowIssuePicker(true)} style={styles.input}>
        <Text>{issueDate.toDateString()}</Text>
      </TouchableOpacity>
      {showIssuePicker && (
        <DateTimePicker
          value={issueDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowIssuePicker(false);
            if (selectedDate) setIssueDate(selectedDate);
          }}
        />
      )}

      <Text style={styles.label}>Expiry Date</Text>
      <TouchableOpacity onPress={() => setShowExpiryPicker(true)} style={styles.input}>
        <Text>{expiryDate.toDateString()}</Text>
      </TouchableOpacity>
      {showExpiryPicker && (
        <DateTimePicker
          value={expiryDate}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowExpiryPicker(false);
            if (selectedDate) setExpiryDate(selectedDate);
          }}
        />
      )}
         <TouchableOpacity style={styles.button} onPress={handleSave}>
  <Text style={styles.buttonText}>Save</Text>
</TouchableOpacity>

    </View>
  );
};

export default AppSetting;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  label: {
    marginTop: 15,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    borderRadius: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    overflow: 'hidden',
  },button: { backgroundColor: '#6a1b9a', padding: 12, borderRadius: 6, marginTop: 20 },
  buttonText: { color: 'white', textAlign: 'center', fontWeight: 'bold' },
  imageUpload: {
    height: 100,
    width: 100,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 10,
  },
  icon: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  uploadText: {
    color: '#555',
  },
});

