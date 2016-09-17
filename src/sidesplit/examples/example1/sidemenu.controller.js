
(function() {
	'use strict';


	angular.module("sidemenuApp")
	.controller('sideMenuController', sideMenuController);
	
	sideMenuController.$inject = ['$sideSplit'];
	
	function sideMenuController($sideSplit) {
		var smCtrl = this ;
		console.log("side menu controller");

		this.closeSideSplit = function(){
			$sideSplit.close({ 
                    id: angular.element(document.querySelector('#sidemenu')),
                    message :"closed!"
                });
		}
		return smCtrl ;
	}

})();