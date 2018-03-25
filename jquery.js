$(document).ready(function() {  


var arrayData2 = [];
function getCategory(api, api2, arg) {
	var please;
	$.ajax({
        url: 'https://api.themoviedb.org/3/movie/'+api+'?api_key=ece7966c119923d24c65ccb57a5da71c&language=en-US&page=1',
        async: true,
        success: function(data) {
            var resultsLength = data.results.length;
			var someObject;
			
				var widePoster = data.results[0].backdrop_path;
				var image 			= data.results[0].poster_path;
				$(arg).append('<div class="movie-box" style="background-image: url(https://image.tmdb.org/t/p/original/'+widePoster+')" movieId="'+movieId+'"></div>')

		
			for(var i = 0; i < resultsLength; i++) {
				var resultsShort 	= data.results[i];
				var image 			= resultsShort.poster_path;
				var movieId 		= resultsShort.id;
				please = data.results[i].id;
				someObject = {
				    voteCount: resultsShort.vote_count,
				    id: resultsShort.id
				};

				var okay = data.results[i].id;
				$('.' + api2).append('<div class="movie-box" okay="'+i+'" style="background-image: url(https://image.tmdb.org/t/p/w500/'+image+')" movieId="'+movieId+'"><span class="show-details">show more</span></div>')
			
			}

			
			/*var movieBoxLength	= $('.main-1 .movie-box').length;
			var slideAmount 	= Math.floor(movieBoxLength/5);
			var slidePartial 	= movieBoxLength % 5;
			console.log(slidePartial)*/
			
        }
    });
   
}

function fullDetails(par1) {
 	$.ajax({
        url: 'https://api.themoviedb.org/3/movie/'+par1+'?api_key=ece7966c119923d24c65ccb57a5da71c&language=en-US&page=1',
        async: true,
        success: function (data) {
        	var results2Id = data;
        	$('.works').html(data.overview)
    	}
    });
}
 
function getVideo(id) {
 	$.ajax({
        url: 'https://api.themoviedb.org/3/movie/'+id+'/videos?api_key=ece7966c119923d24c65ccb57a5da71c&language=en-US',
        async: true,
        success: function(data2) {
        	var resultsKey 		= data2.results.length;
        	var results2Array 	= data2.results;
        	var getTrailer 		= results2Array.filter(function(e) {
				return e.type == "Trailer";
			});
        	var mainTrailer 	= getTrailer[0].key
			var trailerLength = getTrailer.length;

			for(var i = 0; i < trailerLength; i++) {
				var trailerKey = getTrailer[i].key;
				$('.movie-box').append('<span class="trailer-button">'+trailerKey+'</span>')
			}

			$('.movie-iframe').attr('src', 'https://www.youtube.com/embed/' + mainTrailer + '?autoplay=1&rel=0&amp;controls=0&amp;showinfo=0');
        	
        }
    });
}

function recommended(id) {
	$.ajax({
        url: 'https://api.themoviedb.org/3/movie/'+id+'/recommendations?api_key=ece7966c119923d24c65ccb57a5da71c&language=en-US&page=1',
        async: true,
        success: function(data) {
        	var resultsLength = data.results.length;
        	for(var i = 0; i < resultsLength; i++) {
        		var resultsShort	= data.results[i];
        		var movieId 		= resultsShort.id;
        		var poster 			=resultsShort.poster_path;
				$('.movie-section').append('<div class="recommended-box" movieId="'+movieId+'" style="background-image: url(https://image.tmdb.org/t/p/w500/'+poster+')">q</div>')
			}
        }
    });
}

	

$('.container').on('click', 'div.movie-box', function(event) {
	event.stopPropagation();
	$('.container').empty()
	$(window).scrollTop(0);
	var get_movieKey = $(this).attr("data");
	var get_movieID = $(this).attr('movieId');
	getTrailer(get_movieKey)
	fullDetails(get_movieID);
	getVideo(get_movieID);
	recommended(get_movieID)
	
})

$('.container').on('click', '.show-details', function(event) {
	event.stopPropagation();
	$('.main-trailer-detail').show();
	
})

$('.container').on('click', '.trailer-button', function() {
	var key = $(this).html();
	$('iframe').attr('src', 'https://www.youtube.com/embed/' + key);
})


var z = 0;
var q = 0;
$(document).on('click', '.left-arrow1',function() {
	z++
	q += 500;
	$('.slider-container1 .movie-box').css('transform','translateX(-500%)');
	
		
	$('.slider-container1 .movie-box:last-child').after($('.slider-container1 .movie-box:first-child'))
	$('.slider-container1 .movie-box:last-child').after($('.slider-container1 .movie-box:nth-child(1), .slider-container1 .movie-box:nth-child(2), .slider-container1 .movie-box:nth-child(3), .slider-container1 .movie-box:nth-child(4)'))
	
	
})

$(document).on('click', '.right-arrow1',function() {
	$('.movie-box').css('transform','translateX(-500%)');
	
		$('.slider-container1 .movie-box:first-child').before($('.slider-container1 .movie-box:last-child'))
		$('.slider-container1 .movie-box:first-child').before($('.slider-container1 .movie-box:nth-child(20), .slider-container1 .movie-box:nth-child(19), .slider-container1 .movie-box:nth-child(18), .slider-container1 .movie-box:nth-child(17)'))


})


$(document).on('click', '.back', function() {
	$('.container').empty()
	getMain()
	$('.container').removeClass('container-active ')
})


$(document).on('mouseenter', 'div.movie-box', function() {
	
})

$(document).on('mouseleave', 'div.movie-box', function() {
   
});


function getTrailer(movieKey) {
	$.ajax({
      	url: 'current-trailer.html',
      	type: 'GET',
      	async: true,
      	dataType: 'html',
      	success: function(result){
      		$('.container').css({'top': '100px;'});
      		$('.container').empty();
        	$(".container").html(result);
        	
      	}
   	});
}


function getMain2() {
	$.ajax({
      	url: 'main.html',
      	type: 'GET',
      	async: true,
      	dataType: 'html',
      	success: function(result){
      		$('.container').empty()
        	$(".container").html(result);
      	}
   	});

}


function getMain() {
	$.ajax({
      	url: 'main.html',
      	type: 'GET',
      	async: true,
      	dataType: 'html',
      	success: function(result){
        	$(".container").html(result);
        	getCategory('now_playing', 'slider-container1')
			getCategory('popular', 'slider-container2' )
			getCategory('top_rated', 'slider-container3')
			getCategory('upcoming', 'slider-container4', '.section1')
      	}
   	});

}
getMain()

  
$(document).on('scroll', function() {
    var currentScrollTop = $(this).scrollTop();
   	if(currentScrollTop > 0) {
   		$('header').addClass('header-fade')
   	}
   	else {
   		$('header').removeClass('header-fade')
   	}
});


});







