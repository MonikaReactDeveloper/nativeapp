import React from 'react'
import { useMapContext } from '../Context/MapContext'
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, StyleSheet } from 'react-native';

const Know = ({navigation}) => {
     const { images } = useMapContext();

  return (
  <>
         <View style={styles.header}>
                  <TouchableOpacity onPress={() => navigation.openDrawer()}>
                   <Image
          source={images.knowLogo ? { uri: images.knowLogo } : require('../Screens/assets/logo.png')}
          style={styles.logo}
        />
                  </TouchableOpacity>
                  {images.companyBanner ? (
                           <Image source={{ uri: images.companyBanner }} style={styles.bannerImage} />
                         ) : (
                           <Text style={styles.banner}>I am Mark</Text>
                         )}
                </View>
      
 </>
  )
}

export default Know

const styles = StyleSheet.create({

  header: {
    marginTop: 30,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
    logo: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
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
})