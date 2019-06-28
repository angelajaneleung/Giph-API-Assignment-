$(document).ready(function () {
    //starting buttons//
    var topics = ["Ducks", "Rain", "Falling", "Sun", "Balloons"];

    function displayGifButtons() {
        $("#gifButtons").empty();
        for (var i = 0; i < topics.length; i++) {
            var gifButton = $("<button>");
            gifButton.addClass("action");
            gifButton.addClass("btn btn-primary")
            gifButton.attr("data-name", topics[i]);
            gifButton.text(topics[i]);
            $("#gifButtons").append(gifButton);
        }
    }

    //add a new  button//
    function NewButton() {
        $("#addGif").on("click", function () {
            var action = $("#action-input").val().trim();
            if (action == "") {
                return false;
            }
            topics.push(action);

            displayGifButtons();
            return false;
        });
    }

    //display all  the gifs//
    function displayGifs() {
        var action = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=b2PXsjBQZMZD9DZ1KkhR1aVO0R9ML6AK";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .fail(function (response) {
                alert("Sorry! There is no gif for thisbutton")
            })
            .done(function (response) {
                $("#gifsView").empty();
                //shows gif results//
                var results = response.data;

                for (var i = 0; i < results.length; i++) {
                    //div for the gifs to go inside//
                    var gifDiv = $("<div>");
                    gifDiv.addClass("gifDiv");
                    //rating of gif//
                    var gifRating = $("<p>").text("Rating: " + results[i].rating);
                    gifDiv.append(gifRating);
                    //the gif//states of the gif//
                    var gifImage = $("<img>");
                    gifImage.attr("src", results[i].images.fixed_height_small_still.url); 
                    gifImage.attr("data-still", results[i].images.fixed_height_small_still.url); 
                    gifImage.attr("data-animate", results[i].images.fixed_height_small.url); 
                    gifImage.attr("data-state", "still"); 
                    gifImage.addClass("image");
                    gifDiv.append(gifImage);

                    $("#gifsView").prepend(gifDiv);
                }
            });
    }

    displayGifButtons();
    NewButton();

    //Event Listeners//
    $(document).on("click", ".action", displayGifs);
    $(document).on("click", ".image", function () {
        var state = $(this).attr('data-state');
        if (state == "still") {
            $(this).attr("src", $(this).data("animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).data("still"));
            $(this).attr("data-state", "still");
        }
    });
});