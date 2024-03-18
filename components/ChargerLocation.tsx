
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { MapMarker } from '../api';

type IProps = {
  marker: MapMarker;
  onChargePress: (marker: MapMarker) => void
};

export const ChargerLocation = ({ marker, onChargePress }: IProps) => {
  return (
    <View style={styles.chargerLocation}>
      <View>
        <Text style={styles.locationTitle}>{marker.title}</Text>
        <Text style={styles.locationAddress}>{marker.addressLine1}</Text>
      </View>
      <Pressable style={styles.button} onPress={() => onChargePress(marker)}>
        <Text style={styles.buttonText}>Start Charging</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  chargerLocation: {
    width: '100%',
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 10,
    paddingBottom: 20,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  locationTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 3,
  },
  locationAddress: {
    fontSize: 18,
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 5,
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
  },
});
