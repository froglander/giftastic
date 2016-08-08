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

/* ************************************************************	*/
/* Function : createButtons										*/
/* Parameters : none											*/	
/* Description : This function creates buttons as jquery 		*/
/*				 objects and appends them to the html element	*/
/*				 with class giphyButtons						*/
/* ************************************************************	*/
function createButtons(){
	var $giphyButtons = $('.giphyButtons');
	// Empty of existing buttons
	$giphyButtons.empty();
	// Build jquery button object and append
	$.each(giphyTheme, function(index, value) {
		var $itemButton = $('<button>')
					.attr("data-dessert", value)
					.text(value)
					.addClass("btn btn-default giphyButton")
					.on("click", clickGiphyButton)
					.appendTo($giphyButtons);			
	})
};

/* ************************************************************	*/
/* Function : clickGiphyButton									*/
/* Parameters : none											*/	
/* Description : This function creates makes the ajax call to 	*/
/*				 the giphy api and builds the jquery image 		*/
/*				 objects to be displayed						*/
/* ************************************************************	*/
function clickGiphyButton() {
	// Since this function is called from the button's onclick, 
	// 'this' will be the button element	
	var search = $(this).data('dessert');
	// Giphy api specifies that search terms with spaces should use a + between words
	search = search.replace(/ /g, "+");
	
	// Ajax call to giphy api
	$.ajax({
		url: "https://api.giphy.com/v1/gifs/search",
		data: {
			limit: 10,
			api_key: "dc6zaTOxFJmzC",
			q: search
		},
		method: 'GET'})
			.done(function(response) {
				var results = response.data;
				var gifHolder = $('.giphyImages');
				// Empty current giphy images
				gifHolder.empty();
				$.each(results, function(key) {
					// Build the dessertDiv
					var $dessertDiv = $('<div>').addClass("dessertImage");
					// Image rating
					var $rating = $('<p>').text("Rating: " + results[key].rating).addClass("rating");
					// Build the dessertImage and include the function for clicking to start/stop 
					// image animation
					var $dessertImage = $('<img>').attr('src', results[key].images.fixed_height_still.url)
												  .attr('data-still', results[key].images.fixed_height_still.url)
												  .attr('data-animate', results[key].images.fixed_height.url)
												  .attr('data-state', 'still')
												  .addClass('img-responsive')
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
					// Remove the rounded corners so it all fits together once you've clicked
					// a button for first set of giphy images
					$(".addButton").css("border-bottom-right-radius","0");
					$(".addButton").css("border-bottom-left-radius","0");
				});
			});
    };

/* ************************************************************	*/
/* Function : addButton											*/
/* Parameters : none											*/	
/* Description : This function allows the user to add more  	*/
/*				 buttons and then calls the createButtons 		*/
/*				 function to redisplay the buttons including	*/
/*				 the one just added								*/
/* ************************************************************	*/
$("#addButton").on("click", function(){
	var txtInput = $("#addButtonText").val().trim();
	// Make sure the button doesn't already exist and that the user
	// entered some text before adding to giphyTheme array
	if (giphyTheme.indexOf(txtInput) == -1 && txtInput.length > 0 ) {
			giphyTheme.push(txtInput);
			$('#addButtonText').val("");
			$('#addButtonText').focus();
			createButtons();
	} 
	return false;
});

/* ************************************************************	*/
/* Start things off with the document.ready to call the 		*/
/* createButtons function										*/	
/* ************************************************************	*/
$(document).ready(function() { 
	createButtons();
});