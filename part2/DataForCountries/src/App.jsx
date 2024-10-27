import { useEffect, useState } from "react";
import countriesService from "./services/countriesService";

const UserInterface = () => {
  const [country, setCountry] = useState("");
  const handleInput = (event) => {
    setCountry(event.target.value);
  };
  return (
    <form>
      <div>
        Find countries:
        <input value={country} onChange={handleInput} />
        <Search country={country} setCountry={setCountry} />
      </div>
    </form>
  );
};

const Search = ({ country, setCountry }) => {
  const [results, setResults] = useState(null);

  useEffect(() => {
    countriesService.getFiltered(country).then(setResults);
  }, [country]);

  const HandleButton = (event) => {
    event.preventDefault();
    setCountry(event.target.value);
  };

  const CountryDetails = () => {
    const [temp, setTemp] = useState("");
    const [windSpeed, setWindSpeed] = useState("");
    if (results && results.length === 1) {
      const languages = results[0].languages;
      const flagUrl = results[0].flags.png;
      const latitude = results[0].capitalInfo.latlng[0];
      const longitude = results[0].capitalInfo.latlng[1];
      countriesService
        .getTemperature(country, latitude, longitude)
        .then((temp) => setTemp(temp));
      countriesService
        .getWindSpeed(country, latitude, longitude)
        .then((wind) => setWindSpeed(wind));

      return (
        <div>
          <h1>{results[0].name.common}</h1>
          <p>Capital: {results[0].capital}</p>
          <p>Area: {results[0].area}</p> <br />
          <p>
            <strong>Languages:</strong>
          </p>
          <br />
          {Object.values(languages).map((language, index) => {
            return <li key={index}>{language}</li>;
          })}
          <br />
          <img src={`${flagUrl}`} />
          <h1>Weather in {results[0].capital}</h1>
          <p>Temperature: {`${temp}`} fahrenheit</p>
          <p>Wind Speed: {`${windSpeed}`} m/s</p>
        </div>
      );
    }
  };

  return (
    <div>
      {country === "" ? null : results && results.length > 10 ? (
        <li>Too many matches,specify another filter</li>
      ) : (
        results &&
        results.length > 1 &&
        results.map((country, index) => {
          return (
            <li key={index}>
              {country.name.common}{" "}
              <button onClick={HandleButton} value={country.name.common}>
                Show
              </button>
            </li>
          );
        })
      )}
      <CountryDetails />
    </div>
  );
};

function App() {
  return <UserInterface />;
}

export default App;
