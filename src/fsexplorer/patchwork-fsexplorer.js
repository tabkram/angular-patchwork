(function() {
    'use strict';

angular.module('pw-fsexplorer', [])
    .constant('fsExplorerConfig', {
        templateUrl: null
    })
    .directive('pwFsexplorer', function() {
        return {
            restrict: 'EA',
                transclude: true,
                template: '<ul {{options.ulClass}} >' +
                            '<li ng-click="backToParent()">..</li>'+
                            '<li ng-repeat="node in nodeList" ng-class="headClass(node)">' +
                            '<i class="tree-branch-head" ng-class="iBranchClass()" ng-click="selectNodeHead(node)"></i>'+
                            '<div class="tree-label {{options.labelClass}}" ng-click="selectNodeLabel(node)">{{node.name}}</div> ' +
                            '</li>' +
                            '</ul>',
                scope: {
                    explorerModel: "="
                },
                controller: ['$scope', '$templateCache', '$interpolate', 'fsExplorerConfig','fsExplorerService', function ($scope, $templateCache, $interpolate, fsExplorerConfig, fsExplorerService) {
                    $scope.nodeList = fsExplorerService.getRootNodeList($scope.explorerModel);
                    $scope.backToParent = function(){
                        if($scope.nodeList.length>0){
                            $scope.nodeList = fsExplorerService.getNodeListInParentFolder($scope.explorerModel,$scope.nodeList[0]);    
                        } else {
                            log.error("error: it should have at least pwdPointer");
                            //error: it should have at least pwdPointer
                            //$scope.nodeList = fsExplorerService.getRootNodeList($scope.explorerModel);
                        }
                    } 

                    $scope.selectNodeLabel = function(node){
                        if(!node.__isFakeNode__){
                            $scope.nodeList = fsExplorerService.getChildrenNodeList($scope.explorerModel,node);
                        }
                    }


                }]
        }
    })
    .service('fsExplorerService', function() {
        return {
            getParentNode: getParentNode,
            getRootNodeList: getRootNodeList,
            getNodeListInParentFolder: getNodeListInParentFolder,
            getChildrenNodeList: getChildrenNodeList
        }

        function findNodeBy(NodeList,predicate){
            var found = false;
            NodeList.forEach(function(node){
                if(function(){
                    for (var key in predicate) {
                          if (predicate.hasOwnProperty(key)) {
                            var value = p[key];
                            if(node[key] != value){
                                return false;
                            }
                          }
                    }                  
                    return true ;
                })
                {
                    return true;
                }
            });
            return false;
        }

        function appendWithPwdPointer(NodeList, parent){
            var pwdPointer = {
                __isFakeNode__ : true,
                name : ".",
                parent: parent,
            };

            if(!findNodeBy(NodeList,pwdPointer)){
                NodeList.unshift(pwdPointer);
            } 
            return NodeList;
        }

        function getRootNodeList(nodeList){
            var rootNodeList = [];
            var rootDefaultParent = "0" ;
            nodeList.forEach(function(iNode){
                if(!iNode.__isFakeNode__ && iNode.parent.toString() === rootDefaultParent.toString()){
                    rootNodeList.push(iNode);
                }
            });

            return appendWithPwdPointer(rootNodeList, rootDefaultParent);
        }

        function getParentNode(nodeList, node){
            if(node != null){
                if(node.parent.toString() != "0"){
                    var parentNode ;
                    for (var key in nodeList) {
                        if(node.parent.toString() === nodeList[key].id.toString()){
                            return nodeList[key];
                        }
                    }
                } else {
                    return null;
                }
            }else{
                return null;
            }            
        }

        function getNodeListInParentFolder(nodeList, node){
            var nodeListInParentFolder = [];
            var grandParentNode = getParentNode(nodeList,getParentNode(nodeList, node)) ;
            if(grandParentNode != null){
                return getChildrenNodeList(nodeList, grandParentNode);
            } else {
                return getRootNodeList(nodeList);
            }
            return nodeListInParentFolder ;

        }

        function getChildrenNodeList(nodeList, node){
            var childrenNodeList = [];
            nodeList.forEach(function(iNode){
                if(!iNode.__isFakeNode__ && iNode.parent.toString() === node.id.toString()){
                    childrenNodeList.push(iNode);
                }
            });
            return appendWithPwdPointer(childrenNodeList,node.id.toString());
        }
    })

})();
