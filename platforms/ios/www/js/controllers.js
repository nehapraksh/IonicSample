angular.module('starter.controllers', [])


.controller('AppCtrl', function($scope, $ionicModal, $ionicPopup, $timeout) {

	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:
	//$scope.$on('$ionicView.enter', function(e) {
	//});

	// Form data for the login modal
	$scope.loginData = {};

	// Create the login modal that we will use later
	$ionicModal.fromTemplateUrl('templates/login.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.modal = modal;
	});

	// Triggered in the login modal to close it
	$scope.closeLogin = function() {
		$scope.modal.hide();
	};

	// Open the login modal
	$scope.login = function() {
		$scope.modal.show();
	};

	// Perform the login action when the user submits the login form
	$scope.doLogin = function() {
		console.log('Doing login', $scope.loginData);

		// Simulate a login delay. Remove this and replace with your login
		// code if using a login system
		$timeout(function() {
		  $scope.closeLogin();
		}, 1000);
	};

	// popup of logout
	$scope.infoApp2 = function() {
		var alertPopup = $ionicPopup.alert({
			template: '<center>You are going out!!</center>',
			buttons: [
				{
					text: 'Ok',
					type: 'button-dark'
				}
			]
		});
		alertPopup.then(function(res) {
			console.log('Out!!');
		});
	};

})

.controller('NewsCtrl',function($scope, $ionicPopup){
	$scope.infoApp = function() {
		var alertPopup = $ionicPopup.alert({
			title: '<b class="assertive">Template</b>',
			template: '<center>Template ionSunset </center>',
			buttons: [
				{
					text: 'Ok',
					type: 'button-dark'
				}
			]
		});
		alertPopup.then(function(res) {
			console.log('Thank you!!');
		});
	};
})


//controller for login page
.controller('LoginCtrl', function($scope, $state, $ionicPopup, AuthService,$cordovaToast,$ionicLoading,USER_DETAILS) {
  	$scope.data = {};
		$scope.registry={};
	  $scope.login = function(data) {
			window.localStorage.setItem(USER_DETAILS.registry,null);
			console.log("Registry in login "+window.localStorage.getItem(USER_DETAILS.registry));
      showLoading($ionicLoading);
      if(data.firstname){
	        AuthService.register(data.firstname, data.lastname,data.username,data.password).then(function(authenticated) {
           //to get Registry details
 					 AuthService.getMyRegistry().then(function(success){
						hideLoading($ionicLoading);
	 					$cordovaToast.showLongBottom('You signed up successfully!');
	 					$state.go('app.welcome');
 				 },function(error){
 					 hideLoading($ionicLoading);
					 window.localStorage.setItem(USER_DETAILS.registry,null);
					 $cordovaToast.showLongBottom('You signed up successfully!');
					 $state.go('app.welcome');
 					 //$cordovaToast.showLongBottom(error.message);
 				 });

	     },function(err) {
	        hideLoading($ionicLoading);
	        var alertPopup = $ionicPopup.alert({
	        title: 'Registration failed!',
	        template: JSON.stringify(err.data.message)
	         });
	       });
      }else{
	   	    AuthService.login(data.username, data.password).then(function(authenticated) {
						AuthService.getMyRegistry().then(function(success){
							hideLoading($ionicLoading);
 					  //  $cordovaToast.showLongBottom('You logged in successfully!');
 						  $state.go('app.welcome');
						},function(error){

						hideLoading($ionicLoading);
						window.localStorage.setItem(USER_DETAILS.registry,null);
						//$cordovaToast.showLongBottom('You logged in successfully!');
 					  $state.go('app.welcome');
						//$cordovaToast.showLongBottom(error.message);
						});
	      }, function(err) {
			      hideLoading($ionicLoading);
			      var alertPopup = $ionicPopup.alert({
			      title: 'Login failed!',
			      template: 'Please check your credentials!'
	      });
    });
  }
  };
})


//controller for browseProducts page
.controller('ProductCtrl', function($scope, $state, $ionicPopup, AuthService,$cordovaToast,$ionicLoading,PAGE_SIZE,$cordovaSQLite,API_ENDPOINT) {
  $scope.items = {};
	$scope.isChecked =false;
	$scope.searchCriteria={};
  $scope.categoryId={};
	$scope.totalCount={};
	$scope.selectedItems = [];
	$scope.formData={};
	$scope.category={};
	$scope.abc={};
	$scope.imageUrl=API_ENDPOINT.baseUrl+API_ENDPOINT.imageUrl;
   showLoading($ionicLoading);
	 //call to load category
	 AuthService.loadCategory().then(function(success) {
	 		 $scope.category = success.data.children_data;
	 },function(err) {
	 		console.log("Category error! "+ JSON.stringify(err.data));
	 });

// to load product without category
	AuthService.getProductList("78",PAGE_SIZE.pageSize,1).then(function(success) {
					$scope.categoryId="78";
					$scope.items = success.data.items;
					$scope.searchCriteria= success.data.search_criteria;
					$scope.totalCount=success.data.total_count;
          hideLoading($ionicLoading);
    }, function(err) {
      hideLoading($ionicLoading);
      //$cordovaToast.showLongBottom(error.statusText);
    });

//to load product according to category
	$scope.productPage = function(category_id) {
		//console.log("CategoryId is**"+category_id);
		  showLoading($ionicLoading);
			$scope.categoryId= category_id;
		  AuthService.getProductList(category_id,PAGE_SIZE.pageSize,1).then(function(success) {
		      hideLoading($ionicLoading);
				  $scope.items = success.data.items;
				  $scope.searchCriteria= success.data.search_criteria;
				  $scope.totalCount=success.data.total_count;
		    }, function(err) {
		      hideLoading($ionicLoading);
		      $cordovaToast.showLongBottom(error.statusText);
		    });
 };

//to load more products
$scope.loadMore = function(pageSize,currentPage){
	 var count=currentPage+1;
	 var totalCount=$scope.totalCount-(currentPage*pageSize) ;
	 console.log("currentPage count! "+ count+"  categoryId  "+ $scope.categoryId+" totalitemleft "+totalCount);
	 if(totalCount>0){
    AuthService.getProductList($scope.categoryId,pageSize,count).then(function(items) {
      $scope.items = $scope.items.concat(items.data.items);
			$scope.searchCriteria= items.data.search_criteria;
			$scope.$broadcast('scroll.infiniteScrollComplete');
		}, function(err) {
    //  $cordovaToast.showLongBottom(err.message);
    });
	}
};
//to change the quantity in product list
$scope.changeQty = function(productSku,qty){
        $scope.selectedItems[productSku] = $scope.selectedItems[productSku] + qty;
};

//to add items to the registry
$scope.addToRegistry = function(abc,itemId,isChecked){
	if(isChecked){
	 showLoading($ionicLoading);
      AuthService.addToRegistry(itemId).then(function(success){
				hideLoading($ionicLoading);
				console.log("Product Class "+ JSON.stringify(abc));
				console.log("Product name is "+abc.name+abc.image);
				//$cordovaToast.showLongBottom("Item added to Registry!");
				addNotification($scope,$cordovaSQLite,abc.name,abc.image,true);
			},function(error){
       hideLoading($ionicLoading);
			 $cordovaToast.showLongBottom(error.message);
			});
		}
};

})

//Controller for user profile
.controller('ProfileCtrl',function($scope,$state, $cordovaToast,USER_DETAILS,AuthService,$ionicLoading){
  $scope.foo = null;
	$scope.data={};
	$scope.firstname={};
  $scope.lastname={};
  $scope.email={};
	$scope.registry=null;
  $scope.firstname=window.localStorage.getItem(USER_DETAILS.firstname);
  $scope.lastname=window.localStorage.getItem(USER_DETAILS.lastname);
  $scope.email=window.localStorage.getItem(USER_DETAILS.email);
	$scope.registry=window.localStorage.getItem(USER_DETAILS.registry);
	console.log("Registry in profile "+$scope.registry);
  $scope.editUser = function(data) {
		 showLoading($ionicLoading);
		   AuthService.editUserDetails(data.firstname,data.lastname,data.email).then(function(details) {
				hideLoading($ionicLoading);
			 $cordovaToast.showLongBottom("Profile edited successfully");
	 	   $state.go('app.welcome');
	 	}, function(err) {
			hideLoading($ionicLoading);
	 		$cordovaToast.showLongBottom(err.message);
	 	});
  };
})

//Controller for create a new registry
.controller('RegistryCtrl', function($scope,AuthService,$state,$ionicLoading,$cordovaToast,$cordovaSQLite) {
    //console.log(AuthService.regForm);
    $scope.provinces={};
		$scope.stores={};
		$scope.regForm=null;
		if(AuthService.regForm.registryname==undefined){
		  $scope.regForm={};
		}else{
		   $scope.regForm = AuthService.regForm;
		 }
		  showLoading($ionicLoading);
			//To get Provinces value
		  AuthService.getProvinceList().then(function(success){
				hideLoading($ionicLoading);
				//console.log(JSON.stringify(success));
			  $scope.provinces=success.data;
		  },function(error){
			  hideLoading($ionicLoading);
			  $cordovaToast.showLongBottom(error.message);
		  });
		//To get Stores value according to province
    $scope.getStores = function(){
			showLoading($ionicLoading);

		  AuthService.getStores($scope.regForm.province).then(function(success){
			 hideLoading($ionicLoading);
       $scope.stores=success.data;
			 //console.log("Scope called****"+JSON.stringify($scope.stores));
		},function(error){
			hideLoading($ionicLoading);
		  $cordovaToast.showLongBottom(error.message);
	  });
	};
// to create a new registry
	$scope.createRegistry=function(regForm){
		showLoading($ionicLoading);
		 AuthService.createRegistry($scope.regForm.registryname,$scope.regForm.province,$scope.regForm.store,$scope.regForm.registryDate,regForm.co_registant,regForm.location,regForm.message).then(function(success){
			hideLoading($ionicLoading);
			$state.go('app.welcome');
		},function(error){
			hideLoading($ionicLoading);
      $cordovaToast.showLongBottom(error.message);
		});
	};

//to retriev value from one registry form to another
	$scope.submitRegForm = function() {
	  AuthService.regForm = $scope.regForm;
      $state.go('app.createRegistryFinal');
    };
})

//Controller for Registry details
.controller('MyRegistryCtrl', function($scope, $state,AuthService,$ionicLoading,$cordovaToast,$cordovaSQLite) {
	 $scope.registry={};
	 $scope.items={};
	 $scope.selected={};
	 $scope.regForm=null;
	 showLoading($ionicLoading);
	 //to get Registry details
	 $scope.init=function(){
	 AuthService.getMyRegistry().then(function(success){
	 $scope.registry=success.data[0];
	 console.log("Registry values "+JSON.stringify($scope.registry));
	 $scope.getRegistryItems();
 },function(error){
	 hideLoading($ionicLoading);
	 $cordovaToast.showLongBottom(error.message);
 });
 }

//to get Registry items
 $scope.getRegistryItems=function(){
			 AuthService.getRegistryItems().then(function(success){
			 hideLoading($ionicLoading);
			 $scope.items=success.data[0].items;
			 //console.log("Registry item "+JSON.stringify($scope.items));
		 },function(error){
			hideLoading($ionicLoading);
			$cordovaToast.showLongBottom(error.data.message);
		 });
	 };

//to delete item from registry
$scope.deleteItem=function(item_id,item_name,item_image){
	showLoading($ionicLoading);
	AuthService.deleteRegistryItem(item_id).then(function(success){
		$scope.getRegistryItems();
		addNotification($scope,$cordovaSQLite,item_name,item_image,false);
		hideLoading($ionicLoading);
	 },function(error){
		 	hideLoading($ionicLoading);
      console.log("delete registry"+error);
	 });
}

//to edit item in registry
$scope.editItem=function(item_id){
	console.log("edit registry value"+item_id+" "+$scope.selected.qty);
	showLoading($ionicLoading);
	AuthService.editRegistryItem(item_id,$scope.selected.qty).then(function(success){
	$scope.getRegistryItems();
		hideLoading($ionicLoading);
	 },function(error){
		 	hideLoading($ionicLoading);
      console.log("edit registry"+error);
	 });
}


})

//Controller for Barcode scanner
.controller("BarcodeScannerCtrl", function($scope, $cordovaBarcodeScanner,$ionicPopup,AuthService) {
 //$scope.data={};

$scope.selected={};
    $scope.scanBarcode = function() {
			$scope.listdata = [];
      $scope.listdata.push("Scan Barcode");
			$scope.listdata.push("Enter Barcode");
			var confirmPopup = $ionicPopup.confirm({
			      title: 'Select Option',
			      template: '<ion-list ng-repeat="item in listdata">   '+
                      '  <ion-radio value="{{item}}" ng-model="selected.id"> '+
                      '    {{item}}                              '+
                      '  </ion-radio>                             '+
                      '</ion-list>                               ',
					scope: $scope,
			   });
				confirmPopup.then(function(res) {
       if(res) {
				 console.log("selected value " +$scope.selected.id);
				 $scope.ProcessScan($scope.selected.id);
       } else {
         //console.log('You are not sure');
       }
     });
};
	$scope.ProcessScan=function(selectedValue){
		 if(selectedValue=="Scan Barcode"){
			 $cordovaBarcodeScanner.scan().then(function(imageData) {
					 //alert(imageData.text);
					 console.log("Scan value " +imageData.text);
					 if(imageData.text){
						 AuthService.getProductDetails(imageData.text).then(function(success){
						 },function(error){
							 console.log("Details Error " +JSON.stringify(error));
						 });
					 }
					 console.log("Barcode Format -> " + imageData.format);
					 console.log("Cancelled -> " + imageData.cancelled);
			 }, function(error) {
					 console.log("An error happened -> " + error);
			 });
		 }else if(selectedValue=="Enter Barcode"){
			 $scope.entered={};
			 var enterScanPopup = $ionicPopup.confirm({
			 			title: 'Enter the Barcode ',
			 			template: '<input type="text" ng-model="entered.value">'+'</input>',
			 		scope: $scope,
			 	 });
			 	enterScanPopup.then(function(res) {
					  if(res) {
					 	 console.log("Entered value " +$scope.entered.value);
					 	 if($scope.entered.value){
							  AuthService.getProductDetails($scope.entered.value).then(function(success){
							 },function(error){
								 console.log("Details Error " +JSON.stringify(error));
							 });
						 }
					  } else {
					 	 //console.log('You are not sure');
					  }
			 });

		 }

	};
})

.controller('ImagePickerController', function($scope, $cordovaImagePicker, $ionicPlatform) {
 $scope.getImageSaveContact = function() {
        // Image picker will load images according to these settings
    var options = {
        maximumImagesCount: 1, // Max number of selected images, I'm using only one for this example
        width: 800,
        height: 800,
        quality: 80            // Higher is better
    };

    $cordovaImagePicker.getPictures(options).then(function (results) {
                // Loop through acquired images
        for (var i = 0; i < results.length; i++) {
            console.log('Image URI: ' + results[i]);   // Print image URI
        }
    }, function(error) {
        console.log('Error: ' + JSON.stringify(error));    // In case of error
    });
};
})

//Controller for Menu-Drawer
.controller('MenuActiveCtrl', function($scope, $location) {
    $scope.isActive = function(route) {
        return route === $location.path();
    };
})

//Controller for StoreLocator
.controller('StoreLocatorCtrl', function($scope, $cordovaGeolocation,$ionicLoading,AuthService) {
	$scope.stores={};
	$scope.mylocation=null;
	showLoading($ionicLoading);
        var posOptions = {
            enableHighAccuracy: true,
            timeout: 100000,
            maximumAge: 0
        };
$scope.init=function(){
  $cordovaGeolocation.getCurrentPosition(posOptions).then(function (position) {
      $scope.lat = position.coords.latitude;
      $scope.lng = position.coords.longitude;
			console.log("My location "+$scope.lat+" "+$scope.lng);
			var geocoder = new google.maps.Geocoder();
			var latlng = new google.maps.LatLng($scope.lat, $scope.lng);
			var request = {
						latLng: latlng
					};
			geocoder.geocode(request, function(data, status) {
			      if (status == google.maps.GeocoderStatus.OK) {
			         if (data[0] != null) {
								 $scope.mylocation=data[0].formatted_address;
                  console.log("address is: " +$scope.mylocation);
						    } else {
						          console.log("No address available");
						     }
						    }
						})
				AuthService.getStoresLocator($scope.lat, $scope.lng).then(function(success){
					$scope.stores=success.data.storesjson;
					hideLoading($ionicLoading);
				},function(error){
					hideLoading($ionicLoading);
				});
       });
		 }

})

//Controller for Checklist
.controller('CheckListCtrl', function($scope,$cordovaSQLite,$ionicPlatform,$ionicLoading) {
	    $scope.categories = [];
			$scope.lists=[];
			$scope.selected='';
			$scope.newItem={};
			$scope.searchItem={};
			$scope.category='';
			$scope.isChecked ='';

//to get checklist according to category id
	$scope.getChecklist = function(category_id){
				$scope.lists.length=0;
				$scope.lists=[];
				$scope.category=category_id;
        showLoading($ionicLoading);
			  var query = "SELECT id, category_id, todo_list_name,is_added FROM tblTodoLists where category_id = ?";
			  $cordovaSQLite.execute(db, query, [category_id]).then(function(res) {
							 if(res.rows.length > 0) {
									 for(var i = 0; i < res.rows.length; i++) {
											 $scope.lists.push({id: res.rows.item(i).id, category_id: res.rows.item(i).category_id, todo_list_name: res.rows.item(i).todo_list_name,is_added:res.rows.item(i).is_added});
									 }
									 	//console.log("CheckList category called**"+JSON.stringify($scope.lists));
							 }
							 hideLoading($ionicLoading);
					 }, function (err) {
						 hideLoading($ionicLoading);
							 console.error(err);
					 });
			 }

//to get Category
   $scope.init = function () {
			showLoading($ionicLoading);
		  var query = "SELECT id, category_name FROM tblCategories";
			$cordovaSQLite.execute(db, query, []).then(function(res) {
			hideLoading($ionicLoading);
			if(res.rows.length > 0) {
			  for(var i = 0; i < res.rows.length; i++) {
				   $scope.categories.push({id: res.rows.item(i).id, category_name: res.rows.item(i).category_name});
					}
		   }
		 }, function (err) {
			hideLoading($ionicLoading);
			console.error(err);
	 });
 };

//to select item of checklist
$scope.checkCheckList=function(item_id,isChecked){
			console.log("Checklist clicked "+item_id+" "+isChecked);
			var query="";
			if(item_id!==undefined){
		  if(isChecked){
			 query = "UPDATE tblTodoLists SET is_added = 1 WHERE id = (?)";
		 }else{
			 query = "UPDATE tblTodoLists SET is_added = 0 WHERE id = (?)";
		 }
			$cordovaSQLite.execute(db, query, [item_id]).then(function(res) {
			//console.log("Checklist checked"+ JSON.stringify(res));
		 }, function (err) {
			//console.log("Checklist checked error "+err);
		  });
		 }
 }

//to add item to checklist
$scope.insert = function() {
	//console.log("Insert click "+$scope.category+" "+$scope.newItem.name );
	if($scope.newItem !== undefined) {
			var query = "INSERT INTO tblTodoLists(category_id, todo_list_name) VALUES (?,?)";
			$cordovaSQLite.execute(db, query, [$scope.category,$scope.newItem.name ]).then(function(res) {
					$scope.lists.push({id: res.insertId, category_id: $scope.category, todo_list_name: $scope.newItem.name });
					$scope.newItem={};
					$scope.getChecklist($scope.category);
					//console.log("Item added "+JSON.stringify(res.insertId));
			}, function (err) {
					console.log("Item added error "+JSON.stringify(err));
			});
	} else {
			console.log("Action not completed");
	}
 }

//to search checklist item
$scope.search=function(){
			$scope.lists.length=0;
			$scope.lists=[];
			//console.log("Search called "+$scope.category+" "+$scope.searchItem.name);
			if($scope.searchItem.name !== undefined) {
					var query = "SELECT id,todo_list_name,is_added FROM tblTodoLists where category_id = ? AND todo_list_name =?";
					$cordovaSQLite.execute(db, query, [$scope.category,$scope.searchItem.name]).then(function(res) {
					hideLoading($ionicLoading);
					if(res.rows.length > 0) {
						for(var i = 0; i < res.rows.length; i++) {
							 $scope.lists.push({id: res.rows.item(i).id, todo_list_name: res.rows.item(i).todo_list_name, is_added:res.rows.item(i).is_added});
							}
						}
					 }, function (err) {
							console.log("Item added error "+JSON.stringify(err));
					});
			} else {
					console.log("Action not completed");
			}
		}

})

//Controller for Notification
.controller('NotificationCtrl', function($scope,$cordovaSQLite,$ionicPlatform,$ionicLoading,API_ENDPOINT) {
//to list notification
$scope.imageUrl=API_ENDPOINT.baseUrl+API_ENDPOINT.imageUrl;
$scope.init = function () {
	 $scope.notifications=[];
			 showLoading($ionicLoading);
			 var query = "SELECT id, product_name,product_image,is_added FROM tblNotifications";
			 $cordovaSQLite.execute(db, query, []).then(function(res) {
			 hideLoading($ionicLoading);
			 if(res.rows.length > 0) {
				 for(var i = 0; i < res.rows.length; i++) {
						$scope.notifications.push({id: res.rows.item(i).id, product_name: res.rows.item(i).product_name, product_image: res.rows.item(i).product_image, is_added: res.rows.item(i).is_added});
					 }
				}
			}, function (err) {
			 hideLoading($ionicLoading);
			 console.log(err);
		});
};
})

function addNotification($scope,$cordovaSQLite,productName,productImage,isAdded){
	console.log("Notification added "+productName+" "+productImage+" "+isAdded);
	$scope.notifications=[];
	//to insert in Notification lists
			if(productName !== undefined) {
					var query = "INSERT INTO tblNotifications(product_name , product_image, is_added) VALUES (?,?,?)";
					$cordovaSQLite.execute(db, query, [productName,productImage,isAdded ]).then(function(res) {
							$scope.notifications.push({id: res.insertId, product_name: productName, product_image: productImage,is_added:isAdded });
							console.log("Item added "+JSON.stringify(res.insertId));
					}, function (err) {
							console.log("Notification added error "+JSON.stringify(err));
					});
			} else {
					console.log(" Notification Action not completed");
			}
}


function showLoading ($ionicLoading){
  $ionicLoading.show({
    template: 'Loading...'
  }).then(function(){
  });
  }

  function hideLoading($ionicLoading){
    $ionicLoading.hide().then(function(){
    });
  };
