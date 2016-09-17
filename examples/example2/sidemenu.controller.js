
(function() {
	'use strict';


	angular.module("sidemenuApp")
	.controller('sideMenuController', sideMenuController);
	
	sideMenuController.$inject = ['$sideSplit'];
	
	function sideMenuController($sideSplit) {
		var smCtrl = this ;
		console.log("side menu controller");
		return smCtrl ;
	}

})();