function loopAPi(e) {
	var resultsLength = e.results.length;
	
	for(var i = 0; i < resultsLength; i++) {
		var resultsShort = e.results[i];
		var someObject = {
		    voteCount: resultsShort.vote_count,
		    id: resultsShort.id
		};
		console.log(someObject) 
	}
	
}


function apiCall(api) {
	$.ajax({
		url: 'https://api.themoviedb.org/3/movie/'+api+'?api_key=ece7966c119923d24c65ccb57a5da71c&language=en-US&page=1',
		async: true,
		success: function(data) {
			loopAPi(data)
			$.ajax({
				url: '',
				async: true,
				success: function() {
					
					
				}
			})
		}
	})
}

apiCall('top_rated')