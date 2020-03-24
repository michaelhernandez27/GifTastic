var topics = ["Mike Trout", "Cody Bellinger", "Christian Yelich", "Max Scherzer", "Jacob DeGrom", "Javier Baez", "Nolan Arenado", "Ronald Acuna Jr.", "Aaron Judge", "Bryce Harper"]

function displayTopicInfo() {
	var baseballPlayers = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + baseballPlayers + "&api_key=2YJEMsiWAZ9z270M3pOvKyhCoBZjIY0R&limit=10";

	$.ajax({
		url: queryURL, 
		method: "GET"
	}).done(function(response) {
		
		var results = response.data;
		
		$("#baseballplayers").empty();
		
		for (var i = 0; i < results.length; i++) {
		
	
		var topicDiv = $("<div class='baseball'>");
		var rating = response.data[i].rating;
		var pRate = $("<p>").text("Rating: " + rating);
		
		topicDiv.append(pRate);
		
		var giphyImgStill = response.data[i].images.downsized_still.url;
		var giphyImgMotion = response.data[i].images.downsized.url;
		var image = $("<img>").attr("src", giphyImgStill);
		
		image.attr("data-still", giphyImgStill);
		image.attr("data-animate", giphyImgMotion);
		image.attr("data-state", "still");
		image.attr("id", "img"+i)
		image.addClass("giphyImages");
		topicDiv.prepend(image);
		$("#baseballplayers").prepend(topicDiv);
		}
	})
}

function renderButtons() {
	
	$("#baseballButtons").empty();

	
	for (var i = 0; i < topics.length; i++) {
		var a = $("<button>");
		a.addClass("topic");
		a.addClass("btn btn-lg");
	    a.attr("data-name", topics[i]);
		a.attr("type", "button");
		a.text(topics[i]);
		
		$("#baseballButtons").append(a);
	}
}


$("#addBaseballPlayers").on("click", function(event) {
	event.preventDefault();
    
    var topic = $("#baseball-input").val().trim();
    topics.push(topic);
    
    $("form").trigger("reset")
	
    renderButtons();
    });


$(document).on("click", ".topic", displayTopicInfo);

renderButtons();




$(document).on("click", ".giphyImages", flipAnimate);



function flipAnimate() {
	var item = $(this).attr("id");
	item = "#"+item;
	var state = $(item).attr("data-state");
	
	if (state === "still") {
        $(item).attr("src", $(item).attr("data-animate"));
        $(item).attr("data-state", "animate");
        
      } else {
        $(item).attr("src", $(item).attr("data-still"));
        $(item).attr("data-state", "still");
        
      };
};