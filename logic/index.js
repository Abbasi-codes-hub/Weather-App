let Input_Search = document.querySelector('.search-cont');
let cityName  = document.querySelector('.input-search')
let W_City = document.querySelector('.weather-city');
let W_Date_Time = document.querySelector('.weather-date-time');
let W_Forecast = document.querySelector('.weather-forecast');
let W_Icon = document.querySelector('.weather-icon');
let W_Temp = document.querySelector('.weather-temp');
let W_Min = document.querySelector('.weather-min');
let W_Max = document.querySelector('.weather-max');
let W_FeelLike = document.querySelector('.weather-feelslike');
let W_Humidity = document.querySelector('.weather-humidity');
let W_Wind = document.querySelector('.weather-wind');
let W_pressure = document.querySelector('.weather-pressure');
let meterPersecon = "m/s";
const GetCountryName = (code)=> {
    return new Intl.DisplayNames([code], { type: "region" }).of(code);
}
const GetDateTime = (dt) =>{
    const CurrDate = new Date(dt* 1000);
    // console.log(CurrDate);
    const options  = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric', 
        hour: "numeric",
        minute: 'numeric'
    };
    
    return  new Intl.DateTimeFormat("en-US" , options).format(CurrDate);
    
    
}
let city = "jhang";

Input_Search.addEventListener('submit' , (e)=>{
    e.preventDefault();
    
    let cityvalue = cityName;

    city = cityvalue.value;
    GetWeatherData();
    cityName.value = ""

})
const GetWeatherData = async () => {
    const WeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=50562dfbb1aab0331f354261ca5344f8&units=metric&lang=en
`
    try {
        const Res = await fetch(WeatherUrl);
        const Data = await Res.json();
        // console.log(Data)
        const {main ,name , weather , wind , sys, dt } = Data;
        W_City.innerHTML = `${name}, ${GetCountryName(sys.country)}`
        // console.log(Data);
        W_Date_Time.innerHTML = GetDateTime(dt) ;
        W_Forecast.innerHTML = `${weather[0].main}`;
        W_Icon.innerHTML =`<img src = "https://openweathermap.org/img/wn/${weather[0].icon}@4x.png" width = "90rem" hight = "80rem" >`
        W_Temp.innerHTML = `${Math.floor(main.temp)}&#176`;
        W_Min.innerHTML = `min ${Math.floor(main.temp)}&#176`;
        W_Max.innerHTML = `max ${Math.floor(main.temp)}&#176`;
        // W_Forecast.textContent = `${Weather.Main}`;
        W_FeelLike.innerHTML = `${Math.floor(main.feels_like)}&#176`
        W_Humidity.innerHTML = `${Math.floor(main.humidity)}&#176`
        W_Wind.innerHTML = `${Math.floor(wind.deg)}${meterPersecon}`
        W_pressure.innerHTML = `${Math.floor(main.pressure)}hp/a`
    } catch {
        console.log("error")
    }
}


GetWeatherData()
