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
    $(document).click(function (event) {

        getResponse();
    });


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
           
            //Convert the epoch to human-readable date
            var myDate = new Date(response.dt);
            console.log(myDate);
            //document.write(myDate.toGMTString()+"<br>"+myDate.toLocaleString());
            //Getting the log and lat
            var lon = response.coord.lon;
            console.log(lon);
            var lat = response.coord.lat;
            console.log(lat)
            //Setting current weather
            //Name and date and cloud
            $(".cityName").text(response.name + " " + "(" + myDate + ")");
            $(".cityName").addClass("name");
            //Temperature
            $(".temp").text("Temperature:" + " " + Math.round(response.main.temp) + "F");
            $(".temp").addClass("weather");
            //Humidity
            $(".humidity").text("Humidity:" + " " + Math.round(response.main.humidity) + "%");
            $(".humidity").addClass("weather");
            //Wind Speed
            $(".wind").text("Wind Speed:" + " " + Math.round(response.wind.speed) + " " + "MPH");
            $(".wind").addClass("weather");

            // calling the API for city current weather data  
            var queryUrl1 = "https://api.openweathermap.org/data/2.5/onecall?&units=imperial&lat=" + lat + "&lon=" + lon + "&appid=" + myKey;
            $.ajax({
                url: queryUrl1,
                method: "GET"
            }).then(function (response1) {
                console.log(response1)
                console.log(response1.current.uvi);
            });

            //UV 
            $(".uvIndex").text("UV Index:" + " " + response1.current.uvi );
            $(".uvIndex").addClass("weather");
        });



        };
       






});