$.ajax({
	url: 'https://api.themoviedb.org/3/movie/now_playing?api_key=ece7966c119923d24c65ccb57a5da71c&language=en-US&page=1',
	async: true,
	success: function(data) {
		console.log(data);
	}
})