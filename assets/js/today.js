var date = new Date();
var dd = String(date.getDate()).padStart(2, '0');
var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
var month = date.toLocaleString('default', { month: 'long' });
var yyyy = date.getFullYear();
today = yyyy + '' + mm + '' + dd;

function getDirection(angle) {
    var directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    var index = Math.round(((angle %= 360) < 0 ? angle + 360 : angle) / 45) % 8;
    return directions[index];
}

function getVisibility(visibilityM) {
    var visibilityKM = (visibilityM / 1000).toFixed(2);
    return visibilityKM;
}

function getInPSI(pressure) {
    var pressureInPSI = (pressure / 68.948).toFixed(2);
    return pressureInPSI;
}

var dateToday = dd + ' ' + month + ' ' + yyyy ;
    document.getElementById("dateofday").innerText = dateToday

rawDataPath = '/assets/today.json'

function rawPath() {
    window.open(rawDataPath, "_blank")
}

function historical() {
    window.open("/history", "_self")
}

fetch(`./assets/today.json`)
    .then(response => response.json())
    .then(data => {
        document.querySelector("#temp").innerText = data.main.temp + ' °C',
        document.querySelector("#tempmin").innerText = data.main.temp_min + ' °C',
        document.querySelector("#tempmax").innerText = data.main.temp_max + ' °C',
        document.querySelector("#tempfeel").innerText = data.main.feels_like + ' °C',
        document.querySelector("#humidity").innerText = data.main.humidity + '%',
        document.querySelector("#windspeed").innerText = data.wind.speed + ' m/s' +  ' ' + getDirection(data.wind.deg),
        document.querySelector("#vis").innerText =  getVisibility(data.visibility) + ' KM',
        document.querySelector("#press").innerText = getInPSI(data.main.pressure) + ' psi',
        document.querySelector("#clouds").innerText = data.clouds.all + '%'

    });
