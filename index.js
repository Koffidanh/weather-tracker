$(document).ready(function () {
    //adding the city name into an array
    var cities = [];
    var myKey = config.My_KEY;
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
        var city = $("#inputCity").val().trim();
        //console.log(city);
        //alert(city);
        //Adding the city to cities
        cities.push(city);
        console.log(cities);
        //Set up the local Storage
        localStorage.setItem("cities", JSON.stringify(cities));
        generatedBtn();
        getResponse();

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
    };

    //Setting up clear button
    $("#clear").click(function (event) {
        // We're optionally using a form so the user may hit Enter to search instead of clicking the button
        event.preventDefault();
        for (let i = 0; i < recallCity.length; i++) {
            //Clear display
            $("#cityView").text("");
            $("#cityView").empty();
        }
    });

    //Listening for cityBtn 
    // $(document).click(function (event) {

    //     getResponse();
    // });


    //Calling API through a function
    function getResponse() {
        //Variable
        var city = $("#inputCity").val().trim();
        //console.log(city);
        //alert(city); 
        // calling the API for city current weather data   
        var queryUrl = "https://api.openweathermap.org/data/2.5/weather?&units=imperial&q=" + city + "&appid=" + myKey;

        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (response) {
            console.log(response);

            //Response data as variable
            //console.log(response.name);


            //Getting the log and lat
            var lon = response.coord.lon;
            console.log(lon);
            var lat = response.coord.lat;
            console.log(lat)


            // calling the API for city current weather data  
            var queryUrl1 = "https://api.openweathermap.org/data/2.5/onecall?&units=imperial&lat=" + lat + "&lon=" + lon + "&appid=" + myKey;
            $.ajax({
                url: queryUrl1,
                method: "GET"
            }).then(function (response) {
                console.log(response)
                console.log(response.current.uvi);
                console.log(response.current.dt);

                //Convert the epoch to human-readable date
                var myDate = new Date(response.current.dt * 1000);
                console.log(myDate);
                var month = myDate.getMonth() + 1;
                console.log(month);
                var day = myDate.getDate();
                console.log(day);
                var year = myDate.getFullYear();
                console.log(year);
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
                $(".temp").text("Temperature:" + " " + Math.round(response.current.temp) + "F");
                $(".temp").addClass("weather");
                //Humidity
                $(".humidity").text("Humidity:" + " " + Math.round(response.current.humidity) + "%");
                $(".humidity").addClass("weather");
                //Wind Speed
                $(".wind").text("Wind Speed:" + " " + Math.round(response.wind_speed) + " " + "MPH");
                $(".wind").addClass("weather");
                //UV 
                $(".uvIndex").text("UV Index:" + " " + response.current.uvi);
                $(".uvIndex").addClass("weather");

                //Creating the 5 day forecast

                for (let i = 0; i < 5; i++) {
                    //Convert the epoch to human-readable date
                    var myDateForecast = new Date(response.daily[i].dt * 1000);
                    console.log(myDateForecast);
                    var monthForecast = myDateForecast.getMonth() + 1;
                    console.log(monthForecast);
                    var dayForecast = myDateForecast.getDate();
                    console.log(dayForecast);
                    var yearForecast = myDate.getFullYear();
                    console.log(yearForecast);
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
                    $(`.forecastTemp${i}`).text("Temp:" + " " + Math.round(((response.daily[i].temp.max)+(response.daily[i].temp.min))/2) + "F")
                    $(`.forecastTemp${i}`).addClass("forecastClass");
                    //console.log("Temp:" + " " + Math.round(((response.daily[i].temp.max)+(response.daily[i].temp.min))/2) + "F")
                     //Creating temperature in forecast
                     $(`.forecastTemp${i}`).text("Humidity:" + " " + Math.round(response.daily[i].humidity));
                     $(`.forecastTemp${i}`).addClass("forecastClass");
                };
            });



        });



    };







});