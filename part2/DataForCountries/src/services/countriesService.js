import axios from "axios";

const getFiltered = (country) => {
  return axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
    .then((response) => {
      const countries = response.data;
      const results = countries.filter((countries) => {
        return countries.name.common
          .toLowerCase()
          .includes(country.toLowerCase());
      });
      console.log(results);
      return results;
    })
    .catch((err) => console.log(err));
};

const getTemperature = (country, latitude, longitude) => {
  const api_key = import.meta.env.VITE_SOME_KEY;

  return axios
    .get(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?key=${api_key}`
    )
    .then((response) => {
      console.log(response);
      return response.data.currentConditions.temp;
    })
    .catch((err) => console.log(err));
};

const getWindSpeed = (country, latitude, longitude) => {
  const api_key = import.meta.env.VITE_SOME_KEY;
  return axios
    .get(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${latitude},${longitude}?key=${api_key}`
    )
    .then((response) => response.data.currentConditions.windspeed)
    .catch((err) => console.log(err));
};

export default { getFiltered, getTemperature, getWindSpeed };
