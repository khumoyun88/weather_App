const api={
    key:"a6a5b65c954203ad4b49205b42191171",
    baseurl:"https://api.openweathermap.org/data/2.5/",
};

const searchBox=document.querySelector('.search');
searchBox.addEventListener('keypress', setQuery);

function setQuery(e){
    if(e.keyCode==13){
        getResult(searchBox.value)
        console.log(searchBox.value);
    }
}


function getResult(query){
    fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather=>{
        return weather.json()
    })
    .then(displayResults)
}

function displayResults(weather){
    console.log(weather);

    let location=document.querySelector('.main-location .location'),
    data=document.querySelector('.main-location .data'),
    temperature=document.querySelector('.main-temp .temperature'),
    weatherType=document.querySelector('.main-temp .weather-type'),
    maxMinTemp=document.querySelector(' .main-temp .max-min-temp');


    location.innerHTML=`${weather.name}, ${weather.sys.country}`;
    let now=new Date()
    data.innerHTML=databuilder(now)
    temperature.innerHTML=`${Math.round(weather.main.temp)}<span>°C</span>`;
    weatherType.innerHTML=`${weather.weather[0].main}`
    maxMinTemp.innerHTML=`${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`
}
function databuilder(kh){

    let months=['January','February' ,'March' ,'Aprel','May','June','July','August','September','October','November' ,'December'];
    let weekdays=['S','Monday' ,'Thusday','Wednsday','Thursday','Friday', 'Saturday' ]
    let weekday=weekdays[kh.getDay()]
    let data=kh.getDate()
    let month=months[kh.getMonth()]
    let year=kh.getFullYear()

    return `${weekday} ${data} ${month} ${year}`
}