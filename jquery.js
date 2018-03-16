var arrayData2 = [];
function apiCall(api, api2) {
	var please;
	$.ajax({
        url: 'https://api.themoviedb.org/3/movie/'+api+'?api_key=ece7966c119923d24c65ccb57a5da71c&language=en-US&page=1',
        success: function(data) {
            var resultsLength = data.results.length;
			var someObject;
			for(var i = 0; i < resultsLength; i++) {
				var resultsShort = data.results[i];
				please = data.results[i].id;
				someObject = {
				    voteCount: resultsShort.vote_count,
				    id: resultsShort.id
				};
				var okay = data.results[i].id;
		       	test(someObject.id)
				function test (par1) {
				 	$.ajax({
		                url: 'https://api.themoviedb.org/3/movie/'+par1+'?api_key=ece7966c119923d24c65ccb57a5da71c&language=en-US&page=1',
		                success: function (data) {
		                	var results2Id = data.id
	                	 	

	                	 	test2(results2Id)
							function test2 (id) {
							 	$.ajax({
					                url: 'https://api.themoviedb.org/3/movie/'+id+'/videos?api_key=ece7966c119923d24c65ccb57a5da71c&language=en-US',
					                success: function(data2) {
					                	var resultsKey = data2.results.length;
					               		console.log(data2)
					                	for(var j = 0; j < resultsKey; j++) {
					                		if(data2.results[j].type = 'trailer') {
					                			return data2.results[j].type = 'trailer';
					                		}
					                		
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
