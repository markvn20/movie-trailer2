//YOU CAN PASS var this = $(this) as a parameter to target that element in a function!
$(document).ready(function() {  


var arrayData2 = [];
function getCategory(api, api2, arg, arg2) {
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
				$('.' + api2).append('<div class="movie-box" details="main-trailer-container'+arg2+'" okay="'+i+'" style="background-image: url(https://image.tmdb.org/t/p/w500/'+image+')" movieId="'+movieId+'"><span class="show-details" main-trailer-container=".main-trailer-container'+arg2+'"><img src="icon/down-arrow.png"></span></div>')
			
			}

			
			/*var movieBoxLength	= $('.main-1 .movie-box').length;
			var slideAmount 	= Math.floor(movieBoxLength/5);
			var slidePartial 	= movieBoxLength % 5;
			console.log(slidePartial)*/
			
        }
    });
   
}

function fullDetails(par1, par2, par3) {
	$(par3 + ' ' + '.genre').empty();
	$(par3 + ' ' + '.genre').html('Genre: ');
	$(par3 + ' ' + '.company').empty();
	$(par3 + ' ' + '.company').html('Production: ');
	$(par3 + ' ' + '.country').empty();
	$(par3 + ' ' + '.country').html('Country: ');
 	$.ajax({
        url: 'https://api.themoviedb.org/3/movie/'+par1+'?api_key=ece7966c119923d24c65ccb57a5da71c&language=en-US&page=1',
        async: true,
        success: function (data) {
	      	var results2Id 		= data;
	      	var posterWide      = data.backdrop_path;
	      	var movieId 		= data.id;
    		var poster 			= data.poster_path;
    		var movieTitle 	  	= data.original_title;
    		var tagLine 		= data.tagline;
    		var ratingRaw		= data.vote_average;
    		var rating 			= (ratingRaw * 10);
    		var overview        = data.overview;
    		var overview2		= overview.split('.', 2);
    		var production 		= data.production_companies[0].name;
    		var countryShort 	= data.production_countries[0].iso_3166_1;
    		var country 		= data.production_countries[0].name;
    		var language 		= data.spoken_languages[0].name;
    		var releaseFull	 	= data.release_date;
    		var releaseDate 	= releaseFull.slice(0, 4);

        for(var i = 0; i < data.genres.length; i++) {
			var genres = data.genres[i].name;
			$(par3 + ' ' + '.genre').append(genres + ', ');
        }	
       
      	par2.parent().parent().parent().parent().parent().children().children('.side-overlay2').css({'background-image': 'url(https://image.tmdb.org/t/p/original/'+posterWide+')'});
      	$(par3 + ' ' + '.trailer-header .title').html(movieTitle + ' ' + '(' +countryShort + ')');
      	$(par3 + ' ' + '.tagline').html(tagLine);
      	$(par3 + ' ' + '.rating-percent').html(rating + '%');
      	$(par3 + ' ' + '.release-date').html(releaseDate);
      	$(par3 + ' ' + '.released').html(countryShort);
      	$(par3 + ' ' + '.language').html(language);
      	$(par3 + ' ' + '.synopsis').html(overview2);
        $(par3 + ' ' + '.company').append(production)
        $(par3 + ' ' + '.country').append(country)

    	//Rating Color Based off Percentage
		if(rating > 80) {
			$(par3 + ' ' + '.rating-percent').css({'color': 'green'});
		}
		else if (rating < 80 && rating > 70) {
			$(par3 + ' ' + '.rating-percent').css({'color': 'yellow'});
		}
		else {
			$(par3 + ' ' + '.rating-percent').css({'color': 'red'});
		}
    		
    		
    	}
    });
}
 
function getVideo(id, par1) {
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
				$('.movie-box').append('<span class="trailer-button"></span>')
			}
			$('.movie-iframe').attr('src', 'https://www.youtube.com/embed/' + mainTrailer + '?autoplay=1&rel=0&amp;controls=0&amp;showinfo=0');
        	
        	for(var i = 0; i < resultsKey; i++) {
        		var movieKey = data2.results[i].key;
        		$(par1 + ' ' + '.trailer-video').append('<div class="more-videos" style="background-image: url(https://img.youtube.com/vi/'+movieKey+'/sddefault.jpg)"></div>')
        	}
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

	
$('.container').on('click', '.menu li', function(event) {
	event.stopPropagation();
	var overview = $(this).attr('data');
	$('.trailer-menu').fadeOut();
	$('.'+ overview).fadeIn();
	$('.trailer-overlay').fadeIn(200);
})


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
	$('.trailer-video').empty();
	var current 		= $(this);
	var trailerBox 		= $(this).attr('main-trailer-container');
	var movieId 		= $(this).parent().attr('movieId');
	var detailActive 	= $(this).parent().parent().parent().parent().parent().children('.main-trailer-container');
	$('.main-trailer-container').removeClass('show-details-active')
	detailActive.addClass('show-details-active');
	$('.trailer-menu').hide();
	$('.trailer-overview').show();
	fullDetails(movieId, current, trailerBox);
	getVideo(movieId, trailerBox);
})

$('.container').on('click', '.exit', function(event) {
	event.stopPropagation();
	$('.main-trailer-container').removeClass('show-details-active');
	$('.side-overlay2').css({'background-image': 'none'})
	$('.trailer-overlay').hide();
})

$('.container').on('click', '.trailer-button', function() {
	var key 	= $(this).html();
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
        	getCategory('now_playing', 'slider-container1', null, '1')
    			getCategory('popular', 'slider-container2' , null, '2')
    			getCategory('top_rated', 'slider-container3', null, '3')
    			getCategory('upcoming', 'slider-container4', '.section1', '4')
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







