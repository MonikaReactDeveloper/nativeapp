// // LoginScreen.js
// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { useAppSetting } from '../Context/AppSettingContext'; // context to store appId

// const LoginScreen = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const { setAppId } = useAppSetting();
//   const navigation = useNavigation();

//   const handleLogin = async () => {
//     try {
//       const response = await fetch(`http://localhost:8080/api/app-settings/login?email=${email}&password=${password}`);
//       const data = await response.json();

//       if (!response.ok) {
//         Alert.alert('Login Failed', data.message || 'Invalid credentials');
//         return;
//       }

//       if (data.default_setting === 'B') {
//         Alert.alert('Access Denied', 'You are not allowed to update your settings.');
//         return;
//       }

//       if (data.default_setting === 'A') {
//         const appId = data.id;
//         setAppId(appId); // store in context

//         const adminResponse = await fetch(`http://localhost:8080/api/admin/app/${appId}`);
//         const adminData = await adminResponse.json();

//         // pass existing admin data (if any) to SettingsScreen
//         navigation.navigate('Settings', { adminData: adminData || null });
//       }
//     } catch (error) {
//       console.error('Login error:', error);
//       Alert.alert('Error', 'Failed to login. Please try again.');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
//       <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
//       <TouchableOpacity style={styles.button} onPress={handleLogin}>
//         <Text style={styles.text}>Login</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default LoginScreen;

// const styles = StyleSheet.create({
//   container: { padding: 20, justifyContent: 'center', flex: 1 },
//   input: { borderWidth: 1, borderColor: '#ccc', padding: 12, marginVertical: 10, borderRadius: 8 },
//   button: { backgroundColor: '#00AEEF', padding: 14, borderRadius: 8, alignItems: 'center' },
//   text: { color: '#fff', fontWeight: 'bold' },
// });
