import { useState, useEffect } from "react";

const useCurrentLocation = (options = {}) => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  const handleSuccess = (pos) => {
    const { latitude, longitude } = pos.coords;
    setLocation({ latitude, longitude });
  };

  const handleError = (error) => {
    setError(error.message);
  };

  const getCurrentLocation = () => {
    const { geolocation } = navigator;
    if (!geolocation) {
      setError("Geolocation is not supported.");
      return;
    }
    geolocation.getCurrentPosition(handleSuccess, handleError, options);
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return { location, error, getCurrentLocation };
};

export default useCurrentLocation;
