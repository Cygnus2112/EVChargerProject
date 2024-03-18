const apiKey = process.env.OPEN_CHARGE_API_KEY;

export type Location = {
  latitude: number;
  longitude: number;
}
export type Boundary = {
  northEast: Location;
  southWest: Location;
}
export type MapMarker = {
  id: number;
  title: string;
  addressLine1: string;
  latitude: number;
  longitude: number;
}
export type OpenChargeAddress = {
  ID: number;
  AddressLine1: string;
  Title: string;
  Latitude: number;
  Longitude: number;
}
export type OpenChargeData = {
  AddressInfo: OpenChargeAddress
}

export const fetchChargerLocations = async (boundaries: Boundary): Promise<MapMarker[] | unknown> => {
  try {
    const url = 'https://api.openchargemap.io/v3/poi?key=' + apiKey;
    const { northEast, southWest } = boundaries;
    const query = `&maxresults=20&boundingbox=(${northEast.latitude},${northEast.longitude}),(${southWest.latitude},${southWest.longitude})`
    const res = await fetch(url + query);
    const data  = await res.json() as OpenChargeData[];
    const addresses = data.map((item) => {
      return {
        id: item.AddressInfo.ID,
        addressLine1: item.AddressInfo.AddressLine1,
        title: item.AddressInfo.Title,
        latitude: item.AddressInfo.Latitude,
        longitude: item.AddressInfo.Longitude,
      }
    });
    return addresses;
  } catch(err: unknown) {
    console.log('Error fetching charger locations: ', err);
    return err;
  }
}

export const reserveCharger = async (chargerId: number) => {
  try {
    const url = 'https://example.ev.energy/chargingsession';
    const data = {
      "user": 1,
      "car_id": 1,
      "charger_id": chargerId
    }
    const res = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
    })
    return  res.json();
  } catch (err) {
    return new Error("Unable to confirm charger");
  }
}