// global variables

var cityInputEl = document.querySelector("#city-search")
var submitBtn = document.querySelector(".btn")
var cityList = document.querySelector(".history")

// function to retrieve and display user's searched city
var getCity = function() {
    // format the weather api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInputEl.value + "&appid=2f773b051d37d7cec042560d139536a5&units=imperial";
    

    // make a request to the url
    fetch(apiUrl).then(function(response) {
        
        if (response.ok) {
            response.json().then(function(data) {

                var tempEL = document.querySelector(".temp") 
                tempEL.textContent = "Temp: " + data.main.temp + "F";

                var windEl = document.querySelector(".wind")
                windEl.textContent = "Wind: " + data.wind.speed + "mph"

                var humidityEl = document.querySelector(".humidity")
                humidityEl.textContent = "Humidity: " + data.main.humidity + "%"
                saveCity()
            });
        
        }
    })
    fiveDay()
    //uvIndex()
};

// function to save and display past searches and turn them into usable links
var saveCity = function() {
    var dropd = document.getElementById("city-search").value;
    var drophistory = JSON.parse(localStorage.getItem("city")) || [];
    drophistory.push(dropd);
    localStorage.setItem("city", JSON.stringify(drophistory));
    const cityHistory = document.createElement("button")

    for (var i = 0; i < drophistory.length; i++) {

        
        cityHistory.classList.add("col-12")
        cityHistory.innerText = drophistory[i];
        cityList.appendChild(cityHistory);
    }

        var getCity2 = function() {
            // format the github api url
            var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + cityHistory.innerText + "&appid=2f773b051d37d7cec042560d139536a5&units=imperial";
            
        
            // make a request to the url
            fetch(apiUrl).then(function(response) {
                
                if (response.ok) {
                    response.json().then(function(data) {
        
                        var tempEL = document.querySelector(".temp") 
                        tempEL.textContent = "Temp: " + data.main.temp + "F";
        
                        var windEl = document.querySelector(".wind")
                        windEl.textContent = "Wind: " + data.wind.speed + "mph"
        
                        var humidityEl = document.querySelector(".humidity")
                        humidityEl.textContent = "Humidity: " + data.main.humidity + "%"
                    });
                
                }
            })
            
        };
        // add eventlistener to past searches
        cityHistory.addEventListener("click", getCity2)
    

}

// function to display the five day forcast for chosen city
var fiveDay = function() {
    var apiUrlFive = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInputEl.value + "&cnt=5&appid=2f773b051d37d7cec042560d139536a5"
        
        // make a request to the url
        fetch(apiUrlFive).then(function(response) {
        
            if (response.ok) {
                response.json().then(function(data) {
                    var daysEl = document.querySelector(".forcast")
                    let forcastString = JSON.stringify(data.list)
                    daysEl.textContent = forcastString

                });
            
            }
        })
}
// function to display the current uv index of city chosen
var uvIndex = function() {
    var apiUrlUv = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInputEl.value + "&appid=2f773b051d37d7cec042560d139536a5"
        
        // make a request to the url
        fetch(apiUrlUv).then(function(response) {
        
            if (response.ok) {
                response.json().then(function(data) {
                    var daysEl = document.querySelector(".forcast")
                    let forcastString = JSON.stringify(data.list)
                    daysEl.textContent = forcastString

                });
            
            }
        })
}


// add eventlistener to search button
submitBtn.addEventListener("click", getCity)
