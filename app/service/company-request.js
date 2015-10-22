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