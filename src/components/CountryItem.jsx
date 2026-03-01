import styles from "./CountryItem.module.css";
import Flag from "./Flag";

function CountryItem({ country }) {
  return (
    <li className={styles.countryItem}>
      <Flag countryCode={country.countryCode} countryName={country.country} />
      <span>{country.country}</span>
    </li>
  );
}

export default CountryItem;
