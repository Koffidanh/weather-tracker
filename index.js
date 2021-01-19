$(document).ready(function () {
    //adding the city name into an array
    var cities = [];

    //Function for dispaying city data
    function generatedBtn() {
        //Clear variable
        $("#cityView").empty();
        
        //console.log(this);
        // Looping through the array of city
        for (var i = 0; i < cities.length; i++) {

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
        console.log(city);
        //alert(city);
        //Adding the city to cities
        cities.push(city);
        console.log(cities);
        generatedBtn()
    });


    //Set up the local Storage
    localStorage.setItem("cities", JSON.stringify(cities));
    //Call out the value from local storage
    // for (let i = 0; i < cities.length; i++) {
    //     var cityBtn = $("<button>");
    //     // Adding a class of movie to our button
    //     cityBtn.addClass("cityClass");
    //     // Adding a data-attribute
    //     cityBtn.attr("data-name", cities);
    //      // Providing the initial button text
    //      cityBtn.text(JSON.parse(localStorage.getItem(city)));
    //      // Adding the button to the HTML
    //      $("#cityView").append(cityBtn);
    //   }


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