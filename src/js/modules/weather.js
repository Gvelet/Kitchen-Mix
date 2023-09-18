function weather(){
    const link = `http://api.weatherstack.com/current?access_key=8bb158d5a1460720a67eb65684e83f98`;

    const weatherInfo = document.querySelector('.weather-info');
    const header = document.querySelector('.header__top');
    const weatherForm = document.querySelector('.weather-form');
    const weatherSearch = document.querySelector('.weather-search');
    const weatherSubmit = document.querySelector('.weather-submit');

    let store = {
        city: 'Москва',
        temperature: 0,
        isDay: 'yes',
        localtime: "",
    }

    const fetchWeather = async () => {
        try{
            const getCity = localStorage.getItem('city') || store.city
            
            const response = await fetch(`${link}&query=${getCity}`);
            const data = await response.json('');
            
            const {
                current: {temperature, is_day: isDay},
                location: {name, localtime},
            } = data

            store = {
                ...store,
                city: name,
                temperature,
                isDay,
                localtime,
            }


            renderWeather();
        }catch(err){
            console.log(err)
        }
    }

    const isDay = () => {
        const {isDay} = store;
        if(isDay !== 'yes'){
            header.style.backgroundColor = '#8B76A9';
            header.style.color = '#ffffff';
            weatherSearch.style.backgroundColor = '#C1B0D8';
            weatherSubmit.style.backgroundColor = '#A48BC7';            
        }else{
            header.style.backgroundColor ='';
            header.style.color = '';
            weatherSearch.style.backgroundColor = '';
            weatherSubmit.style.backgroundColor = ''; 
        }
    }

    const searchCity = (event) => {
        store = {
            ...store,
            city: event.target.value,
        }

    }
    
    const handleSubmit = (e) => {
        e.preventDefault();

        localStorage.setItem('city', store.city);

        fetchWeather();
        weatherSearch.value = '';
    }

    const markup = () => {
        const {city, temperature, localtime} = store;
        isDay()
        return `
            <div class="weather-temperature">
                <div class="weather-city"><span>${city}</span></div>
                <div class="weather-temperature"><span>${temperature}°</span></div>
                <div class="weather-time">${localtime.slice(-5)}</div>
            </div>
        `
    }
    
    const renderWeather = () => {
        weatherInfo.innerHTML = markup();
    }

    weatherForm.addEventListener('submit', handleSubmit);
    weatherSearch.addEventListener('input', searchCity);

    fetchWeather();
}


export default weather;