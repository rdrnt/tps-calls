export const isSupported = (): boolean => Boolean(window.navigator);

export const requestPermission = () => {
  if (isSupported()) {
    navigator.geolocation.getCurrentPosition(
      () => {
        console.log('Scuess');
      },
      () => {
        console.log('Error');
      }
    ),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 60,
      };
  }
};
