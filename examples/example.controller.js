
(function() {
	'use strict';


	angular.module("sidemenuApp",['sidesplit'])
	.controller('exampleController', exampleController);
	
	exampleController.$inject = ['$scope','$sideSplit'];
	
	function exampleController($scope, $sideSplit) {
		var smCtrl = this ;
		console.log("example controller");
	$sideSplit.open({
      templateUrl: 'sidemenuUrl',
      controller: 'sideMenuController',
      appendTo : angular.element(document.querySelector('#sidemenu'))
    });

		return smCtrl ;
	}

})();