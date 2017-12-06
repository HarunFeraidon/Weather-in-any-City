var city = "Boston";

$(function() {
    $("#search").keyup(function(event) {
        if (event.keyCode === 13) {
            $(".button").click();
        }
    });
});


function getCity() {
    city = document.getElementById("search").value;
    getWeatherJSON(city);
    getFlickrJSON(city)
}

function getFlickrJSON(city) {
    let photoIndex = Math.floor(Math.random() * 30);
    $.getJSON('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=d293702bddac032f1687d9a78c009792&tags=' + city + '&text=' + city + '&sort=relevance&tag_mode=all&per_page=30&format=json&nojsoncallback=1', function(json) {
        var image = json.photos.photo[photoIndex];
        var imageURL = 'https://farm' + image.farm + '.staticflickr.com/' + image.server + '/' + image.id + '_' + image.secret + '.jpg';
        console.log(imageURL);
        document.getElementById('body').style.background = 'url(https://farm' + image.farm + '.staticflickr.com/' + image.server + '/' + image.id + '_' + image.secret + '.jpg) no-repeat center center fixed';
        document.getElementById('body').style.backgroundSize = 'cover';
    });
}

function getWeatherJSON(city) {
    $.getJSON('http://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=9e575b3e1c5f2cc65878a9984b11e4d4&units=imperial', function(json) {
        cityOutput(json.name, json.sys.country);
        getTime();
        temperatureOutput(json.main.temp);
        getIcon(json.weather[0].icon);
        informationOutput(json.weather[0].description, json.wind.speed, json.main.humidity)
        getDayOfWeek();
    });
    $.getJSON('http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=9e575b3e1c5f2cc65878a9984b11e4d4&units=imperial', function(json) {
        getForecast(json.list[0].main.temp_max, json.list[0].main.temp_min,
            json.list[1].main.temp_max, json.list[1].main.temp_min,
            json.list[2].main.temp_max, json.list[2].main.temp_min,
            json.list[3].main.temp_max, json.list[3].main.temp_min);
    });
}

function getForecast(day1max, day1min, day2max, day2min, day3max, day3min, day4max, day4min) {
    $(".day1max").text(day1max), $(".day1min").text(day1min);
    $(".day2max").text(day2max), $(".day2min").text(day2min);
    $(".day3max").text(day3max), $(".day3min").text(day3min);
    $(".day4max").text(day4max), $(".day4min").text(day4min);
}

function informationOutput(clouds, wind, humidity) {
    $('.clouds').text(clouds);
    $('.wind').text(wind);
    $('.humidity').text(humidity);
}

function getDayOfWeek() {
    let date = new Date();
    let day = date.getDay();
    let weekday = new Array(7);
    weekday[0] = "SUN";
    weekday[1] = "MON";
    weekday[2] = "TUE";
    weekday[3] = "WED";
    weekday[4] = "THU";
    weekday[5] = "FRI";
    weekday[6] = "SAT";

    let today = weekday[day];
    let day1 = weekday[(day + 1) % 7];
    let day2 = weekday[(day + 2) % 7];
    let day3 = weekday[(day + 3) % 7];
    let day4 = weekday[(day + 4) % 7];
    $('.day1').text(day1);
    $('.day2').text(day2);
    $('.day3').text(day3);
    $('.day4').text(day4);
}

function getIcon(data) {
    let $icon = $('.icon');

    switch (data) {
        // day
        case '01d':
            $icon.addClass('wi wi-day-sunny');
            break;
        case '02d':
            $icon.addClass('wi wi-day-cloudy');
            console.log(1);
            break;
        case '03d':
            $icon.addClass('wi wi-cloud');
            break;
        case '04d':
            $icon.addClass('wi wi-cloudy');
            break;
        case '09d':
            $icon.addClass('wi wi-day-rain');
            break;
        case '10d':
            $icon.addClass('wi wi-day-rain-mix');
            break;
        case '11d':
            $icon.addClass('wi wi-day-lightning');
            break;
        case '13d':
            $icon.addClass('wi wi-day-snow-wind');
            break;
        case '50d':
            $icon.addClass('wi wi-fog');
            break;
            // night
        case '01n':
            $icon.addClass('wi wi-night-clear');
            break;
        case '02n':
            $icon.addClass('wi wi-night-alt-cloudy');
            break;
        case '03n':
            $icon.addClass('wi wi-cloud');
            break;
        case '04n':
            $icon.addClass('wi wi-cloudy');
            break;
        case '09n':
            $icon.addClass('wi wi-showers');
            break;
        case '10n':
            $icon.addClass('wi wi-night-alt-showers');
            break;
        case '11n':
            $icon.addClass('wi wi-storm-showers');
            break;
        case '13n':
            $icon.addClass('wi wi-wi-night-alt-snow');
            break;
        case '50n':
            $icon.addClass('wi wi-fog');
            break;
    }
}


function cityOutput(city, country) {
    $('.location').text(city + ", " + country);
}

function getTime() {
    let currentdate = new Date();
    let hours = currentdate.getHours();
    let minutes = currentdate.getMinutes();
    let ampm;

    if (hours > 12) {
        ampm = 'PM'
        hours -= 12;
    } else {
        ampm = 'AM';
    }

    if (minutes < 10) {
        minutes = '0' + minutes;
    }

    let time = hours + ":" + minutes;
    $('.time').text(time + " " + ampm);
}

function temperatureOutput(temp) {
    $(".temp").text(temp + "  ");
}

getWeatherJSON('Dubai');
getFlickrJSON('Dubai');
