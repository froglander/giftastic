// Declare array of button names
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
				   "Chocolate",
				   "Fudge",
				   "Cinnamon Rolls",
				   "Chocolate Chip"]


function createButtons(){
	var $giphyButtons = $('.giphyButtons');
	$giphyButtons.empty();

	$.each(giphyTheme, function(index, value) {
		var $itemButton = $('<button>')
					.attr("data-dessert", value)
					.text(value)
					.addClass("btn btn-default giphyButton")
					.on("click", clickButton)
					.appendTo($giphyButtons);			
	})
};


function clickButton() {
	console.log("this:", this);
	var search = $(this).data('dessert');
	console.log("dessert:", search);

	
	$.ajax({
		url: "http://api.giphy.com/v1/gifs/search",
		data: {
			limit: 10,
			api_key: "dc6zaTOxFJmzC",
			q: search
		},
		method: 'GET'})
			.done(function(response) {
				var results = response.data;
				console.log(results);
				var gifHolder = $('.giphyImages');

				gifHolder.empty();
				$.each(results, function(key) {
					var $dessertDiv = $('<div>');					
					var $rating = $('<p>').text("Rating" + results[key].rating);
					console.log("rating:", results[key].rating);
					var $dessertImage = $('<img>').attr('src', results[key].images.fixed_height_still.url)
												  .attr('data-still', results[key].images.fixed_height_still.url)
												  .attr('data-animate', results[key].images.fixed_height.url)
												  .attr('data-state', 'still')
												  .addClass('dessertImage img-responsive')
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
					gifHolder.append($dessertDiv);
				});
		});
    };

$("#addButton").on("click", function(){
	var txtInput = $("#addButtonText").val().trim();
	console.log(giphyTheme.indexOf(txtInput));
	
	if (giphyTheme.indexOf(txtInput) == -1 && txtInput.length > 0 ) {
			giphyTheme.push(txtInput);
			$('#addButtonText').val("");
			$('#addButtonText').focus();
			createButtons();
	} 
	return false;
});

$(document).ready(function() { 
	createButtons();
});