var nameInput = $("#streamName"),
		urlInput= $("#streamUrl");

var url = window.location.search;
//var tripId;
//var userId;
// Sets a flag for whether or not we're updating a post to be false initially
//var updating = false;

function submitStream(stream) {
  $.post("/homepage/new", stream, function() {
    window.location.href = "/homepage";
  });
}
/*
function updateStream(stream) {
    $.ajax({
      method: "PUT",
      url: "/homepage",
      data: stream
    })
    .done(function() {
      window.location.href = "/homepage";
    });
  }
*/
function handleFormSubmit(event) {
	event.preventDefault();
	// Wont submit the post if we are missing a body, title, or author
	if (!nameInput.val().trim() || !urlInput.val().trim()){
	  return;
	}
	// Constructing a newPost object to hand to the database
	var newStream = {
	  name: nameInput.val().trim(),
	  url: urlInput.val().trim()
	};

	// If we're updating a post run updatePost to update a post
	// Otherwise run submitPost to create a whole new post
//	if (updating) {
//	  newStream.id = tripId;
//	  updateTrip(newTrip);
//	}
//	else {
	  submitStream(newStream);
//	}
}

$("#streamSubmit").on("click", handleFormSubmit);