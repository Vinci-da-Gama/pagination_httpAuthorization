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