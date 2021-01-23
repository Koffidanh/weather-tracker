$(document).ready(function () {
    //Variable
    var city = $("input").val().trim();
    //adding the city name into an array
    var cities = [];

    //Function for dispaying city data
    function generatedBtn() {
        //Clear variable
        $("#cityView").empty();

        //console.log(this);
        // Looping through the array of city
        for (var i = 0; i < cities.length; i++) {
            $("#cityView").attr("style", "visibility : show")
            // Then dynamicaly generating buttons for each city in the array
            // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
            var cityBtn = $("<button>");
            // Adding a class of movie to our button
            cityBtn.addClass("cityClass");
            // Adding a data-attribute
            cityBtn.attr("data-name", cities[i]);
            // Providing the initial button text
            cityBtn.text(cities[i]);
            // Adding the button to the HTML
            $("#cityView").append(cityBtn);
        };

    };
    //Setting up search button
    $("#search").click(function (event) {
        // We're optionally using a form so the user may hit Enter to search instead of clicking the button
        event.preventDefault();
        //Variable
        var city = $("input").val().trim();
        //console.log(city);
        //alert(city);
        //Adding the city to cities
        cities.push(city);
        //console.log(cities);
        //Set up the local Storage
        localStorage.setItem("cities", JSON.stringify(cities));
        //Alert if city is missing 
        if (city === ("")) {
            alert("Error: Missing City name ")
        }

        generatedBtn();
        getResponse(city);

    });
    //Recall function
    var recallCity = JSON.parse(localStorage.getItem("cities"));
    //console.log(recallCity);

    for (let i = 0; i < recallCity.length; i++) {
        // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
        var cityBtn = $("<button>");
        // Adding a class of movie to our button
        cityBtn.addClass("cityClass");
        // Adding a data-attribute
        cityBtn.attr("data-name", JSON.parse(localStorage.getItem(cities[i])));
        cityBtn.attr("style", "color: black")
        // Providing the initial button text
        cityBtn.text(recallCity[i]);
        // Adding the button to the HTML
        $("#cityView").append(cityBtn);
        //console.log(this);

        //Listening for cityBtn 
        $(cityBtn).on("click", function (event) {
            event.preventDefault();

            var city = $(this).text();
            //console.log(city);
            //alert($(this).text());
            getResponse(city);

        });
    };

    //Setting up clear button
    $("#clear").click(function (event) {
        // We're optionally using a form so the user may hit Enter to search instead of clicking the button
        event.preventDefault();
        for (let i = 0; i < recallCity.length; i++) {
            //Clear display
            $("#cityView").text("");
            $("#current").empty();
            $("#forecast").empty();
        }
    });

    // //Calling API through a function
    function getResponse(city) {
        //Variable
        var myKey = 'ff8b5bcffa7f8f9e07bd897f72bbf6a4';
        //console.log(city);
        //alert(city); 
        // calling the API for city current weather data   
        var queryUrl = "https://api.openweathermap.org/data/2.5/weather?&units=imperial&q=" + city + "&appid=" + myKey;

        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (response) {
            // console.log(response);

            //Response data as variable
            //console.log(response.name);

            //Getting the log and lat
            var lon = response.coord.lon;
            // console.log(lon);
            var lat = response.coord.lat;
            //console.log(lat)

            // calling the API for city current weather data  
            var queryUrl1 = "https://api.openweathermap.org/data/2.5/onecall?&units=imperial&lat=" + lat + "&lon=" + lon + "&appid=" + myKey;
            $.ajax({
                url: queryUrl1,
                method: "GET"
            }).then(function (response) {
               // console.log(response)
                // console.log(response.current.uvi);
                //console.log(response.current.dt);

                //Convert the epoch to human-readable date
                var myDate = (new Date(response.current.dt * 1000));
                //console.log(myDate);
                var month = myDate.getMonth() + 1;
                // console.log(month);
                var day = myDate.getDate();
                //console.log(day);
                var year = myDate.getFullYear();
                //console.log(year);

                //document.write(myDate.toGMTString()+"<br>"+myDate.toLocaleString());
                //Setting current weather
                //Name and date and cloud
                $(".cityName").text(city + " " + "(" + month + "/" + day + "/" + year + ")");
                $(".cityName").addClass("name");
                //Weather icon
                var iconId = response.current.weather[0].icon;
                $(".currentIcon").attr("src", "http://openweathermap.org/img/wn/" + iconId + "@2x.png");
                $(".currentIcon").attr("alt", response.current.weather[0].description);
                $(".currentIcon").attr("style", "height: 50px");
                //Temperature
                $(".temp").text("Temperature:" + " " + Math.round(response.current.temp) + " \u00B0F");
                $(".temp").addClass("weather");
                //Humidity
                $(".humidity").text("Humidity:" + " " + Math.round(response.current.humidity) + "%");
                $(".humidity").addClass("weather");
                //Wind Speed
                $(".wind").text("Wind Speed:" + " " + Math.round(response.current.wind_speed) + " " + "MPH");
                $(".wind").addClass("weather");
                //console.log(Math.round(response.wind_speed));
                //UV 
                $(".uvIndex").text("UV In:" + " " + response.current.uvi);
                $(".uvIndex").addClass("weather");
                //UV color
                if ( response.current.uvi === 0 &&  response.current.uvi <= 2) {
                    $(".uvIndex").addClass("green");
                } else if (response.current.uvi === 3 &&  response.current.uvi <= 5) {
                    $(".uvIndex").addClass("yellow");
                }  else if (response.current.uvi === 6 &&  response.current.uvi <= 7) {
                    $(".uvIndex").addClass("orange");
                }  else if (response.current.uvi === 8 &&  response.current.uvi <= 10) {
                    $(".uvIndex").addClass("red");
                }

                
                //Creating the 5 day forecast

                for (let i = 0; i < 5; i++) {
                    //Convert the epoch to human-readable date
                    var myDateForecast = new Date(response.daily[i].dt * 1000);
                    // console.log(myDateForecast);
                    var monthForecast = myDateForecast.getMonth() + 1;
                    // console.log(monthForecast);
                    var dayForecast = myDateForecast.getDate();
                    // console.log(dayForecast);
                    var yearForecast = myDate.getFullYear();
                    //console.log(yearForecast);
                    //Adding class
                    //Creating date in forecast
                    $(`.forecastDay${i}`).text(monthForecast + "/" + dayForecast + "/" + yearForecast);
                    $(`.forecastDay${i}`).addClass("forecastClass");
                    //Creating icon in forecast
                    var forecastIconId = response.daily[i].weather[0].icon;
                    $(`.forecastIcon${i}`).attr("src", "http://openweathermap.org/img/wn/" + forecastIconId + "@2x.png");
                    $(`.forecastIcon${i}`).attr("alt", response.daily[i].weather[0].description);
                    $(`.forecastIcon${i}`).addClass("forecastClass");
                    //Creating temperature in forecast
                    $(`.forecastTemp${i}`).text("Temp:" + " " + Math.round(((response.daily[i].temp.max) + (response.daily[i].temp.min)) / 2) + " \u00B0F")
                    $(`.forecastTemp${i}`).addClass("forecastClass");
                    //console.log("Temp:" + " " + Math.round(((response.daily[i].temp.max)+(response.daily[i].temp.min))/2) + "F")
                    //Creating temperature in forecast
                    $(`.forecastTemp${i}`).text("Humidity:" + " " + Math.round(response.daily[i].humidity) + "%");
                    $(`.forecastTemp${i}`).addClass("forecastClass");
                };

            });

        });

    };

});