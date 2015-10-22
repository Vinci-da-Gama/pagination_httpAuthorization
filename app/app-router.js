(function () {
	var rM = angular.module('gphr.router');

	rM.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider
		.state('index', {
			url: '/',
			templateUrl: './partials/pagination-resolvehttp.html',
			controller: 'ResolveCtrl',
			resolve: {
				CompanyList: ['CompanyAPI', function (CompanyAPI) {
					return CompanyAPI.contentQuery(10, 1);
				}]
			}
		});
		
	}]);

})();