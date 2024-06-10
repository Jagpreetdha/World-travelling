/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setcurrentCity] = useState({});

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`http://localhost:8000/cities`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log(data);
        setCities(data);
      } catch (err) {
        console.error(`something went wrong: ${err.message}`);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`http://localhost:8000/cities/${id}`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log(data);
      setcurrentCity(data);
    } catch (err) {
      console.error(`something went wrong: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }
  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const res = await fetch(`http://localhost:8000/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
     
      // eslint-disable-next-line no-unused-vars
      const data = await res.json();
     
      setCities(cities=>[...cities,data])
    } catch (err) {
      console.error(`something went wrong: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }
  async function deleteCity(id) {
    try {
      setIsLoading(true);
      await fetch(`http://localhost:8000/cities/${id}`, {
        method: "DELETE",
       
      });
     
      setCities(cities=>cities.filter(city=>{
        if(city.id!==id) return city
      }))
     
    } catch (err) {
      console.error(`Error deleting the city: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity,createCity,deleteCity }}>
      {children}
    </CitiesContext.Provider>
  );
}
function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was used outside the cities provider");
  return context;
}
export { CitiesProvider, useCities };
