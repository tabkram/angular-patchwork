
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
				type:"folder",
				name: "folder1",
				parent: "0",
			},
			{
				id: 2,
				type:"folder",
				name: "folder2",
				parent: "0",
			},
			{
				id: 3,
				type:"file",
				name: "file3",
				parent: "0",
			},
			{
				id: 11,
				type:"folder",
				name: "folder11",
				parent: "1",
			},
			{
				id: 12,
				type:"file",
				name: "folder12",
				parent: "1",
			},
			{
				id: 111,
				type:"folder",
				name: "folder111",
				parent: "11",
			},
			{
				id: 1111,
				type:"file",
				name: "file1111",
				parent: "111",
			}
		]

		smCtrl.clickedNode = function(node){
			smCtrl.selectedNode = node;
		}
		
		smCtrl.isClickable = function(node){
			return (node.type === 'folder');
		}
		return smCtrl ;
	}

})();