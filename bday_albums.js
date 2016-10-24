var albumApp = {};
albumApp.tracks = [];
// Request data from the Spotify API
albumApp.getAlbum = function(year) {
	var albumUrl = 'https://api.spotify.com/v1/search'
	
	// console.log(year);
	
	$.ajax({
		url: albumUrl,
		method: 'GET',
		dataType: 'json',
		data: {
			q: 'year:' + year,
			type: 'album',
			limit: '50',
			market: 'US'
		}
	})
	.then(function(result){
		// console.log(result);
		albumApp.displayAlbum(result);
	});
};

albumApp.getTrax = function(id) {

	$.ajax({
		url: `https://api.spotify.com/v1/albums/${id}/tracks`,
		method: 'GET',
		dataType: 'json',
		data: {
			limit: '30'
		}
	})
	.then(function(result){
		// console.log(result.items);
		albumApp.tracks = albumApp.tracks.concat(result.items);
		console.log(albumApp.tracks);
	});
};

// gather trax from selected items!!!!!!!!!!!
// take data build up playlist
// iframe....
// number of selected albums
// gather trax together
// generate random trax (15)
// id's from random trax
// append to url from iframe
// see erin


// User enters their year of birth
// And then the user clicks submit and the data comes back, display on page
// Display filtered results of albums
albumApp.displayAlbum = function(album) {
	// console.log('inside display art', album.albums.items[0].images[0].url);

	var items = album.albums.items;
	console.log(album);
	for (i = 0; i < items.length; i++) {
		var url = album.albums.items[i].images[1].url;
		var albumId = album.albums.items[i].id;
		var x = $('<img>').attr('src', url).attr('data-albumId', albumId);
		$('.albumChoices').append(x);
	}

};

// On click select album
// When album is clicked, select it
albumApp.chooseAlbum = function() {
	$('#albums').on('click', 'img', function() {
		console.log('click album');
		var id = $(this).attr('data-albumId');
		console.log('this is our', id);
		albumApp.getTrax(id);
		// albumApp.tracks.push(id);
		// console.log(tracks);
		var randomNum = albumApp.tracks[Math.floor(Math.random() * albumApp.tracks.length)];
		console.log(randomNum);
	});
};

$(".results").hide();

$("footer").hide();

// Create playlist from selected albums
// Playlist plays when user clicks play

albumApp.init = function() {
	console.log('Working');
	$('form').on('submit', function(e) {
		e.preventDefault();
		$(this).hide();
		$('.results').show();
		$('footer').show();
		console.log('Form submitted');
		var searchQuery = $('input[type=search]').val();
		console.log(searchQuery);
		albumApp.getAlbum(searchQuery);
	});

	// $(function() {
	//    function loadImages(arr) {
	//       if (arr.length !== 0) {
	//         loadImage(arr);
	//       }
	//     }
	// })    

	$(".results").html(`
	<div class=button>
		<a class="close" href="#">Well it's my birthday too, yeah!<br/><span>Click for another year</span></a>
	</div>
	`);


	$(".close").on('click', function() {
	  // e.preventDefault();
	   window.location.reload();
	   setTimeout(window.location.reload);
	});
	$(".tryAgain").on('click', function() {
	  // e.preventDefault();
	   window.location.reload();
	   setTimeout(window.location.reload);
	});
	albumApp.chooseAlbum()
};
//make function for random number
//loop through selected tracks
//push 10 tracks into a new array
//display those 10 tracks
// Display random playlist from year selected
albumApp.displayPlaylist = function(playlist) {
	

};

// $('footer').html(`
// 	<ul>
//       <li><strong>Michael Scarlett: </strong> </li>
//       <li><a href="http://www.michaelscarlett.co" target="_blank">Website</a></li>
//       <li><a href="http://www.twitter.com/dameronscarlett" target="_blank"><i class="fa fa-twitter" aria-hidden="true"></i> Twitter</a></li>
//     </ul>
// `)









$(document).ready(function(){
	albumApp.init();
});