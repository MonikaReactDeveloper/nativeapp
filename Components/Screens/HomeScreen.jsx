// import React, { useEffect, useState } from 'react';
// import {
//   View, Text, Image, StyleSheet, ScrollView, TouchableOpacity
// } from 'react-native';
// import axios from 'axios';
// import { Linking } from 'react-native';


// const BASE_URL = 'http://10.0.2.2:8080';

// const HomePage = () => {
//   const [data, setData] = useState(null);
// const id=2;
// useEffect(() => {
//   axios.get(`${BASE_URL}/api/admin/2`)
//     .then(res => {
//       if (res.data) {
//         setData(res.data); // Use the first item from the array
//       }
//     })
//     .catch(err => console.error('Fetch Error:', err));
// }, []);


//   if (!data) {
//     return (
//       <View style={styles.loading}>
//         <Text>Loading...</Text>
//       </View>
//     );
//   }

//   const getImageUrl = (path) => path ? `${BASE_URL}/${path}` : null;

//   return (
//     <ScrollView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.companyName}>{data.companyName}</Text>
     
//       </View>
//    <View style={styles.contactRow}>
//           <Text style={styles.email}>{data.email}</Text>
//           <Text style={styles.contact}>{data.phone}</Text>
//         </View>
//       {/* World Map */}
//       {data.worldMapImage && (
//         <Image source={{ uri: getImageUrl(data.worldMapImage) }} style={styles.worldMap} />
//       )}

//       {/* Logo Section */}
//       <View style={styles.logoSection}>
//         {data.logo && (
//           <Image source={{ uri: getImageUrl(data.logo) }} style={styles.logoImage} />
//         )}
//         <Text style={styles.logoText}>ANSH</Text>
//       </View>

//       {/* Menu Links */}
//       <View style={styles.menu}>
//         {data.page1 && (
//           <TouchableOpacity onPress={() => openLink(data.page1_link)}>
//             <Text style={styles.link}>{data.page1}</Text>
//           </TouchableOpacity>
//         )}
//         {data.page2 && (
//           <TouchableOpacity onPress={() => openLink(data.page2_link)}>
//             <Text style={styles.link}>{data.page2}</Text>
//           </TouchableOpacity>
//         )}
//         {data.page3 && (
//           <TouchableOpacity onPress={() => openLink(data.page3_link)}>
//             <Text style={styles.link}>{data.page3}</Text>
//           </TouchableOpacity>
//         )}
//          {data.page4 && (
//           <TouchableOpacity onPress={() => openLink(data.page4_link)}>
//             <Text style={styles.link}>{data.page4}</Text>
//           </TouchableOpacity>
//         )}
//           {data.page5 && (
//           <TouchableOpacity onPress={() => openLink(data.page5_link)}>
//             <Text style={styles.link}>{data.page5}</Text>
//           </TouchableOpacity>
//         )}
//           {data.page6 && (
//           <TouchableOpacity onPress={() => openLink(data.page6_link)}>
//             <Text style={styles.link}>{data.page6}</Text>
//           </TouchableOpacity>
//         )}
//       </View>

//       {/* MARK KNOW PLAY */}
//       <View style={styles.mkpSection}>
//   <View style={styles.mkBox}>
//     <Image source={require('../Screens/assets/logo.png')} style={{ width: 100, height: 100 }} />

//     {/* <Image
//       source={
//         data.mark
//           ? { uri: getImageUrl(data.mark) }
//           : require('../Screens/assets/logo.png') // fallback image for MARK
//       }
//       style={styles.mkImage}
//     /> */}
//     {/* <Text style={styles.mkText}>MARK</Text> */}
//   </View>

//   <View style={styles.mkBox}>
//     <Image source={require('../Screens/assets/anshin_know_final.jpg')} style={{ width: 100, height: 100 }} />

//     {/* <Image
//       source={
//         data.know
//           ? { uri: getImageUrl(data.know) }
//           : require('../Screens/assets/anshin_know_final.jpg') // fallback image for KNOW
//       }
//       style={styles.mkImage}
//     /> */}
//     {/* <Text style={styles.mkText}>KNOW</Text> */}
//   </View>

//   <View style={styles.mkBox}>
//     <Image source={require('../Screens/assets/anshin_play_final.jpg')} style={{ width: 100, height: 100 }} />

//     {/* <Image
//       source={
//         data.play
//           ? { uri: getImageUrl(data.play) }
//           : require('../Screens/assets/anshin_play_final.jpg') // fallback image for PLAY
//       }
//       style={styles.mkImage}
//     /> */}
//     {/* <Text style={styles.mkText}>PLAY</Text> */}
//   </View>


//       </View>

//       {/* Ad Section */}
//       <View style={styles.ads}>
//         {data.ad1 && (
//           <Image source={{ uri: getImageUrl(data.ad1) }} style={styles.adBox} />
//         )}
//         {data.ad2 && (
//           <Image source={{ uri: getImageUrl(data.ad2) }} style={styles.adBox} />
//         )}
//       </View>

//       {/* Footer */}
//       <Text style={styles.footer}>©   {data?.companyName || 'itansh.in'}</Text>
//     </ScrollView>
//   );
// };

// const openLink = (url) => {
//   if (!url) return;
//   Linking.openURL(url).catch(err => console.error('Failed to open URL:', err));
// };

// const styles = StyleSheet.create({
//   container: { backgroundColor: '#fff', flex: 1 },
//   loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   header: { backgroundColor: '#93278F', padding: 10 },
//   companyName: { color: '#fff', fontWeight: 'bold', fontSize: 14, textAlign: 'center' },
//   contactRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 },
//   email: {color:'black', fontSize: 20 },
//   contact: { color:'black', fontSize: 20 },
//   worldMap: { height: 150, width: '100%', resizeMode: 'cover' },
//   logoSection: { alignItems: 'center', marginVertical: 10 },
//   logoImage: { height: 60, width: 60, resizeMode: 'contain' },
//   logoText: { fontSize: 16, fontWeight: 'bold', color: '#FF0000' },
//   menu: { alignItems: 'center', marginVertical: 10 },
//   link: { fontSize: 14, color: '#D80000', marginVertical: 4 },
//   mkpSection: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
//   mkBox: { alignItems: 'center' },
//   mkImage: { width: 80, height: 80 },
//   mkText: { fontWeight: 'bold', marginTop: 4 },
//   ads: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
//   adBox: { width: '45%', height: 80, backgroundColor: '#00AEEF' },
//   footer: { backgroundColor: '#93278F', color: '#fff', textAlign: 'center', padding: 8, fontSize: 10 },
// });

// export default HomePage;
import React, { useEffect, useState } from 'react';
import {
  View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Linking
} from 'react-native';
import axios from 'axios';
import { WebView } from 'react-native-webview';
import { useAppSetting } from '../Context/AppSettingContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const BASE_URL = 'http://10.0.2.2:8080';

const HomeScreen = () => {
  const [data, setData] = useState(null);
  const { appId } = useAppSetting();
  const navigation = useNavigation();
const defaultData = {
  companyBanner: null,
  email: '',
  phone: '',
  worldMapImage: null,
  logo: null,
  companyName: 'ansh.co.in',
  page1: 'Contact',
  page1_link: 'https://itisansh.in/contactus/',
  page2: '',
  page2_link: '',
  mark: null,
  know: null,
  play: null,
  ad1: null,
  ad2: null,
};


 useEffect(() => {
    if (!appId) return;

    axios.get(`${BASE_URL}/api/admin/app/${appId}`)
      .then(res => {
        if (res.data) {
          setData(res.data);
        }
      })
      .catch(err => console.error('Fetch Error:', err));
  }, [appId]);

  const getImageUrl = (path) => path ? `${BASE_URL}/${path}` : null;
  const openLink = (url) => {
    if (!url) return;
    Linking.openURL(url).catch(err => console.error('Failed to open URL:', err));
  };

const effectiveData = data || defaultData;


  // if (!data) {
  //   return (
  //     <View style={styles.loading}>
  //       <Text>Loading...</Text>
  //     </View>
  //   );
  // }


const {
  companyBanner, email, phone, worldMapImage, logo,
  page1, page1_link, page2, page2_link, page3, page3_link,
  page4, page4_link, page5, page5_link, page6, page6_link,
  ad1, ad2, mark, know, play, companyName
} = effectiveData;


  const pages = [
    { title: page1, link: page1_link },
    { title: page2, link: page2_link },
    { title: page3, link: page3_link },
    { title: page4, link: page4_link },
    { title: page5, link: page5_link },
    { title: page6, link: page6_link },
  ].filter(p => p.title); // Remove nulls

  const ads = [ad1, ad2].filter(Boolean);
const AnimatedGIF = () => (
  <WebView
    originWhitelist={['*']}
    source={{
      html: `
        <html>
          <body style="margin:0; padding:0; background:transparent; display:flex; justify-content:center; align-items:center;">
            <img src="https://ansh.co.in/public/uploads/coin_ansh_man.gif" style="background:transparent;" />
          </body>
        </html>
      `,
    }}
    style={{ width: 150, height: 60,marginBottom:0, backgroundColor: 'transparent' }}
    scrollEnabled={false}
    javaScriptEnabled={true}
  />
);
  return (
    <ScrollView style={styles.container}>
<View style={styles.topHeader}>
  {/* <Image
    source={{
      uri: getImageUrl(logo) || 'https://ansh.co.in/public/uploads/all_logos/anshin_ansh_final.jpg',
    }}
    style={styles.toplogoImage}
  /> */}

  {worldMapImage ? (
    <Image source={{ uri: getImageUrl(worldMapImage) }} style={styles.bannerImage} />
  ) : (
    <Text style={styles.banner}>M app</Text>
  )}
</View>

       
    

      {/* Email & Phone */}
      <View style={styles.contactRow}>
            <View style={{ flexDirection: 'row' }}>
        <Text style={styles.email}>{email}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('AppSettings')}>
        <Text style={[styles.email, { color: 'blue' }]}>.</Text>
      </TouchableOpacity>
      </View>
        <Text style={styles.contact}>{phone}</Text>
      </View>

      {/* World Map */}
        {/* <Image
                            source={companyBanner ? { uri: companyBanner } : require('../Screens/assets/image (20).png')}
                            style={styles.worldMap}
                          /> */}
        <Image  source={{ uri: getImageUrl(companyBanner) || 'https://ansh.co.in/public/uploads/all_logos/map.jpg' }} style={styles.worldMap} />

   

      {/* Logo Section */}
     
   <View style={styles.logoSection}>
  {logo ? (
    <Image
      source={{ uri: getImageUrl(logo) }}
      style={styles.mainlogoImage}
    />
  ) : (
    <Text style={styles.logoFallbackText}>M app</Text>
  )}
</View>

  

      {/* Pages */}
     <View style={styles.menuContainer}>
  {pages.map((p, i) => (
    <View key={i} style={styles.menuItemWrapper}>
      <TouchableOpacity onPress={() => openLink(p.link)} style={styles.menuItem}>
        <Text style={styles.link}>{p.title}</Text>
      </TouchableOpacity>
    </View>
  ))}
</View>
<WebView
  source={{
    html: `
      <html>
        <body style="margin:0; padding:0; background:transparent; display:flex; justify-content:center; align-items:center; height:100vh;">
          <img 
            src="https://ansh.co.in/public/uploads/coin_ansh_man.gif" 
            style="background:transparent; height:150px; display:block;" 
          />
        </body>
      </html>
    `,
  }}
  style={{ height: 150, backgroundColor: '#ffeeab' }}
  originWhitelist={['*']}
  javaScriptEnabled={true}
  scrollEnabled={false}
/>



  <View style={styles.bottomSection}>
         <TouchableOpacity onPress={() => navigation.navigate('Mark')}>
              <Image
  source={{ uri: getImageUrl(mark) || 'https://ansh.co.in/mapp/uploads/our_images/anshin_mark_final.jpg' }}
  style={styles.logoImage}
/>

      </TouchableOpacity>
           <TouchableOpacity onPress={() => navigation.navigate('Know')}>
        <Image
  source={{ uri: getImageUrl(know) || 'https://ansh.co.in/mapp/uploads/our_images/anshin_know_final.jpg' }}
  style={styles.logoImage}
/>

      </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Play')}>
         <Image
  source={{ uri: getImageUrl(play) || 'https://ansh.co.in/mapp/uploads/our_images/anshin_play_final.jpg' }}
  style={styles.logoImage}
/>
      </TouchableOpacity>
        </View>
      {/* Ads */}
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

      {/* Footer */}
     <TouchableOpacity onPress={() => navigation.navigate('Settings')}>

  <Text style={styles.footer}>© {companyName}</Text>


</TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', flex: 1,marginTop:40,backgroundColor: '#ffeeab' },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
topHeader:{display:'flex', flexDirection:'row'},
  bannerImage: { width: '100%', height: 50, resizeMode: 'cover' },

  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#ffeeab',
    color:'#704903'
  },
logoFallbackText: {
  fontSize: 24,
  fontWeight: 'bold',
  color: '#704903',
  textAlign: 'center',
},
  bottomSection:{display:'flex',flexDirection:'row',justifyContent:'space-evenly',backgroundColor:'#ffeeab'},
  email: { color: '#704903', fontSize: 16, fontWeight:700 },
  contact: { color: 'black', fontSize: 16,fontWeight:700 },
mainlogoImage:{height:80,width:'90%'},
  worldMap: { width: '100%', height: 300, resizeMode: 'cover' },

  logoSection: { alignItems: 'center', marginVertical: 15 },
  logoImage: { height: 60, width: 60, resizeMode: 'contain' },
  banner: {
  
    fontSize: 18,
    fontWeight: 'bold',
    backgroundColor: '#704903',
    color: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
   
    flex: 1,
    height:45,
    textAlign: 'center',
  },
menuContainer: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'center',
backgroundColor: '#ffeeab',
  paddingHorizontal: 10,
},

menuItemWrapper: {
  width: '30%', // Max 3 per row
  alignItems: 'center',
  // marginVertical: 10,
},

menuItem: {
  padding: 10,

  borderRadius: 8,
},

link: {
  fontSize: 16,
  color: '#704903',
  textAlign: 'center',
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

  footer: {
    marginTop:20,
   backgroundColor:'#704903',
   color:'white',
    textAlign: 'center',
    padding: 10,
    fontSize: 14,
    borderTopWidth: 1,
    borderColor: '#eee',

  },
});

export default HomeScreen;
