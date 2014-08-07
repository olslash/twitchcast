(function () {

	angular.module('twitchcast', [
		'ui.router',
		'templates',

		'featured'
	]);

	function config ($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/featured');

		$stateProvider

			.state('featured', {
				url: '/featured',
				templateUrl: 'featured/featured.html',
				controller: 'FeaturedCtrl as featured'
			});
	};

	angular
		.module('twitchcast')
		.controller('MainCtrl', MainCtrl)
		.config(config);

})();