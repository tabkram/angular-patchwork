(function() {
    'use strict';

angular.module('pw-fsexplorer', ["template/explorerTpl.html"])
    .constant('fsConfig', {
        templateUrl: null,
        options : {
            nodeId: "id",
            parentNodeRef: "parent"
        }
    })
    .directive('pwFsexplorer', function($compile, $templateCache, fsExplorerService, fsConfig, $http) {
        return {
            restrict: 'EA',
                transclude: true,
                scope: {
                    explorerModel: "=",
                    explorerOptions: "=",
                    templateUrl:"=",
                    onNodeClick:"=",
                    onPathChange:"=",
                    isClickable:"="
                },
                link: function($scope, element, attrs, ctrl, transclude){
                    if($scope.templateUrl != null){
                        $http.get($scope.templateUrl).then(function(response) {
                            $templateCache.put("template/explorerTpl.html", response.data);
                            compile($templateCache.get("template/explorerTpl.html"));
                        });
                    } else{
                       compile($templateCache.get("template/explorerTpl.html"));

                    }
                    function compile(template){
                        $compile(template)($scope, function(_element,_scope) {
                            element.replaceWith(_element);
                            element = _element ;
                        }); 
                    }

                    transclude($scope, function(clone, scope) {
                        scope.transcludedElement = angular.element('<div></div>').append(clone).html();
                    });
                },
                controller($scope){
                    var context = {
                        selectedNode: null,
                        currentPath:[]
                    };
                    if($scope.explorerOptions) {
                        fsConfig.options = $scope.explorerOptions ;
                    }
                    var explorerModel = $scope.explorerModel;
                    $scope.$watch("explorerModel",function(newModel){
                        explorerModel = newModel ;
                        if(context.currentPath.length>0){
                            $scope.nodeList = fsExplorerService.getChildrenNodeList(explorerModel,context.currentPath[context.currentPath.length - 1]);
                        } else {
                            $scope.nodeList = fsExplorerService.getRootNodeList(explorerModel);
                        }
                    },true);
                    $scope.nodeList = fsExplorerService.getRootNodeList(explorerModel);
                    $scope.backToParent = function(){
                        if($scope.nodeList.length>0){
                            $scope.nodeList = fsExplorerService.getNodeListInParentFolder(explorerModel,$scope.nodeList[0]);
                            if(context.currentPath.length>0){
                                context.currentPath.splice([context.currentPath.length - 1],1);
                            }
                            if($scope.onPathChange){
                                    $scope.onPathChange(context.currentPath);
                            }
                        } else {
                            log.error("error: it should have at least pwdPointer");
                        }
                    } 

                    $scope.selectNodeLabel = function(node){
                        if(angular.isUndefined($scope.isClickable)|| (angular.isDefined($scope.isClickable) && $scope.isClickable(node) === true)){
                            if(!node.__isFakeNode__){
                                $scope.nodeList = fsExplorerService.getChildrenNodeList(explorerModel,node);
                                context.selectedNode = node;
                                context.currentPath.push(node);
                                if ($scope.onNodeClick) {
                                    $scope.onNodeClick(node);
                                }
                                if($scope.onPathChange){
                                    $scope.onPathChange(context.currentPath);
                                }
                            }
                        }
                    }
                }
        }
    })
    .directive('pwNodeTransclude', function($compile) {
        return {
            restrict: 'EA',
            replace: true,
            template:'<div>{{nodeContent}}</div>',
            transclude: true,
            link: function($scope, $element, attrs, ctrl, transclude){
                $scope.nodeContent = $scope.$parent.transcludedElement;
                 $compile($element.html($scope.nodeContent))($scope, function(_element,_scope) {
                            $element.replaceWith(_element);
                            $element = _element ;
                }); 
            }
        }
    })
    .service('fsExplorerService', function(fsConfig) {
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
                name : "."
            };
            pwdPointer[fsConfig.options.parentNodeRef] = parent;
            if(!findNodeBy(NodeList,pwdPointer)){
                NodeList.unshift(pwdPointer);
            } 
            return NodeList;
        }

        function getRootNodeList(nodeList){
            var rootNodeList = [];
            var rootDefaultParent = "0" ;
            nodeList.forEach(function(iNode){
                if(!iNode.__isFakeNode__ && iNode[fsConfig.options.parentNodeRef].toString() === rootDefaultParent.toString()){
                    rootNodeList.push(iNode);
                }
            });

            return appendWithPwdPointer(rootNodeList, rootDefaultParent);
        }

        function getParentNode(nodeList, node){
            if(node != null){
                if(node[fsConfig.options.parentNodeRef].toString() != "0"){
                    var parentNode ;
                    for (var key in nodeList) {
                        if(node[fsConfig.options.parentNodeRef].toString() === nodeList[key][fsConfig.options.nodeId].toString()){
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
                if(!iNode.__isFakeNode__ && iNode[fsConfig.options.parentNodeRef].toString() === node[fsConfig.options.nodeId].toString()){
                    childrenNodeList.push(iNode);
                }
            });
            return appendWithPwdPointer(childrenNodeList,node[fsConfig.options.nodeId].toString());
        }
    })

            angular.module("template/explorerTpl.html", []).run(["$templateCache", function($templateCache) {
              $templateCache.put("template/explorerTpl.html",'<ul id="pw-fsexplorer" {{options.ulClass}} >' +
                            '<li ng-click="backToParent()">..</li>'+
                            '<li ng-repeat="node in nodeList" ng-class="headClass(node)">' +
                            '<i class="tree-branch-head" ng-class="iBranchClass()" ng-click="selectNodeHead(node)"></i>'+
                            '<div class="tree-label {{options.labelClass}}" ng-click="selectNodeLabel(node)">'+
                            '<pw-node-transclude></pw-node-transclude>'+
                            '</div> ' +
                            '</li>' +
                            '</ul>');
            }]);

})();
