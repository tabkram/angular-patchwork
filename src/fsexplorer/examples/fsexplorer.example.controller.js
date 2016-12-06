
(function() {
	'use strict';


	angular.module("fsExplorerApp",['pw-fsexplorer'])
	.controller('exampleController', exampleController);
	
	exampleController.$inject = ['$scope'];
	
	function exampleController() {
		var smCtrl = this ;
		smCtrl.model = [
			{
				id: 1, 
				name: "folder1",
				parent: "0",
			},
			{
				id: 2, 
				name: "folder2",
				parent: "0",
			},
			{
				id: 3, 
				name: "folder3",
				parent: "0",
			},
			{
				id: 11, 
				name: "folder11",
				parent: "1",
			},
			{
				id: 12, 
				name: "folder12",
				parent: "1",
			},
			{
				id: 111, 
				name: "folder111",
				parent: "11",
			},
			{
				id: 1111,
				name: "folder1111",
				parent: "111",
			}
		]
		return smCtrl ;
	}

})();