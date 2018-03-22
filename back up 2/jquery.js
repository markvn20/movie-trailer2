

var arrayData2 = [];
function apiCall(api, api2, arg) {
	var please;
	$.ajax({
        url: 'https://api.themoviedb.org/3/movie/'+api+'?api_key=ece7966c119923d24c65ccb57a5da71c&language=en-US&page=1',
        async: true,
        success: function(data) {
            var resultsLength = data.results.length;
			var someObject;
			var widePoster = data.results[4].backdrop_path;
			
				$(arg).append('<div class="asdf" style="background-image: url(https://image.tmdb.org/t/p/original/'+widePoster+')" movieId="'+movieId+'"></div>')
		
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
				$('.' + api2).append('<div class="asdf" style="background-image: url(https://image.tmdb.org/t/p/w500/'+image+')" movieId="'+movieId+'"></div>')
			
			}
			return false;
			function test(par1) {
			 	$.ajax({
	                url: 'https://api.themoviedb.org/3/movie/'+par1+'?api_key=ece7966c119923d24c65ccb57a5da71c&language=en-US&page=1',
	                async: true,
	                success: function (data) {
	                	var results2Id = data.id;
	                	
	                	
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
	                	console.log(getTrailer)
						var trailerLength = getTrailer.length;
						for(var i = 0; i < trailerLength; i++) {
							var trailerKey = getTrailer[i].key;
							
							$('.asdf').append('<span class="trailer-button">'+trailerKey+'</span>')
						}

	                	
	                }
	            });
	        }	
           	$(document).on('click', 'div.asdf', function() {
				var get_movieKey = $(this).attr("data");
				var get_movieID = $(this).attr('movieId');
				test(get_movieID);
				test2(get_movieID);
				
			})

			$(document).on('click', '.trailer-button', function() {
				var key = $(this).html();
				$('iframe').attr('src', 'https://www.youtube.com/embed/' + key);
				console.log(key)
			})
			
        }
    });
   
}

$(document).on('click', 'div.asdf', function() {
	getHTML2()
	
})

$(document).on('click', '.back', function() {
	getHTML3()
	
})

function getHTML() {
	$.ajax({
      	url: 'main.html',
      	type: 'GET',
      	async: true,
      	dataType: 'html',
      	success: function(result){
        	$(".container").html(result);
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
        	apiCall('now_playing', 'main-1', '.section1')
			apiCall('popular', 'main-2' )
			apiCall('top_rated', 'main-3')
			apiCall('upcoming', 'main-4')
      	}
   	});

}


setTimeout(function(){
	$(document).ready(function() {  
		getHTML() 
		apiCall('now_playing', 'main-1', '.section1')
		apiCall('popular', 'main-2' )
		apiCall('top_rated', 'main-3')
		apiCall('upcoming', 'main-4')
});
 },100);






