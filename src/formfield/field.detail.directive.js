(function() {
	'use strict';

	angular.module("tap-detailField", ["template/field/text.html",
	                                   "template/field/number.html",
	                                   "template/field/textarea.html",
	                                   "template/field/select.html",
	                                   "template/field/select2.html",
	                                   "template/field/multiselect.html",
	                                   "template/field/multiselect2.html",
	                                   "template/field/angucomplete.html",
	                                   "template/field/timepicker.html",
	                                   "template/field/datepicker.html"]);
	
	angular.module("tap-detailField").directive('detailField', detailField);
			
	 function detailField($compile, $templateCache){
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
		        	ngMask:'@ngMask'
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
			        		
			        		if(scope.type == 'number'){
								compile($templateCache.get('template/field/number.html'));
								
								if(scope.blurCallback){
									scope.blurFn = function (NewModelValue){
										scope.blurCallback(NewModelValue);
									}
								}
								if(scope.changeCallback){
									scope.changeFn = function (NewModelValue){
										scope.changeCallback(NewModelValue);
									}
								}
				        	}
			        		
			        		if(scope.type == 'textarea'){
								compile($templateCache.get('template/field/textarea.html'));
				        	}
			        		
				        	if(scope.type == 'select' && (scope.selectValue == null || scope.selectDisplayName == null)){
				        		console.log('scope.changeCallback', scope.changeCallback);
				        		
								if(scope.changeCallback && scope.changeCallback != null &&  scope.changeCallback != ''){
									console.log('scope.NewModelValue', NewModelValue);
									scope.changeFn = function (NewModelValue){
										scope.changeCallback(NewModelValue);
									}
								}				        		
//								if(scope.changeCallback){
//									console.log('scope.NewModelValue', NewModelValue);
//									scope.changeFn = function (NewModelValue){
//										scope.changeCallback(NewModelValue);
//									}
//								}
								console.log('scope.changeCallback', scope.changeCallback);
								compile($templateCache.get('template/field/select.html'));
				        	}
				        	
				        	if(scope.type == 'select' && scope.selectValue!= null && scope.selectDisplayName != null){
				        		if(scope.afterPromise != null){
				        			console.log("after",scope.afterPromise);
				        			scope.afterPromise.then(function(selectOptions){
				        				scope.selectOptions = selectOptions ;
				        				console.log("fef",scope.selectOptions);
				        				select2LinkFunction();
				        			});
				        		} else {
				        			select2LinkFunction();
				        		}
				        	}
				        	
				        	if(scope.type == 'multiselect'){
								compile($templateCache.get('template/field/multiselect.html'));
				        	}
				        	
				        	if(scope.type == 'multiselect' && scope.selectValue!= null && scope.selectDisplayName != null){
								compile($templateCache.get('template/field/multiselect2.html'));
				        	}
				        	
				        	if(scope.type == 'angucomplete'){
				        		compile($templateCache.get('template/field/angucomplete.html'));
				        	}
				        	
				        	if(scope.type == 'timepicker'){
				        		compile($templateCache.get('template/field/timepicker.html'));
				        	}
				        	
				        	if(scope.type == 'datepicker'){
				        		compile($templateCache.get('template/field/datepicker.html'));
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

			        		//Begin : select2 link function
			        		function select2LinkFunction(){
			        			if(scope.ngShowModel != null && angular.isDefined(scope.selectOptions)){
									var i= 0; var foundCurrValue =false;
									do{
										if(scope.selectOptions[i][scope.selectDisplayName] == scope.ngShowModel){
											scope.ngModel = scope.selectOptions[i][scope.selectValue];
											foundCurrValue = true;
										} else {
											i++;
										}
									} while (i < scope.selectOptions.length && foundCurrValue == false)
								}
								
				        		if(scope.changeCallback){
									scope.changeFn = function (NewModelValue){
										if(scope.ngShowModel != null){
											var j= 0; var foundIter =false;
											do{
												if(scope.selectOptions[j][scope.selectValue] == NewModelValue){
													scope.ngShowModel = scope.selectOptions[j][scope.selectDisplayName];
													foundIter = true;
												} else {
													j++;	
												}	 
											}while (j < scope.selectOptions.length && foundIter == false)
										}
										
										scope.changeCallback(NewModelValue);
									}
								}
				        		compile($templateCache.get('template/field/select2.html'));
			        		}
			        		//end: select2 link function
			        		
				        	 

		        }
		    };
		}
	 
	 	//BEGIN : templates
		
		angular.module("template/field/text.html", []).run(["$templateCache", function($templateCache) {
			  $templateCache.put("template/field/text.html",
					  "<span ng-if='modeVar==\"show\"' class='{{fieldClass}}' id='{{fieldId}}' name='{{name}}'>{{$parent.ngModel}}</span> "+
					  "<input ng-if='modeVar==\"edit\"'  ng-required='{{fieldRequired}}' class='{{fieldClass}}' id='{{fieldId}}' name='{{name}}' type='text' ng-blur='blurFn(ngModel)' ng-change='changeFn(ngModel)' ng-model='$parent.ngModel' ng-mask='{{fieldMask}}'>"+
					  "<span ng-if='modeVar === undefined && mode==\"show\"' class='{{fieldClass}}' id='{{fieldId}}' name='{{name}}'>{{$parent.ngModel}}</span> "+
					  "<input ng-if='modeVar === undefined && mode==\"edit\"'  ng-required='{{fieldRequired}}' class='{{fieldClass}}' id='{{fieldId}}' name='{{name}}'  ng-mask='{{fieldMask}}' type='text' ng-blur='blurFn(ngModel)' ng-change='changeFn(ngModel)' ng-model='$parent.ngModel'>");
			}]);
		
		angular.module("template/field/number.html", []).run(["$templateCache", function($templateCache) {
			  $templateCache.put("template/field/number.html",
					  "<span ng-if='modeVar==\"show\"' class='{{fieldClass}}' name='{{name}}'>{{$parent.ngModel}}</span> "+
					  "<input ng-if='modeVar==\"edit\"'  ng-required='{{fieldRequired}}' class='{{fieldClass}}' name='{{name}}' type='number' ng-blur='blurFn(ngModel)' ng-change='changeFn(ngModel)' ng-model='$parent.ngModel' ng-mask='{{fieldMask}}' min=0>"+
					  "<span ng-if='modeVar === undefined && mode==\"show\"' class='{{fieldClass}}' name='{{name}}'>{{$parent.ngModel}}</span> "+
					  "<input ng-if='modeVar === undefined && mode==\"edit\"'  ng-required='{{fieldRequired}}' class='{{fieldClass}}' name='{{name}}'  ng-mask='{{fieldMask}}' type='number' ng-blur='blurFn(ngModel)' ng-change='changeFn(ngModel)' ng-model='$parent.ngModel' min=0>");
			}]);
		
		angular.module("template/field/textarea.html", []).run(["$templateCache", function($templateCache) {
			  $templateCache.put("template/field/textarea.html",
					  "<textarea ng-if='modeVar==\"show\"' disabled='true' ng-model='$parent.ngModel' class='{{fieldClass}}' name='{{name}}' rows='10' cols='215'>{{$parent.ngModel}}</textarea>" +
					  "<textarea ng-if='modeVar==\"edit\"'  ng-required='{{fieldRequired}}' ng-disabled='isDisabled' ng-model='$parent.ngModel' class='{{fieldClass}}' name='{{name}}' rows='10' cols='215'></textarea>"+
					  "<textarea ng-if='modeVar === undefined && mode==\"show\"' disabled='true' ng-model='$parent.ngModel' class='{{fieldClass}}' name='{{name}}' rows='10' cols='215'>{{$parent.ngModel}}</textarea>" +
					  "<textarea ng-if='modeVar === undefined && mode==\"edit\"'  ng-required='{{fieldRequired}}' ng-disabled='isDisabled' ng-model='$parent.ngModel' class='{{fieldClass}}' name='{{name}}' rows='10' cols='215'></textarea>");
			}]);
		
		
		angular.module("template/field/select.html", []).run(["$templateCache", function($templateCache) {
			  $templateCache.put("template/field/select.html",
					  "<span ng-if='modeVar==\"show\"' class='{{fieldClass}}' name='{{name}}'>{{$parent.ngModel}}</span> "+
					  "<select ng-if='modeVar==\"edit\"'  ng-required='{{fieldRequired}}' ng-change='changeFn(ngModel)' ng-model='$parent.ngModel' class='{{fieldClass}}' name='{{name}}' "+ 
							" ng-disabled='isDisabled' >"+
							"<option></option>"+
							"<option ng-repeat='iter in selectOptions'>{{iter}}</option>"+				
						" </select> "+
						  " <span ng-if='modeVar === undefined && mode==\"show\"' class='{{fieldClass}}' name='{{name}}'>{{$parent.ngModel}}</span> "+
						  "<select ng-if='modeVar === undefined && mode==\"edit\"'  ng-required='{{fieldRequired}}' ng-change='changeFn(ngModel)' ng-model='$parent.ngModel' class='{{fieldClass}}' name='{{name}}' "+ 
								" ng-disabled='isDisabled' >"+
								"<option></option>"+
								"<option ng-repeat='iter in selectOptions'>{{iter}}</option>"+
							" </select> ");
			}]);
		
		
		angular.module("template/field/select2.html", []).run(["$templateCache", function($templateCache) {
			  $templateCache.put("template/field/select2.html",
					  "<span ng-if='modeVar==\"show\"  && ngShowModel == null' class='{{fieldClass}}' name='{{name}}'>{{$parent.ngModel}}</span> "+
					  "<span ng-if='modeVar==\"show\"  && ngShowModel != null' class='{{fieldClass}}' name='{{name}}'>{{ngShowModel}}</span> "+
					  	"<select ng-if='modeVar==\"edit\"'  ng-required='{{fieldRequired}}' ng-change='changeFn(ngModel)' ng-model='$parent.ngModel'" 
						+ " class='{{fieldClass}}' name='{{name}}' ng-disabled='isDisabled'"  
						+ " ng-options='iter[selectValue] as iter[selectDisplayName] for iter in selectOptions'>"
						+ " </select>"+
						"<span ng-if='modeVar === undefined && mode==\"show\"  && ngShowModel == null' class='{{fieldClass}}' name='{{name}}'>{{$parent.ngModel}}</span> "+
						"<span ng-if='modeVar === undefined && mode==\"show\"  && ngShowModel != null' class='{{fieldClass}}' name='{{name}}'>{{ngShowModel}}</span> "+
					  	"<select ng-if='modeVar === undefined && mode==\"edit\"'  ng-required='{{fieldRequired}}' ng-change='changeFn(ngModel)' ng-model='$parent.ngModel'" 
						+ " class='{{fieldClass}}' name='{{name}}' ng-disabled='isDisabled'"  
						+ " ng-options='iter[selectValue] as iter[selectDisplayName] for iter in selectOptions'>"
						+ " </select>");
			}]);

		angular.module("template/field/multiselect.html", []).run(["$templateCache", function($templateCache) {
			  $templateCache.put("template/field/multiselect.html",
					  "<span ng-if='modeVar==\"show\"' class='{{fieldClass}}' name='{{name}}'>{{$parent.ngModel}}" +
					  "<span ng-repeat='element in $parent.ngModel'>" +
					  "{{element}}<br></span>" +
					  "</span> "
					  + " <select ng-if='modeVar==\"edit\"'  ng-required='{{fieldRequired}}' id='{{fieldId}}'  class='{{fieldClass}}' name='{{name}}' multiple='multiple' ng-model='$parent.ngModel' ng-options='iter for iter in selectOptions'> "
					  + " </select> "
					  + "<span ng-if='modeVar === undefined && mode==\"show\"' class='{{fieldClass}}' name='{{name}}'>{{$parent.ngModel}}</span> "
					  + " <select ng-if='modeVar === undefined && mode==\"edit\"'  ng-required='{{fieldRequired}}'' id='{{fieldId}}'  class='{{fieldClass}}' name='{{name}}' multiple='multiple' ng-model='$parent.ngModel' ng-options='iter for iter in selectOptions'> "
					  + " </select> ");
			}]);
		
		angular.module("template/field/multiselect2.html", []).run(["$templateCache", function($templateCache) {
			  $templateCache.put("template/field/multiselect2.html",
					  "<span ng-if='modeVar==\"show\"'>"
					  + "<div ng-repeat='element in $parent.ngModel' class='{{fieldClass}}' name='{{name}}'>"
					  + "{{element}}<br>"
					  + "</div> "
					  + "</span> "
					  + " <select ng-if='modeVar==\"edit\"'  ng-required='{{fieldRequired}}' id='{{fieldId}}'  class='{{fieldClass}}' name='{{name}}' multiple='multiple' ng-model='$parent.ngModel' ng-options='iter[selectValue] as iter[selectDisplayName] for iter in selectOptions'> "
					  + " </select> "
					  + "<span ng-if='modeVar === undefined && mode==\"show\"' class='{{fieldClass}}' name='{{name}}'>{{$parent.ngModel}}</span> "
					  + " <select ng-if='modeVar === undefined && mode==\"edit\"'  ng-required='{{fieldRequired}}'' id='{{fieldId}}'  class='{{fieldClass}}' name='{{name}}' multiple='multiple' ng-model='$parent.ngModel' ng-options='iter[selectValue] as iter[selectDisplayName] for iter in selectOptions'> "
					  + " </select> ");
			}]);
	
		angular.module("template/field/angucomplete.html", []).run(["$templateCache", function($templateCache) {
			  $templateCache.put("template/field/angucomplete.html",
					  		"<span ng-if='modeVar==\"show\"' class='{{fieldClass}}' input-name='{{name}}'>{{$parent.ngModel}}</span> "+
							"<angucomplete-alt ng-if='modeVar==\"edit\" && fieldRequired ==\"true\"' field-required='true' minlength='3' maxlength='128' id='{{fieldId}}'"+
							" input-class='{{fieldClass}}' name='{{name}}' match-class='highlight'"+
							" initial-value='$parent.ngModel'"+
							" selected-object='$parent.selectedObject'"+
							" remote-url='{{remoteUrl}}'"+
							" title-field='{{titleField}}'>"+
							
							"<angucomplete-alt ng-if='modeVar==\"edit\" && fieldRequired ==\"false\"' minlength='3' maxlength='128' id='{{fieldId}}'"+
							" input-class='{{fieldClass}}' input-name='{{name}}' match-class='highlight'"+
							" initial-value='$parent.ngModel'"+
							" selected-object='$parent.selectedObject'"+
							" remote-url='{{remoteUrl}}'"+
							" title-field='{{titleField}}'>"+
							
							"<span ng-if='modeVar === undefined && mode==\"show\"' class='{{fieldClass}}' input-name='{{name}}'>{{$parent.ngModel}}</span> "+
							"<angucomplete-alt ng-if='modeVar === undefined && mode==\"edit\" && fieldRequired ==\"true\"' field-required='true' minlength='3' maxlength='128' id='{{fieldId}}'"+
							" input-class='{{fieldClass}}' name='{{name}}' match-class='highlight'"+
							" initial-value='$parent.ngModel'"+
							" selected-object='$parent.selectedObject'"+
							" remote-url='{{remoteUrl}}'"+
							" title-field='{{titleField}}'>"+							
							"<angucomplete-alt ng-if='modeVar === undefined && mode==\"edit\"  && fieldRequired ==\"false\"' minlength='3' maxlength='128' id='{{fieldId}}'"+
							" input-class='{{fieldClass}}' input-name='{{name}}' match-class='highlight'"+
							" initial-value='$parent.ngModel'"+
							" selected-object='$parent.selectedObject'"+
							" remote-url='{{remoteUrl}}'"+
							" title-field='{{titleField}}'>");
			}]);
		
		angular.module("template/field/timepicker.html", []).run(["$templateCache", function($templateCache) {
			  $templateCache.put("template/field/timepicker.html",
					  "<span ng-if='modeVar==\"show\"' class='{{fieldClass}}' name='{{name}}'>{{$parent.ngModel}}</span> "+
					  "<ng-datetimepicker ng-if='modeVar==\"edit\"'  ng-required='{{fieldRequired}}' type='text' class='{{fieldClass}}' name='{{name}}' id='{{fieldId}}'"+ 
							" ng-model='$parent.ngModel'></ng-datetimepicker>"+
						"<span ng-if='modeVar === undefined && mode==\"show\"' class='{{fieldClass}}' name='{{name}}'>{{$parent.ngModel}}</span> "+
							  "<ng-datetimepicker ng-if='modeVar === undefined && mode==\"edit\"'  ng-required='{{fieldRequired}}' ng-show='mode==\"edit\"' type='text' class='{{fieldClass}}' name='{{name}}' id='{{fieldId}}'"+ 
									" ng-model='$parent.ngModel'></ng-datetimepicker>");
			}]);
		
		angular.module("template/field/datepicker.html", []).run(["$templateCache", function($templateCache) {
			  $templateCache.put("template/field/datepicker.html",
					  "<span ng-if='modeVar==\"show\"' class='{{fieldClass}}' name='{{name}}'>{{$parent.ngModel}}</span> "+
					  "<a-datepicker ng-if='modeVar==\"edit\"'  ng-required='{{fieldRequired}}' class='{{fieldClass}}' name='{{name}}'"+
							" value='{{$parent.ngModel}}' ng-model='$parent.ngModel' "+
							" min-date='minDate' max-date='maxDate'>"+
							" </a-datepicker>"+
							"<span ng-if='modeVar === undefined && mode==\"show\"' class='{{fieldClass}}' name='{{name}}'>{{$parent.ngModel}}</span> "+
							  "<a-datepicker ng-if='modeVar === undefined && mode==\"show\"' ng-show='mode==\"edit\"' class='{{fieldClass}}' name='{{name}}'"+
									" value='{{$parent.ngModel}}' ng-model='$parent.ngModel' "+
									" min-date='minDate' max-date='maxDate'>"+
									" </a-datepicker>"
							);
			}]);
		
})();