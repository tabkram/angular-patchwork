(function() {
    'use strict';

angular.module('ongToggle', [])
    .directive('ongToggle', function() {

        return {
            restrict: 'A',
            transclude: true,
            replace: true,
            require: 'ngModel',
            scope: {
                ngModel: '='
            },
            template:'<div ng-click="changeModel()" class="toggle btn btn-default {{state}}" data-toggle="toggle" style="width: 66px; height: 34px;">'+
        	'<div class="toggle-group">'+
        		'<label class="btn btn-primary toggle-on">On</label>'+
        		'<label class="btn btn-default active toggle-off">Off</label>'+
        		'<span class="toggle-handle btn btn-default"></span></div>'+
        	'</div>'+
        '</div>',
            link: function ($scope, $element, $attr, require) {
                var ngModel = require;
                $scope.state = "";
                
            	$scope.changeModel = function(){
                	ngModel.$setViewValue(!ngModel.$viewValue);
                	ngModel.$render(); 
            	};

                // Observe: ngModel for changes
                $scope.$watch(function() {
                    return ngModel.$viewValue;
                }, function(newModelValue) {
                	if(newModelValue === false){
                		$scope.state = " off";
                		$scope.ngModel = ngModel.$viewValue;
                	} else {
                		$scope.state = "";
                	}
                });
            }
        };
    });

})();
