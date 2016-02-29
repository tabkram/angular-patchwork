# Angular-sidesplit 
## For side bar menu / split screen menu
============

### To use it :

 1. Include .js and .css files to your index.html
 2. Add **sidesplit** module to your app dependencies : `angular.module("sidemenuApp",['sidesplit'])`
 3. Inject **$sideSplit** to your controller : `exampleController.$inject = ['$sideSplit'];` 


 ### Here's a code sample:

In the controller add :


```javascript

	$sideSplit.open({ 
						templateUrl: 'client/app/example.html',
						controller: 'exampleController',
						appendTo : angular.element('#splitscreen'),
						isAbsolute : true,
						hideOnClickout: true,
						width : "25%", //default 50% (you can also use pixels)
						height: "800px", //default 100% (you can also use %
						position : "right",
						animation : "right", //no animation by default
						resolve: {
							...
						},
						openCallBack : function(){
							// here and executed open callBack
						}
	});
					
```

In the template file :

`<div id="splitscreen"></div>`


Then to close the **sidesplit** :


```javascript

				$sideSplit.close({ 
					id: angular.element('#splitscreen'),
					message :"closed!"
				});
				
```


Optionally, you can add several open and close callback methods :

```javascript

			$sideSplit.addOpenCallBack(angular.element('#splitscreen'),function(){
				// executed callback function
			});
			$sideSplit.addCloseCallBack(angular.element('#splitscreen'),function(){
				 // executed callback function
			});
	    	   	
```

To collapse the **sidesplit** :


```javascript

            $sideSplit.collapse({ 
                 id: angular.element('#splitscreen'),
                 message :"collapsed!"
            });   
				
```

As for the close method, you can also add several collapse callback methods :

```javascript

		$sideSplit.addCollapseCallBack(angular.element('#splitscreen'), function(isCollapsedRetour){
				$scope.isCollapsed = !$scope.isCollapsed ;
		});
	    	   	
```


