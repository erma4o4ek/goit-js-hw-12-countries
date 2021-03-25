import './styles.css';
import refs from './js/refs';
import debounce from "lodash.debounce"
import fetchCountries from "./js/fetchCountries";
import countriesCard from './tamplates/countries.hbs';
import countryCard from './tamplates/country.hbs';

import { error } from '@pnotify/core/';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';

const dataShow = countries => {
   if (countries.length > 10) {
     error({
       text: 'Too many matches found. Please enter a more specific query!',
       delay: 3000,
     });
   }
   if (countries.length > 2 && countries.length <= 10) {
     refs.content.innerHTML = countriesCard(countries);
   }
   if (countries.length === 1) {
     refs.content.innerHTML = countryCard(...countries);
   }
 };
 
 const searchCountry = () => {
   if (refs.search.value.length > 0) {
     refs.content.innerHTML = '';
     fetchCountries(refs.search.value).then(response => dataShow(response));
   }
 };
 
 refs.search.addEventListener('input', debounce(searchCountry, 500));