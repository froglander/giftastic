var giphyTheme = [ "Pie",
				   "Cake",
				   "Brownies",
				   "Cookies",
				   "Cheesecake",
				   "Ice Cream",
				   "Popsicle",
				   "Truffles",
				   "Peanut Butter Pie",
				   "Ice Cream Sundae",
				   "S'mores",
				   "Carrot Cake",
				   "Chocolate"]

function createButtons(){
	var $giphyButtons = $('.giphyButtons');
	$giphyButtons.empty();

	$.each(giphyTheme, function(index, value) {
		var $itemButton = $('<button>')
					.attr("data-dessert", value)
					.text(value)
					.addClass("giphyButton")
					.on("click", clickButton)
					.appendTo($giphyButtons);			
	})
};


function clickButton() {
	console.log("this:", this);
	var dessert = $(this).data('dessert');
	console.log("dessert:", dessert);

	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + dessert + "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({
		url: queryURL,
		method: 'GET'
		})
		.done(function(response) {
			var results = response.data;
			console.log(results);
			var gifHolder = $('.giphyImages');

			gifHolder.empty();
			$.each(results, function(key) {
				var $dessertDiv = $('<div>');
				var $rating = $('<p>').text(results[key].rating);
				var $dessertImage = $('<img>').attr('src', results[key].images.fixed_height_still.url)
											  .attr('data-still', results[key].images.fixed_height_still.url)
											  .attr('data-animate', results[key].images.fixed_height.url)
											  .attr('data-state', 'still')
											  .addClass('dessertImage')
											  .on('click', function(){
											      var state =  $(this).data('state');
												  if (state == 'still') {
													$(this).data('state', 'animate');
													$(this).attr('src',  $(this).data('animate'));
												  } 
												  else {
													$(this).data('state', 'still');
													$(this).attr('src',  $(this).data('still'));                
												  }
											});
				$dessertDiv.append($rating);
				$dessertDiv.append($dessertImage);
				gifHolder.prepend($dessertDiv);
			});
		});
    };


$(document).ready(function() { 
	createButtons();
});