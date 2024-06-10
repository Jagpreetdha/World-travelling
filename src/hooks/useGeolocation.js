import { useState } from "react";

function useGeolocation(defaultPosition=null) {
  const [position, setPosition] = useState(defaultPosition);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function getPosition() {
    if (!navigator.geolocation)
      return setError("Your Browser does not support geolocation");

    setIsLoading(true);

    navigator.geolocation.getCurrentPosition(
      function (pos) {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longtitude,
        });
        setIsLoading(false);
      },
      function (error) {
        setError(error);
        setIsLoading(false);
      }
    );
  }
  return { position, isLoading, error,getPosition };
}
export {useGeolocation};
