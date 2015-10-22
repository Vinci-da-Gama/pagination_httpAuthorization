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