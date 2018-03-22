$(document).ready(function() {  

var arrayData2 = [];
function apiCall(api, api2) {
	var please;
	$.ajax({
        url: 'https://api.themoviedb.org/3/movie/'+api+'?api_key=ece7966c119923d24c65ccb57a5da71c&language=en-US&page=1',
        async: true,
        success: function(data) {
            var resultsLength = data.results.length;
			var someObject;
			
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
				$('.container').append('<div class="asdf" movieId="'+movieId+'"><img src="https://image.tmdb.org/t/p/w185/'+image+'"></div>')
			
			}
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
			function o() {
				$.ajax({
		          	url: 'box.html',
		          	type: 'GET',
		          	async: true,
		          	dataType: 'html',
		          	success: function(result){
		            	$("main").html(result);
		            	$.getScript("jquery2.js");
		          	}
		       	});

			}
			o() 
        }
    });
   
}

apiCall('popular')
apiCall('top_rated')
apiCall('now_playing')
});
