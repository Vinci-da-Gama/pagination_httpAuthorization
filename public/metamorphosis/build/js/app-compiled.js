(function () {
	/**
	* gphr Module
	*
	* This is the main module of this app --> 'gphr'
	*/
	angular.module('gphr', ['gphr.router', 'gphr.service', 'gphr.ctrl', 'gphr.dir', 'gphr.cust.dir', 'ui.bootstrap']);
	/**
	* gphr.router Module
	*
	* This is the router module, use 'ui.router'
	*/
	angular.module('gphr.router', ['ui.router']);
	angular.module('gphr.service', []);
	angular.module('gphr.ctrl', []);
	/**
	* directive Module
	*
	* both directive and construct directive
	*/
	angular.module('gphr.dir', ['gphr.service']);
	angular.module('gphr.cust.dir', ['gphr.service']);

})();
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
(function () {
	var cosM = angular.module('gphr');

	cosM.constant('apiURL', 'http://api.demo.muulla.com/cms');

})();
(function () {
	var rCtrl = angular.module('gphr.ctrl');

	rCtrl.controller('ResolveCtrl', ['$scope', 'CompanyList', 'CompanyAPI', function($scope, CompanyList, CompanyAPI){
		// a loop and click change name;
		var sc = $scope;
		sc.companyAll = CompanyList.data;
		sc.pagination = CompanyList.pagination;

		sc.setPerPage = function (contentPerPage) {
			sc.pagination.page_size = contentPerPage;
			sc.pagination.page_number = 1;
		};

		sc.$watch('pagination', function (nv, ov) {
			if (nv !== ov) {
				CompanyAPI.contentQuery(sc.pagination.page_size, sc.pagination.page_number)
				.then(function (res) {
					sc.companyAll = res.data;
				});
			} else{
				console.log('pagination did not change.');
			}
		}, true);

		sc.parseAddress = function (cpyAddr) {
			var addr = [];
			// var delimeter = ', ';

			cpyAddr.address1 ? addr.push(cpyAddr.address1) : null;
			cpyAddr.address2 ? addr.push(cpyAddr.address2) : null;
			cpyAddr.suburb ? addr.push(cpyAddr.suburb) : null;
			cpyAddr.state ? addr.push(cpyAddr.state.split('-')[1]) : null;
			cpyAddr.country ? addr.push(cpyAddr.country) : null;
			cpyAddr.postcode ? addr.push(cpyAddr.postcode) : null;

			return addr.join(', ');
		};

	}]);

})();
(function () {
	var cdM = angular.module('gphr.cust.dir');

	cdM.directive('spinnerLoader', [function(){
		return {
			// terminal: true,
			scope: {}, // {} = isolate, true = child, false/undefined = no change
			controller: function($scope, $element, $attrs, $transclude, LoadCount) {
				var lc = $scope;
				lc.getLoadCount = LoadCount.getLoadCount;
			},
			// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
			restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
			// template: '',
			templateUrl: './partials/spinner-loader.html',
			// replace: true,
			// transclude: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			// link: function($scope, iElm, iAttrs, controller) {}
		};
	}]);

	cdM.directive('btnNameChangeForeachArrLog', [function(){
		return {
			scope: {}, // {} = isolate, true = child, false/undefined = no change
			controller: function($scope, $element, $attrs, $transclude) {
				var cs = $scope;
				var taiqi = String.fromCharCode(9775);
				var euro = String.fromCharCode(8364);
				var initArr = [
					{id: 0, content: "content_0"},
					{id: 1, content: "content_1"},
					{id: 2, content: "content_2"}
				];

				cs.splitArr1 = [];
				cs.splitArr2 = [];

				cs.btnName = '1st Name '+taiqi;
				cs.clickChangeName = function () {
					cs.btnName = '2st Name '+euro;
				};

								
				initArr.forEach(function (elem, index) {
					console.log('Each Element: ', elem);
					console.log(taiqi+' '+"the Index is: --> "+index);
					if (index < 2) {
						cs.splitArr1.push(elem);
					} else{
						cs.splitArr2.push(elem);
					}
				});

				console.log('Internal --> ' + euro +" ", cs.splitArr1);
				console.log('Internal --> ' + taiqi +" ", cs.splitArr2);

			},
			// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
			restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
			// template: '',
			templateUrl: './partials/btn-name-change-foreach-arr-log.html',
			// replace: true,
			// transclude: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			// link: function($scope, iElm, iAttrs, controller) {}
		};
	}]);

})();
(function () {
	var dM = angular.module('gphr.dir');
})();
(function () {
	var crM = angular.module('gphr.service');

	crM.service('InforRequest', ['$q', '$http', 'LoadCount', '$log', function($q, $http, LoadCount, $log){
		var taiqi = String.fromCharCode(9775);

		this.$get = function (url, header) {
			var _der = $q.defer();
			var httpObj = {
				url: url,
				headers: header,
				method: 'GET'
			};

			LoadCount.increase();
			$http(httpObj)
			.success(function (res) {
				LoadCount.decrease();
				_der.resolve(res);
				console.log(taiqi+' what: ', res);
			})
			.error(function(msg, config, status) {
				LoadCount.decrease();
				_der.reject(msg);
				$log.log('error msg is: '+msg+' Error status: '+status+' '+taiqi+' '+' The Config:--> '+ config);
			});

			return _der.promise;
		};
	}]);

})();
(function () {
	var capiM = angular.module('gphr.service');

	capiM.service('CompanyAPI', ['User', 'apiURL', 'InforRequest', function(User, apiURL, InforRequest){
		this.contentQuery = function (pageSize, perPage) {
			var authorizedUser = User.getUser();
			var companyURL = apiURL + '/merchant/all/active/' + pageSize + '/' + perPage;
			var headerLocal = {
				Authorization : authorizedUser.name + ' ' + authorizedUser.token
			};

			return InforRequest.$get(companyURL, headerLocal);
		};

	}]);

})();
(function () {
	var ulcM = angular.module('gphr.service');

	ulcM.service('LoadCount', [function(){
		var loadCount = 0;

		this.getLoadCount = function () {
			console.log('count is: '+loadCount);
			return loadCount;
		};

		this.increase = function () {
			return ++loadCount;
		};
		this.decrease = function () {
			return --loadCount;
		};
	}]);

	ulcM.service('User', [function(){
		var name = 'Bearer';
		var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1NGQxOTY4MGI1MWMxNTI2MGI5NDRmZDUiLCJpc3N1ZV9kYXRlIjoiMjAxNS0wOS0wOVQwNToxMzo1My40NThaIn0.Hk2XypA_KMUnIKdSVYnwq3Rn3QyMNSQ-e80-sZsA9bY';
		
		this.getUser = function () {
			return {
				name: name,
				token: token
			};
		};
	}]);

})();
// jQuery Js Document
$(document).ready(function() {
});
