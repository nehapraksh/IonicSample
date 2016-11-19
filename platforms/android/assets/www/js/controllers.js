angular.module('starter.controllers', [])


.controller('AppCtrl', function($scope,$state, $ionicModal, $ionicPopup, $timeout,AuthService) {

	// With the new view caching in Ionic, Controllers are only called
	// when they are recreated or on app start, instead of every page change.
	// To listen for when this page is active (for example, to refresh data),
	// listen for the $ionicView.enter event:
	//$scope.$on('$ionicView.enter', function(e) {
	//});
})
//controller for login page
.controller('LoginCtrl', function($scope, $state, $ionicPopup, AuthService,$cordovaToast,$ionicLoading,USER_DETAILS) {
  	$scope.data = {};
		$scope.registry={};
	  $scope.login = function(data) {
      showLoading($ionicLoading);
      if(data.firstname){
	        AuthService.register(data.firstname, data.lastname,data.username,data.password).then(function(authenticated) {
					 hideLoading($ionicLoading);
					 $cordovaToast.showLongBottom('You signed up successfully!');
					 $state.go('browseProducts');
	     },function(err) {
	        hideLoading($ionicLoading);
	        var alertPopup = $ionicPopup.alert({
	        title: 'Registration failed!',
	        template: JSON.stringify(err.data.message)
	         });
	       });
      }else{
	   	    AuthService.login(data.username, data.password).then(function(authenticated) {
						hideLoading($ionicLoading);
					  //$cordovaToast.showLongBottom('You logged in successfully!');
						$state.go('browseProducts');
	      }, function(err) {
			      hideLoading($ionicLoading);
			      var alertPopup = $ionicPopup.alert({
			      title: 'Login failed!',
			      template: 'Please check your credentials!'
	      });
    });
  }
  };

	$scope.openRegister=function(){
		$state.go('app.register');
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
	$scope.imageUrl=API_ENDPOINT.serverUrl+API_ENDPOINT.imageUrl;
   showLoading($ionicLoading);

	 //call to load category
	 AuthService.loadCategory().then(function(success) {
	 		 $scope.category = success.data.children_data;
	 },function(err) {
	 		console.log("Category error! "+ JSON.stringify(err.data));
	 });

// to load product without category
	AuthService.getProductList("",PAGE_SIZE.pageSize,1).then(function(success) {
					$scope.categoryId="";
					$scope.items = success.data.items;
					$scope.searchCriteria= success.data.search_criteria;
					$scope.totalCount=success.data.total_count;
          hideLoading($ionicLoading);
    }, function(err) {
      hideLoading($ionicLoading);
      $cordovaToast.showLongBottom(error.statusText);
    });

//to load product according to category
	$scope.productPage = function(category_id) {
		//console.log("CategoryId is**"+category_id);
		  showLoading($ionicLoading);
      if(category_id==38){
       $scope.categoryId="";
     }
      else if(category_id==20){
        $scope.categoryId=23;
        }
      else if (category_id==11) {
        $scope.categoryId=14;
      }else {
        $scope.categoryId=category_id;
      }
		  AuthService.getProductList($scope.categoryId,PAGE_SIZE.pageSize,1).then(function(success) {
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
	 //console.log("currentPage count! "+ count+"  categoryId  "+ $scope.categoryId+" totalitemleft "+totalCount);
	 if(totalCount>0){
    AuthService.getProductList($scope.categoryId,pageSize,count).then(function(items) {
      $scope.items = $scope.items.concat(items.data.items);
			$scope.searchCriteria= items.data.search_criteria;
			$scope.$broadcast('scroll.infiniteScrollComplete');
		}, function(err) {
      $cordovaToast.showLongBottom(err.message);
    });
	}
};
})



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
