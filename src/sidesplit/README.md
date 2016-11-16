# Patchwork-sidesplit 
## For side bar menu / split screen menu
============

### To use it :

 1. Include .js and .css files to your index.html
 2. Add **pw-sidesplit** module to your app dependencies : `angular.module("sidemenuApp",['pw-sidesplit'])`
 3. Inject **pwSidesplit** to your controller : `exampleController.$inject = ['pwSidesplit'];` 


 ### Here's a code sample:

In the controller add :


```javascript

	pwSidesplit.open({ 
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


Then to close the **pw-sidesplit** :


```javascript

				pwSidesplit.close({ 
					id: angular.element('#splitscreen'),
					message :"closed!"
				});
				
```


Optionally, you can add several open and close callback methods :

```javascript

			pwSidesplit.addOpenCallBack(angular.element('#splitscreen'),function(){
				// executed callback function
			});
			pwSidesplit.addCloseCallBack(angular.element('#splitscreen'),function(){
				 // executed callback function
			});
	    	   	
```

To collapse the **sidesplit** :


```javascript

            pwSidesplit.collapse({ 
                 id: angular.element('#splitscreen'),
                 message :"collapsed!"
            });   
				
```

As for the close method, you can also add several collapse callback methods :

```javascript

		pwSidesplit.addCollapseCallBack(angular.element('#splitscreen'), function(isCollapsedRetour){
				$scope.isCollapsed = !$scope.isCollapsed ;
		});
	    	   	
```



