$(document).ready(function() {  


var arrayData2 = [];
function apiCall(api, api2, arg) {
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
				$('.' + api2).append('<div class="movie-box" okay="'+i+'" style="background-image: url(https://image.tmdb.org/t/p/w500/'+image+')" movieId="'+movieId+'"></div>')
			
			}

			function test(par1) {
			 	$.ajax({
	                url: 'https://api.themoviedb.org/3/movie/'+par1+'?api_key=ece7966c119923d24c65ccb57a5da71c&language=en-US&page=1',
	                async: true,
	                success: function (data) {
	                	var results2Id = data;
	                	$('.works').html(data.overview)
                	}
	            });
	        }
		     
			function test2(id) {
			 	$.ajax({
	                url: 'https://api.themoviedb.org/3/movie/'+id+'/videos?api_key=ece7966c119923d24c65ccb57a5da71c&language=en-US',
	                async: true,
	                success: function(data2) {
	                	var resultsKey = data2.results.length;
	                	var results2Array = data2.results;

	                	var getTrailer = results2Array.filter(function(e) {
							return e.type == "Trailer";
						});
	                	
						var trailerLength = getTrailer.length;
						for(var i = 0; i < trailerLength; i++) {
							var trailerKey = getTrailer[i].key;
							
							$('.movie-box').append('<span class="trailer-button">'+trailerKey+'</span>')
						}

	                	
	                }
	            });
	        }
	        function getHTML2() {
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

           	$(document).on('click', 'div.movie-box', function() {
           		$('.container').empty()
				var get_movieKey = $(this).attr("data");
				var get_movieID = $(this).attr('movieId');
				getHTML2()
				test(get_movieID);
				test2(get_movieID);
				
			})

			$(document).on('click', '.trailer-button', function() {
				var key = $(this).html();
				$('iframe').attr('src', 'https://www.youtube.com/embed/' + key);
				
			})

			/*var movieBoxLength	= $('.main-1 .movie-box').length;
			var slideAmount 	= Math.floor(movieBoxLength/5);
			var slidePartial 	= movieBoxLength % 5;
			console.log(slidePartial)*/
			
        }
    });
   
}


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

$(document).on('click', 'div.movie-box', function() {
	
	$('.container').addClass('container-active ')
})

$(document).on('click', '.back', function() {
	$('.container').empty()
	getHTML3()
	$('.container').removeClass('container-active ')
})



function getHTML() {
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

function getHTML3() {
	$.ajax({
      	url: 'main.html',
      	type: 'GET',
      	async: true,
      	dataType: 'html',
      	success: function(result){
        	$(".container").html(result);
        	apiCall('now_playing', 'slider-container1')
			apiCall('popular', 'slider-container2' )
			apiCall('top_rated', 'slider-container3')
			apiCall('upcoming', 'slider-container4', '.section1')
      	}
   	});

}
getHTML3()

  
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







