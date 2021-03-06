//YOU CAN PASS var this = $(this) as a parameter to target that element in a function!
//call trailer api in section api
$(document).ready(function() {  


var arrayData2 = [];
// Movie category
function getCategory(api, api2, arg, arg2) {
	var please;
	$.ajax({
        url: 'https://api.themoviedb.org/3/movie/'+api+'?api_key=ece7966c119923d24c65ccb57a5da71c&language=en-US&page=1',
        async: true,
        cache: false,
        success: function(data) {
            var resultsLength = data.results.length;
			var someObject;
			var featuredTrailer = data.results[1].id;
			$(arg).html('<div class="movie-feature-container"><iframe class="movie-feature" width="560" height="315" data-src="" src="" frameborder="0" allowfullscreen></iframe></div>')
			for(var i = 0; i < resultsLength; i++) {
				var resultsShort 	= data.results[i];
				var image 			= resultsShort.poster_path;
				var wideImage 		= resultsShort.backdrop_path;
				var movieId 		= resultsShort.id;
				please = data.results[i].id;
				someObject = {
				    voteCount: resultsShort.vote_count,
				    id: resultsShort.id
				};

				var okay = data.results[i].id;
				$('.' + api2).append('<div class="movie-box" details="main-trailer-container'+arg2+'" okay="'+i+'" style="background-image: url(https://image.tmdb.org/t/p/w500/'+image+')" movieId="'+movieId+'"><div class="movie-box-active"></div><span class="play-circle"><img src="icon/play.png"></span><span class="show-details" main-trailer-container=".main-trailer-container'+arg2+'"><img src="icon/down-arrow.png"></span></div>')
			
			}

			$('.category-main .movie-box .show-details').remove();
			$('.movie-box-active').hide();
			/*var movieBoxLength	= $('.main-1 .movie-box').length;
			var slideAmount 	= Math.floor(movieBoxLength/5);
			var slidePartial 	= movieBoxLength % 5;
			console.log(slidePartial)*/

			getMovieFeature(featuredTrailer);
			function getMovieFeature(id) {
			 	$.ajax({
			        url: 'https://api.themoviedb.org/3/movie/'+id+'/videos?api_key=ece7966c119923d24c65ccb57a5da71c&language=en-US',
			        async: true,
			        cache: false,
			        success: function(data2) {
			        	var resultsKey 		= data2.results.length;
			        	var results2Array 	= data2.results;
			        	var getTrailer 		= results2Array.filter(function(e) {
							return e.type == "Trailer";
						});
			        	var mainTrailer 	= getTrailer[0].key;
			        	console.log(mainTrailer)
						$('.movie-feature').attr('src', 'https://www.youtube.com/embed/' + mainTrailer + '?autoplay=1&rel=0&amp;controls=0&amp;showinfo=0');
			        
			        }
			    });
			}
			
        }
    });
   
}


// Full details for movies
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
        cache: false,
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
        $(par3 + ' ' + '.play-trailer').attr('movieid',movieId)

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


// Get youtube video with key 
function getVideo(id, par1) {
 	$.ajax({
        url: 'https://api.themoviedb.org/3/movie/'+id+'/videos?api_key=ece7966c119923d24c65ccb57a5da71c&language=en-US',
        async: true,
        cache: false,
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
        		$(par1 + ' ' + '.trailer-video').append('<div class="more-videos" movieKey="'+movieKey+'" style="background-image: url(https://img.youtube.com/vi/'+movieKey+'/sddefault.jpg)"></div>')
        	}
        }
    });
}

// Recommended movies
function recommended(id) {
	$.ajax({
        url: 'https://api.themoviedb.org/3/movie/'+id+'/recommendations?api_key=ece7966c119923d24c65ccb57a5da71c&language=en-US&page=1',
        async: true,
        cache: false,
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

// Search movies
function searchResults(name, page) {
	$.ajax({
        url: 'https://api.themoviedb.org/3/search/movie?api_key=ece7966c119923d24c65ccb57a5da71c&language=en-US&query='+name+'&page='+page+'&include_adult=false',
        async: true,
        cache: false,
        success: function(data) {
   			var currentPage = data.page;
   			var totalResults = data.total_results;
   			var totalPage	= data.total_pages;
   			var q = 0;
   			var standardPage = 10;
   			if(totalPage < 10) {
   				standardPage = totalPage;
   			}
   			for(var i = 0; i < standardPage; i++) {
   				q++
   				$('.page-number-container').append('<div class="page-number" movie-name="'+name+'" page-counter="'+q+'">'+q+'</div>')
   				console.log(q)
   			}
        	var resultsLength = data.results.length;
        	for(var i = 0; i < resultsLength; i++) {
        		var resultsShort 	= data.results[i];
        		var movieId 		= resultsShort.id;
        		var rating 			= resultsShort.vote_average;
        		var poster 			= resultsShort.poster_path;
        		var z = 'https://image.tmdb.org/t/p/w500/'+poster+'';
        		if(poster == null) {
        			z = 'icon/no-image.png';
        		}
        		$('.result-container').append('<div class="result-box'+i+' result-box" movieId="'+movieId+'" style="background-image: url('+z+')"></div>')
			}
			$('.last-next').insertAfter($('.page-number:last-child'))
        }
    });
}


function searchResults2(name, page) {
	$.ajax({
        url: 'https://api.themoviedb.org/3/search/movie?api_key=ece7966c119923d24c65ccb57a5da71c&language=en-US&query='+name+'&page='+page+'&include_adult=false',
        async: true,
        cache: false,
        success: function(data) {
   			var currentPage = data.page;
   			var totalResults = data.total_results;
   			var totalPage	= data.total_pages;
   			var q = 0;
   			console.log(data)
        	var resultsLength = data.results.length;
        	for(var i = 0; i < 20; i++) {
        		var resultsShort 	= data.results[i];
        		var movieId 		= resultsShort.id;
        		var rating 			= resultsShort.vote_average;
        		var poster 			= resultsShort.poster_path;
        		var z = 'https://image.tmdb.org/t/p/w500/'+poster+'';

        		if(poster == null) {
        			z = 'icon/no-image.png';
        		}
        		$('.result-box'+i+'').css({'background-image': 'url('+z+')'});
        		
			}
        }
    });
}


function getSearch(par) {
	$('.container').addClass('container-active-search');
	$('.container').removeClass('container-active');
	getSearchResults(par)
	   
	
}

$('.container').on('click', '.page-number', function(event) {
	event.stopPropagation();
	var movieName = $(this).attr('movie-name');
	var pageCounter = $(this).attr('page-counter')
	searchResults2(movieName, pageCounter);

})

$('header').on('click', 'nav ul li', function(event) {
	event.stopPropagation();
	var trailerCategory = $(this).attr('category');
	category(trailerCategory)
	$('.container').addClass('container-active');
})


$('.container').on('click', '.play-trailer', function(event) {
	event.stopPropagation();
	var movieId = $(this).attr('movieid');
	$.when(getTrailer()).done(function () {
	    fullDetails(null, null, movieId)
	    getVideo(movieId)
		recommended(movieId)
	});
})


$('header').on('click', '.search-button', function(event) {
	event.stopPropagation();
	var movieName = $('.input').val();
	getSearch(movieName);
})

$('.input').keypress(function (e) {
	var movieName = $('.input').val();
	var key = e.which;
	if(key == 13)  // the enter key code
	{
		getSearch(movieName);
	}
}); 


$('.container').on('click', '.result-box', function(event) {
	event.stopPropagation();
	$('.container').addClass('container-active');
	$(window).scrollTop(0);
	var get_movieKey = $(this).attr("data");
	var get_movieID = $(this).attr('movieId');
	getTrailer(get_movieID)
})

	
$('.container').on('click', '.menu li', function(event) {
	event.stopPropagation();
	var overview = $(this).attr('data');
	$('.trailer-menu').fadeOut();
	$('.'+ overview).fadeIn();

	$('.menu li').removeClass('active-menu');
	$(this).addClass('active-menu');
	if($('.trailer').hasClass('active-menu')) {
		$('.trailer-overlay').fadeIn(200);
	}
	else {
		$('.trailer-overlay').fadeOut(200);
	}

	//move menu underline
	if($('.overview').hasClass('active-menu')) {
		$('.menu-underline').animate({'left': '0'}, 100);
	}
	else if($('.trailer').hasClass('active-menu')) {
		$('.menu-underline').animate({'left': '33.33%'}, 100);
	}
	else if($('.details').hasClass('active-menu')) {
		$('.menu-underline').animate({'left': '66.66%'}, 100);
	}
})


$('.container').on('click', 'div.movie-box', function(event) {
	event.stopPropagation();
	$('.container').addClass('container-active');
	$(window).scrollTop(0);
	var get_movieKey = $(this).attr("data");
	var get_movieID = $(this).attr('movieId');
	getTrailer(get_movieID)
	  
	
})

$('.container').on('click', '.recommended-box', function(event) {
	event.stopPropagation();
	var movieId = $(this).attr('movieid');
	getTrailer(movieId)
 	$('.movie-section').empty();
})


$('.container').on('click', '.show-details', function(event) {
	event.stopPropagation();
	$('.trailer-video').empty();
	$('.trailer-overlay').hide();
	var current 		= $(this);
	var trailerBox 		= $(this).attr('main-trailer-container');
	var movieId 		= $(this).parent().attr('movieId');
	var detailActive 	= $(this).parent().parent().parent().parent().parent().children('.main-trailer-container');
	$('.movie-box-active').fadeOut(200);
	$(this).siblings('.movie-box-active').fadeIn(200);
	$('.movie-box-active').addClass('active');
	$(this).siblings('.movie-box-active').removeClass('active');
	if($('.movie-box-active').hasClass('active')) {
		$(this).on('click', '.show-details', function(event) {return false})
	}

	$('.main-trailer-container').removeClass('show-details-active')
	$('.menu-underline').css({'left': '0'});
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
	$('.movie-box-active').hide();
})

$('.container').on('click', '.trailer-button', function() {
	var key 	= $(this).html();
	$('iframe').attr('src', 'https://www.youtube.com/embed/' + key);
})


var z = 0;
var q = 0;
$(document).on('click', '.right-all',function() {
	var slider = $(this).attr('data');
	console.log(slider)
	z++
	q += 500;
	$(slider + ' ' + '.movie-box').css('left','-100%');
	$(slider + ' ' + '.movie-box:last-child').after($(slider + ' ' + '.movie-box:first-child'))
	$(slider + ' ' + '.movie-box:last-child').after($(slider + ' ' + '.movie-box:nth-child(1), '+slider+' .movie-box:nth-child(2), '+slider+' .movie-box:nth-child(3), '+slider+' .movie-box:nth-child(4)'))
	
	
})


$(document).on('click', '.left-all',function() {
	var slider = $(this).attr('data');
	console.log(slider)
	$(slider + ' ' + '.movie-box').css('transform','translateX(-500%)');
	$(slider + ' ' + '.movie-box:first-child').before($(slider + ' ' + '.movie-box:last-child'))
	$(slider + ' ' + '.movie-box:first-child').before($(slider + ' ' + '.movie-box:nth-child(20), '+slider+' .movie-box:nth-child(19), '+slider+' .movie-box:nth-child(18), '+slider+' .movie-box:nth-child(17)'))


})


$(document).on('click', '.back', function() {
	$('.container').removeClass('container-active');
	$('.container').removeClass('container-active-search')
	getMain()
})

function category(category) {
	$.ajax({
      	url: 'category.html',
      	cache: false,
      	type: 'GET',
      	async: true,
      	dataType: 'html',
      	success: function(result){
      		$('.container').css({'top': '100px;'});
        	$(".container").html(result);
        	
      	},
      	complete: function(result) {
			getCategory(category, 'category-main');
	    }

   	});
}


function getTrailer(movieKey) {
	$.ajax({
      	url: 'current-trailer.html',
      	cache: false,
      	type: 'GET',
      	async: true,
      	dataType: 'html',
      	success: function(result){
      		$('.container').css({'top': '100px;'});
        	$(".container").html(result);
    		fullDetails(movieKey);
			getVideo(movieKey);
			recommended(movieKey);
      	}
   	});
}


function getSearchResults(par) {
	$.ajax({
      	url: 'search-result.html',
      	type: 'GET',
      	async: true,
      	cache: false,
      	dataType: 'html',
      	success: function(result){
        	$(".container").html(result);
        	searchResults(par)
      	}
   	});

}


function getMain2() {
	$.ajax({
      	url: 'main.html',
      	type: 'GET',
      	async: true,
      	cache: false,
      	dataType: 'html',
      	success: function(result){
        	$(".container").html(result);
      	}
   	});

}


function getMain() {
	$.ajax({
      	url: 'main.html',
      	type: 'GET',
      	async: true,
      	cache: false,
      	dataType: 'html',
      	success: function(result){
        	$(".container").html(result);
        	
			

      	},
      	complete: function(result) {
			getCategory('now_playing', 'slider-container1', null, '1')
			getCategory('popular', 'slider-container2' , null, '2')
			getCategory('top_rated', 'slider-container3', null, '3')
			getCategory('upcoming', 'slider-container4', '.section1', '4')

			var sliderLength = $('.slider-container').length;
			for (var i = 0; i < sliderLength + 1; i++) {
				console.log(i)
				$('.left-arrow' + i +', '+ '.right-arrow' + i).attr('data', '.slider-container' + i);
				}
	    }
	   	});
	    

}
getMain()

  
$(document).on('scroll', function() {
    var currentScrollTop = $(this).scrollTop();
   	if(currentScrollTop > 0) {
   		$('header').addClass('header-fade');
   	}
   	else {
   		$('header').removeClass('header-fade')
   	}
});




});







