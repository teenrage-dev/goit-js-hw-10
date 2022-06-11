import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchCountries from './fetchCountries';

const refs = {
    input: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
};


const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', debounce(countryName, DEBOUNCE_DELAY));



function countryName(e){
    const countryToFind = e.target.value;
    console.log(e);

    fetchCountries(countryToFind.trim())
        .then(c => {
            console.log(c.status);
                if (Number(c.status) === 404) {
                    Notify.failure("Oops, there is no country with that name");
                }

                refs.countryList.innerHTML = '';
                refs.countryInfo.innerHTML = '';

                if (c.length === 1) {
                    c.map(el => addCountryToList(createCountryEl(el)));
                }

                else if (c.length > 1 && c.length <= 10) {
                    c.map(el => {
                        const li = document.createElement('li');

                        li.innerHTML = el.name.common;
                        refs.countryList.append(li);
                        li.insertAdjacentHTML('afterbegin', `<img src="${el.flags.svg}">`);
                    });
                    
                } else {
                    refs.countryInfo.innerHTML = '';
                    if(c.status === undefined){
                        Notify.info("Too many matches found. Please enter a more specific name.");
                    }
                }
                

        })

}



function createCountryEl(country) {
    return `
        <div class="country-card">
            <div class="wrapper">
                <img src="${country.flags.svg}" alt="${country.name.official} flag">
                <h2>${country.name.official}</h2>
            </div>
                <p>Capital: ${country.capital}</p>
                <p>Population: ${country.population}</p>
                <p>Languages: ${Object.values(country.languages)}</p>
        </div>`;
};

function addCountryToList(country) {
    refs.countryInfo.insertAdjacentHTML('beforeend', country);
}

// addCountryToList(creatCountryEl(country)); 