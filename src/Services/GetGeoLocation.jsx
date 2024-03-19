import { useState, useEffect } from 'react';

const useLocation = (onLocationChange) => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const getAddress = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyD3dRlhejixTZP72aNBTtXBRg_olo-bVxQ`
      );
      const data = await response.json();

      if (data.status === 'OK' && data.results.length > 0) {
        const address = data.results[0].formatted_address;
        return address;
      } else {
        throw new Error('Error fetching address');
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };


    const requestLocationPermission = async () => {
      try {
        const result = await navigator.permissions.query({ name: 'geolocation' });

        if (result.state === 'granted') {
          // Permission already granted
          getLocation();
        } else if (result.state === 'prompt') {
          // Ask the user for permission
          const position = await getCurrentPosition();
          setLocation(position);
        }
        // If result.state is 'denied', the user has blocked location access
      } catch (err) {
        setError(err.message || 'Error checking location permission');
      }
    };

    const getCurrentPosition = async () => {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => resolve(position.coords),
          (err) => reject(err.message)
        );
      });
    };

    const getLocation = async () => {
      try {
        const position = await getCurrentPosition();
        setLocation(position);
      } catch (err) {
        setError(err);
      }
    };
  useEffect(() => {
    requestLocationPermission();
  }, []);

  useEffect(() => {
    if (location && onLocationChange) {
      onLocationChange(location);
    }
  }, [location, onLocationChange]);

  

  return { location, error, getAddress };
};

export default useLocation;
