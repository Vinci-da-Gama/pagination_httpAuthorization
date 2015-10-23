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