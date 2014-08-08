(function () {

    angular.module('twitchcast', [
        'ui.router',
        'templates',

        'navigation',
        'featured'
    ]);

    function config ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/featured');

        $stateProvider

            .state('root', {
                url: '',
                abstract: true,
                views: {
                    'navigation': {
                        templateUrl: 'navigation/navigation.html',
                        controller: 'NavigationCtrl as nav'
                    }
                }
            })

            .state('root.featured', {
                url: '/featured',
                views: {
                    'content@': {
                        templateUrl: 'featured/featured.html',
                        controller: 'FeaturedCtrl as featured'
                    }
                }
            });
    };

    angular
        .module('twitchcast')
        .config(config);

})();