const input = document.querySelector('input');
const btn = document.querySelector('button');

const cityName = document.querySelector('.city-name');
const warning = document.querySelector('.warning');
const photo = document.querySelector('.photo');
const description = document.querySelector('.description');
const weather = document.querySelector('.weather');
const temperature = document.querySelector('.temp');
const humidity = document.querySelector('.humidity');

const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&appid=f721675e44e004a83f5dd33fa7b62780';
const units = '&units=metric';

let city;
let url;

const getWeather = () => {
    city = (!input.value) ? 'New York' : input.value;
    url = apiLink + city + apiKey + units;
    axios.get(url)
        .then(res => {
            input.value = '';
            const temp = res.data.main.temp;
            const hum = res.data.main.humidity;
            const status = Object.assign({}, ...res.data.weather);
            cityName.textContent = res.data.name;
            weather.textContent = status.main;
            temperature.textContent = Math.floor(temp) + '°C';
            humidity.textContent = hum + '%';
            description.textContent = status.description;
            warning.textContent = '';
            if (status.id >= 200 && status.id < 300) {
                photo.setAttribute('src', "img/thunderstorm.png");
            } else if (status.id >= 300 && status.id < 400) {
                photo.setAttribute('src', "img/drizzle.png");
            } else if (status.id >= 500 && status.id < 600) {
                photo.setAttribute('src', "img/rain.png");
            } else if (status.id >= 600 && status.id < 700) {
                photo.setAttribute('src', "img/ice.png");
            } else if (status.id >= 700 && status.id < 800) {
                photo.setAttribute('src', "img/fog.png");
            } else if (status.id === 800) {
                photo.setAttribute('src', "img/sun.png");
            } else if (status.id > 800 && status.id < 900) {
                photo.setAttribute('src', "img/cloud.png");
            } else {
                photo.setAttribute('src', "img/unknown.png");
                console.log(status);
            }
        })
        .catch(() => {
            warning.textContent = 'Wpisz poprawną nazwę miasta.'
        })
};
const enterCheck = () => {
    if (event.keyCode === 13) {
        getWeather();
    }
}

getWeather();
btn.addEventListener('click', getWeather);
input.addEventListener('keyup', enterCheck);



VANTA.GLOBE({
    el: "body",
    mouseControls: true,
    touchControls: true,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0x2d6993,
    backgroundColor: 0xb090f
});