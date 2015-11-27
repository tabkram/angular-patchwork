(function() {
	'use strict';
	angular.module("sidesplit", []);
	
	angular.module("sidesplit")
	  .provider('$sideSplit', function() {
		    var $sideSplitProvider = {
		      options: {
		      },
		      $get: ['$injector', '$rootScope', '$q', '$document', '$animate', '$templateRequest', '$controller', '$compile',
		        function ($injector, $rootScope, $q, $document, $animate, $templateRequest, $controller, $compile) {
		    	  return { 
		    		  		open : open,
		    		  		close : close
		    		  	 };

		          // BEGIN : open sidesplit function
		    		  	 
		    	  function close(sideSplitOptions){
		    		  if(sideSplitOptions.id){
		    			  var appendToElement = sideSplitOptions.id;
		    			  	  if(sideSplitOptions.message) console.log("closing message", sideSplitOptions.messge);
	                    	  appendToElement.html('');
//	                    	  $animate.leave(appendToElement);
		    		  } 
		    	  }
		    	  
		          function open(sideSplitOptions){
		        	  var sideSplitScope = (sideSplitOptions.scope || $rootScope).$new();
		        	  var ctrlInstance, ctrlLocals = {};
		        	  var resolveIter = 1;
		        	  ctrlLocals.$scope =  sideSplitScope ;
		              
		              var templateAndResolvePromise =
		                  $q.all([getTemplatePromise(sideSplitOptions)].concat(getResolvePromises(sideSplitOptions.resolve)));

		                function resolveWithTemplate() {
		                  return templateAndResolvePromise;
		                }
		              
		              if (angular.isDefined(sideSplitOptions.templateUrl)) {
			                templateAndResolvePromise.then(function(tplAndVars){
			                	  var template = angular.element(tplAndVars[0]);
			                      if (sideSplitOptions.controller) {
			                          angular.forEach(sideSplitOptions.resolve, function(value, key) {
			                              ctrlLocals[key] = tplAndVars[resolveIter++];
			                            });
			                          var ctrlInstance = $controller(sideSplitOptions.controller, ctrlLocals);
			                          if (sideSplitOptions.controllerAs) {
			                        	  sideSplitScope[sideSplitOptions.controllerAs] = ctrlInstance;
			                          }
			                          $compile(template)(sideSplitScope, undefined, {transcludeControllers: ctrlInstance});
			                      } else {
			                    	  $compile(template)(sideSplitScope);
			                      }
			                      
			                      var angularDomEl = angular.element('<div></div>');
			                      angularDomEl.html(tplAndVars[0]);
			                        var positionClass =  sideSplitOptions.position ? 'sidesplit-' + sideSplitOptions.position : 'sidesplit-right';
			                        positionClass += sideSplitOptions.isAbsolute == true ? " sidesplit-abs" : "";
			                        $animate.addClass(angularDomEl, 'sidesplit '+ positionClass);	
			                        
			                      var appendToElement = sideSplitOptions.appendTo || $document.find('body').eq(0);
			                      if(sideSplitOptions.isAppend != true){
			                    	  appendToElement.html('');
			                      }
			                      $animate.enter(angularDomEl, appendToElement)
			                      .then(function() {
			                        $compile(angularDomEl)(sideSplitScope);
			                        
			                        
//			                        var positionClass =  sideSplitOptions.position ? 'sidesplit-' + sideSplitOptions.position : 'sidesplit-right';
//			                        positionClass += sideSplitOptions.isAbsolute == true ? " sidesplit-abs" : "";
//			                        $animate.addClass(appendToElement, 'sidesplit '+ positionClass);		                        
			                      });

			                });
		              }
		              
		          }
		          // END : open sidesplit function
		          
		      	// ---------------
		    	  // BEGIN : get template promise
		        function getTemplatePromise(options) {
		            return options.template ? $q.when(options.template) :
		              $templateRequest(angular.isFunction(options.templateUrl) ?
		                options.templateUrl() : options.templateUrl);
		        }
		        // END : get template promise
		        // BEGIN : get resolve promise
		        function getResolvePromises(resolves) {
		            var promisesArr = [];
		            angular.forEach(resolves, function(value) {
		              if (angular.isFunction(value) || angular.isArray(value)) {
		                promisesArr.push($q.when($injector.invoke(value)));
		              } else if (angular.isString(value)) {
		                promisesArr.push($q.when($injector.get(value)));
		              } else {
		                promisesArr.push($q.when(value));
		              }
		            });
		            return promisesArr;
		          }
		        // END : get resolve promise
		        // ----------------
		        
		        }
		      ]
		    };

		    return $sideSplitProvider;
		  });
	  
})();


