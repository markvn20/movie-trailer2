$(document).ready(function() {  

var arrayData2 = [];
function apiCall(api, api2) {
	var please;
	$.ajax({
        url: 'https://api.themoviedb.org/3/movie/'+api+'?api_key=ece7966c119923d24c65ccb57a5da71c&language=en-US&page=1',
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
				$('.container').append('<div class="asdf" movieId="'+movieId+'"><img src="http://image.tmdb.org/t/p/w185/'+image+'"></div>')
			
			}
			function test(par1) {
			 	$.ajax({
	                url: 'https://api.themoviedb.org/3/movie/'+par1+'?api_key=ece7966c119923d24c65ccb57a5da71c&language=en-US&page=1',
	                success: function (data) {
	                	var results2Id = data.id;
	                	
	                	
                	}
	            });
	        }
		     
			function test2(id) {
			 	$.ajax({
	                url: 'https://api.themoviedb.org/3/movie/'+id+'/videos?api_key=ece7966c119923d24c65ccb57a5da71c&language=en-US',
	                success: function(data2) {
	                	var resultsKey = data2.results.length;
	                	var results2Array = data2.results;
	                	var z = -1;
	                	var v = 0;
	                	for (var prop in results2Array) {
						    results2Array[prop] = 'teaser';
						    console.log(results2Array[prop])
						}
					  	console.log(v)
	                	$('iframe').attr('src',  'https://www.youtube.com/embed/' + get_movieKey);
	                }
	            });
	        }	
           	$(document).on('click', 'div.asdf', function() {
				var get_movieKey = $(this).attr("data");
				var get_movieID = $(this).attr('movieId');
				test(get_movieID);
				test2(get_movieID);
				
			})

        }
    });
   
}

apiCall('popular')
});
