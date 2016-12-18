
(function() {
	'use strict';


	angular.module("fsExplorerApp",['pw-fsexplorer'])
	.controller('exampleController', exampleController);
	
	exampleController.$inject = ['$scope'];
	
	function exampleController() {
		var smCtrl = this ;
		smCtrl.options = {
			nodeId: "nodeID",
			parentNodeRef:"parentID"
		}
		smCtrl.model = [
			{
				nodeID: 1, 
				type:"folder",
				name: "folder1",
				parentID: "0",
			},
			{
				nodeID: 2,
				type:"folder",
				name: "folder2",
				parentID: "0",
			},
			{
				nodeID: 3,
				type:"file",
				name: "file3",
				parentID: "0",
			},
			{
				nodeID: 11,
				type:"folder",
				name: "folder11",
				parentID: "1",
			},
			{
				nodeID: 12,
				type:"file",
				name: "file12",
				parentID: "1",
			},
			{
				nodeID: 111,
				type:"folder",
				name: "folder111",
				parentID: "11",
			},
			{
				nodeID: 1111,
				type:"file",
				name: "file1111",
				parentID: "111",
			}
		]

		smCtrl.selectNode = function(node){
			smCtrl.options.selectedNode = node;
		}
		smCtrl.clickedNode = function(node){
			smCtrl.selectedNode = node;
		}

		smCtrl.changedPath = function(currentPath){
			smCtrl.currentPath = currentPath;
		}
		
		smCtrl.isClickable = function(node){
			return (node.type === 'folder');
		}

		smCtrl.addFolder = function(){
			var parent = 0 ;
			if(smCtrl.currentPath[smCtrl.currentPath.length - 1]){
				var parent =  smCtrl.currentPath[smCtrl.currentPath.length - 1].nodeID ;
			}
			smCtrl.model.push({
				nodeID: smCtrl.newNode,
				type:"folder",
				name: smCtrl.newNode,
				parentID: parent,
			});
			console.log("smCtrl.model",smCtrl.model);
		}
		smCtrl.addFile = function(){
			var parent = 0 ;
			if(smCtrl.currentPath[smCtrl.currentPath.length - 1]){
				var parent =  smCtrl.currentPath[smCtrl.currentPath.length - 1].nodeID ;
			}
			smCtrl.model.push({
				nodeID: smCtrl.newNode,
				type:"file",
				name: smCtrl.newNode,
				parentID: parent
			});
			console.log("smCtrl.model",smCtrl.model);
		}
		return smCtrl ;
	}

})();