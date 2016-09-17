(function() {
	'use strict';

	angular.module("oh-formField", ["template/field/text.html"]);
	
	angular.module("oh-formField").directive('formField', formField);
			
	 function formField($compile, $templateCache){
		    return {
		        restrict: 'EA',
		        require: '^?ngModel',  
		        scope: {mode: '@mode',
		        	modeVar: '=',
		        	type:'@type',
		        	modelValue : "=",
		        	isDisabled: '@isDisabled',
		        	fieldClass: '@fieldClass',
		        	name: '@name',
		        	fieldRequired: '@fieldRequired',
		        	fieldId: '@fieldId',
		        	fieldMask: "@fieldMask",
		        	fieldModel: '=fieldModel',
		        	ngModel: '=',
		        	ngShowModel: '=', //only for select2
		        	changeCallback : "=",
		        	blurCallback : "=",
		        	// angucomplete
		        	remoteUrl :'@remoteUrl',
		        	titleField :'@titleField',
		        	selectedObject : '=selectedObject',
		        	
		        	// select generating params
		        	selectOptions : '=', //required
		        	selectValue: "@", //optional
		        	selectDisplayName:"@", //optional
		        	
		        	afterPromise:"=", // optional: pour select2 (contient dans les params le selectOptions)
		        	
		        	// datepicker
		        	minDate : '=',
		        	maxDate : '=',
		        	ngMask:'@ngMask',



		        	// new params
		        	label : "=",
		        	labelClass : "=" 
		        	},
		        template: "<div></div>",
		        link: function(scope, element, attrs, ngModel){	 

			        		if(scope.type == 'text'){
								compile($templateCache.get('template/field/text.html'));
								
								if(scope.blurCallback){
									scope.blurFn = function (NewModelValue){
										scope.blurCallback(NewModelValue);
									}
								}
								if(scope.changeCallback && scope.changeCallback != null &&  scope.changeCallback != ''){
									scope.changeFn = function (NewModelValue){
										scope.changeCallback(NewModelValue);
									}
								}
				        	}

				        	// begin : internal fn called to compile each field template
				        	function compile(template){
				        		$compile(template)(scope, function(_element,_scope) {
				        			element.replaceWith(_element);
				        			element = _element ;
				        			
				        			if(angular.isDefined(scope.fieldMask) && scope.fieldMask!= null && scope.fieldMask !=''){
				        				$(element).mask(scope.fieldMask);
				        			}
				        		});	
				        	}
				        	// end : internal fn called to compile each field template        	 

		        }
		    };
		}
	 
	 	//BEGIN : templates
		
		angular.module("template/field/text.html", []).run(["$templateCache", function($templateCache) {
			  $templateCache.put("template/field/text.html",
			  		  "<label for=\"inputEmail\" class=\"col-sm-2 control-label\">{{label}}</label>"
					  "<span ng-if='modeVar==\"show\"' class='{{fieldClass}}' id='{{fieldId}}' name='{{name}}'>{{$parent.ngModel}}</span> "+
					  "<input ng-if='modeVar==\"edit\"'  ng-required='{{fieldRequired}}' class='{{fieldClass}}' id='{{fieldId}}' name='{{name}}' type='text' ng-blur='blurFn(ngModel)' ng-change='changeFn(ngModel)' ng-model='$parent.ngModel' ng-mask='{{fieldMask}}'>"+
					  "<span ng-if='modeVar === undefined && mode==\"show\"' class='{{fieldClass}}' id='{{fieldId}}' name='{{name}}'>{{$parent.ngModel}}</span> "+
					  "<input ng-if='modeVar === undefined && mode==\"edit\"'  ng-required='{{fieldRequired}}' class='{{fieldClass}}' id='{{fieldId}}' name='{{name}}'  ng-mask='{{fieldMask}}' type='text' ng-blur='blurFn(ngModel)' ng-change='changeFn(ngModel)' ng-model='$parent.ngModel'>");
			}]);
		
})();