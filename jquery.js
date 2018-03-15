var arrayData2 = [];
function apiCall(api, api2) {
	
	$.ajax({
        url: 'https://api.themoviedb.org/3/movie/'+api+'?api_key=ece7966c119923d24c65ccb57a5da71c&language=en-US&page=1',
        success: function (data) {
            var resultsLength = data.results.length;
			var someObject;
			for(var i = 0; i < resultsLength; i++) {
				var resultsShort = data.results[i];
				someObject = {
				    voteCount: resultsShort.vote_count,
				    id: resultsShort.id
				};

				test(someObject.id)
				function test (par1) {
				 	$.ajax({
		                url: 'https://api.themoviedb.org/3/movie/'+par1+'?api_key=ece7966c119923d24c65ccb57a5da71c&language=en-US&page=1',
		                success: function (data) {
		                	var movieId = data.id;

		                	test2(movieId)
							function test2 (id) {
							 	$.ajax({
					                url: 'https://api.themoviedb.org/3/movie/'+id+'/videos?api_key=ece7966c119923d24c65ccb57a5da71c&language=en-US',
					                success: function (data2) {
					                	
					                	arrayData2.push(data2)
					                	var video = data2.results.length;
					                	for(var j = 0; j < video; j++) {
						                	var result = arrayData2.filter(function( obj ) {
											  	return obj.results[j];
											});
					                	console.log(result)
					                	}
					                }
					            });
					        }	
		                }
		            });
		        }	
			}
           
        }
    });
}

apiCall('popular')
