export default function fetchCountries(name) {
    const API_URL = 'https://restcountries.com/v3.1';
    return fetch(`${API_URL}/name/${name}`)
        .then(response => {
            return response.json();
        })
        .catch(err => console.dir(err));
}