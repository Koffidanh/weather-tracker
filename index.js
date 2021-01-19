$(document).ready(function () {
    //Setting up search button
    $("#search").click(function (event) {
        // We're optionally using a form so the user may hit Enter to search instead of clicking the button
        event.preventDefault();
        //Variable
        var city = $("#inputCity").val();
        console.log(city);
        //alert(city);
        //adding the city name into
        var cities = [];
        cities.push(city);
        console.log(cities);
        //console.log(this);
        // Looping through the array of city
        for (var i = 0; i < cities.length; i++) {

            // Then dynamicaly generating buttons for each city in the array
            // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
            var cityBtn = $("<button>");
            // Adding a class of movie to our button
            cityBtn.addClass("cityClass");
            // Adding a data-attribute
            cityBtn.attr("data-name", cities);
            // Providing the initial button text
            cityBtn.text(cities);
            // Adding the button to the HTML
            $("#cityView").append(cityBtn);
            //Set up the local Storage
            localStorage.setItem(cities[i], JSON.stringify(city));
            
        }
        //Call out the value from local storage
        for (let i = 0; i < cities.length; i++) {
            var cityBtn = $("<button>");
            // Adding a class of movie to our button
            cityBtn.addClass("cityClass");
            // Adding a data-attribute
            cityBtn.attr("data-name", cities);
             // Providing the initial button text
             cityBtn.text(JSON.parse(localStorage.getItem(city)));
             // Adding the button to the HTML
             $("#cityView").append(cityBtn);
          }
    });

    // calling the API for city current weather data
    //var queryUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=ff8b5bcffa7f8f9e07bd897f72bbf6a4";

    // $.ajax({
    //     url: queryUrl,
    //     method: "GET"
    // }).then(function (response) {
    //     console.log(response);
    //     console.log(response.main.temp)

    // });

    // $(".temp").text("Temp:" +" "+ response.main.temp);
    // //Setting local storage
    // for (let i = 0; i < cities.length; i++) {

    //     localStorage.setItem(cities[i],response);
    // }






});