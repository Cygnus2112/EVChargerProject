import React, { useState, useRef, useEffect, useCallback } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Alert} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Location from 'expo-location';

import { ChargerLocation } from './components/ChargerLocation';
import { reserveCharger, fetchChargerLocations, Boundary, MapMarker } from './api';

export default function App() {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0461,
    longitudeDelta: 0.02105, 
  });
  const [markers, setMarkers] = useState<MapMarker[]>([]);
  const [selected, setSelected] = useState<MapMarker>();
  const mapRef = useRef<MapView>(null);

  const handleRegionChange = useCallback(async () => {
    try {
      const boundaries = await mapRef.current?.getMapBoundaries();
      const addresses = await fetchChargerLocations(boundaries as Boundary) as MapMarker[];
      setMarkers(addresses);
    } catch(err) {
      console.log('Error: ', err);
    }
  }, [mapRef]);

  const handleChargePress = useCallback((marker: MapMarker) => {
    Alert.alert('Confirm', `Charge at ${marker.title}?`, [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'Yes', onPress: async () => {
        const res = await reserveCharger(marker.id);
        console.log('res ', res);
      }},
    ]);
  }, [])

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      const {coords: { latitude, longitude }} = await Location.getCurrentPositionAsync({});
      setRegion((prevRegion) => {
        return {
          ...prevRegion,
          latitude,
          longitude,
        }
      });
      await handleRegionChange();
    })();
  }, []);

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <MapView
          ref={mapRef}
          region={region}
          onRegionChange={handleRegionChange}
          style={styles.map}
        >
          <Marker
            pinColor="green"
            coordinate={{
              latitude: region.latitude,
              longitude: region.longitude,
            }}
          />
          {markers.map((marker) => {
            const color = marker.id === selected?.id ? 'red' : 'blue';
            return (
              <Marker
                key={marker.id}
                pinColor={color}
                coordinate={{
                  latitude: marker.latitude,
                  longitude: marker.longitude,
                }}
                title={marker.title}
                onPress={() => setSelected(marker)}
              />
            );
          })}
        </MapView>
        {selected && (
          <ChargerLocation marker={selected} onChargePress={handleChargePress}/>
        )}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
