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