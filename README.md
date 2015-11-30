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
						position : "right",
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


