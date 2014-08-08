function TwitchApiService ($http) {
	var twitch = {};

	twitch.featured = {};
	twitch.channels = {};
	twitch.games = {};

	twitch.baseUrl = 'https://api.twitch.tv/kraken';
	twitch.headers = {
		'Accept': 'application/vnd.twitchtv.v2+json'
	};

	var get = function(path, parameters) {
		var promise = $http.get(twitch.baseUrl + path, 
			{
				headers: twitch.headers,
				params: parameters
			}, 
			function(response) {
				return response.data;
		});

		return promise;
	};

	var post = function(path, parameters) {
		var headers = twitch.headers;
		headers['Content-Type'] = 'application/x-www-form-urlencoded';

		var promise = $http.post(twitch.baseUrl + path, 
			{
				headers: twitch.headers,
				params: parameters
			}, 
			function(response) {
				return response.data;
		});

		return promise;
	};

	var put = function(path, parameters) {
		var headers = twitch.headers;
		headers['Content-Type'] = 'application/x-www-form-urlencoded';

		var promise = $http.put(twitch.baseUrl + path, 
			{
				headers: twitch.headers,
				params: parameters
			}, 
			function(response) {
				return response.data;
		});

		return promise;
	};

	twitch.getFeaturedStreams = function() {
		get('/streams/featured', {limit: 25}).success(function(data) {
			twitch.featured.next = data['_links'].next;
			twitch.featured.prev = data['_links'].previous;
			twitch.featured.data = data.featured.map(function(featured) {
				return featured.stream;
			});

			console.log(twitch.featured);
		});
	};

	return twitch;
}