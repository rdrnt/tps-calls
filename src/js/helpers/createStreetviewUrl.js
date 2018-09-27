export default function createStreetviewUrl(lat, lon) {
  return `https://maps.googleapis.com/maps/api/streetview\?size\=400x400\&location=${lat},${lon}&key=${
    process.env.REACT_APP_GOOGLE_MAPS_APIKEY
  }`;
}
