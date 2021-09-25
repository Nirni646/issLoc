import axios from 'axios';
import React,{Component} from 'react';
import { StyleSheet, Text, View, ImageBackground,Image,StatusBar,SafeAreaView,Platform, Alert } from 'react-native';
import MapView,{Marker} from 'react-native-maps';

export default class IssLocationScreen extends Component{

constructor(props) {
  super(props);
    this.state={
      location : {}
    }
}

componentDidCatch(){
  this.getIssLocation();
}

getIsslocation=()=>{
  axios
  .get("https://api.wheretheiss.at/v1/satellites/25544")
  .then(response=>{
    this.setState({
      location : response.data
    })
    
  })
  .catch(error=>{
      Alert.alert(error.message);
  })
}

    render(){
      if (Object.keys(this.state.location).length===0){
         return(
           <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
                <Text>Loading...</Text>
           </View>
         )
      }else{
        
      
        return (
            <View style={styles.container}>
              <SafeAreaView style={styles.DroidSafeArea}
              />
              <ImageBackground source={require('../assets/iss_bg.jpg')} style={styles.BackgroundImage}>
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>ISS LOCATION</Text>
                </View>
                <View style={styles.mapContainer}>
                     <MapView style={styles.map} 
                     region={{
                       latitude : this.state.location.latitude,
                       longitude : this.state.location.longitude,
                       latitudeDelta : 100,
                       longitudeDelta : 100,
                     }}
                     >
                      <Marker Coordinates={{latitude : this.state.location.latitude,longitude : this.state.location.longitude}}>
                        <Image source={require('../assets/iss_icon.png')} style={{height:50,width:50}} />
                      </Marker>
                     </MapView>
                </View>
                </ImageBackground>
            </View>

          );
    }
  
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  DroidSafeArea: {
    MarginTop:Platform.OS==='android' ? statusbar.currentHeight : 0
  },
  BackgroundImage:{
    flex:1,
    resizeMode:'cover',
  },
  titleContainer:{
    flex:0.1,
    justifyContent:'center',
    alignItems: 'center',
  },
  titleText:{
    fontSize:30,
    fontWeight:'bold',
    color:'yellow',
  },
  mapContainer:{
    flex:0.6,
  },
  map:{
    width:'100%',
    height:'100%',
  }
});
