/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../contexts/CitiesContext";
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
  const flagemojiToPNG = (flag) => {
    var countryCode = Array.from(flag, (codeUnit) => codeUnit.codePointAt())
      .map((char) => String.fromCharCode(char - 127397).toLowerCase())
      .join("");
    return (
      <img src={`https://flagcdn.com/24x18/${countryCode}.png`} alt="flag" />
    );
  };
function CityItem({ city }) {
  const {currentCity,deleteCity} = useCities()
  // eslint-disable-next-line no-unused-vars
  
  const { cityName, emoji, date,id,position } = city;
  function handleClick(e){
    e.preventDefault()
    deleteCity(id)
  }
  return (
    <li>
      <Link className={`${styles.cityItem} ${id===currentCity.id?styles['cityItem--active']:''}`}  to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
        <span className={styles.emoji}>
        {flagemojiToPNG(emoji)}
          
        </span>
        <span className={styles.name}>{cityName}</span>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleClick}>&times;</button>
      </Link>
    </li>
  );
}
export default CityItem;
