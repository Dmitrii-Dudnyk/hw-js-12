import "./css/styles.css";
import debounce from "lodash.debounce";
import countriesListTpl from "./templates/countries-list.hbs";
import countryCardTpl from "./templates/country-card.hbs";
import API from "./js/fetchCountries";
import getRefs from "./js/get-refs";
import error from "./js/pnotify";

const refs = getRefs();

refs.searchCountry.addEventListener("input", debounce(inputChange, 500));

function inputChange(e) {
  const searchQuery = e.target.value;

  API.fetchCountryByName(searchQuery).then(searchCountries).catch(console.log);
}

function searchCountries(countries) {
  if (countries.length > 10) {
    error({ text: "Too many matches found. Please enter a more specific query!", delay: 2000 });
  } else if (countries.status === 404) {
    error({ text: "Country with that name was not found!", delay: 2000 });
  }
  renderMarkup(countries);
}

function renderMarkup(countries) {
  if (countries.length > 1 && countries.length <= 10) {
    refs.cardContainer.innerHTML = countriesListTpl(countries);
  } else if (countries.length === 1) {
    refs.cardContainer.innerHTML = countryCardTpl(...countries);
  }
}
