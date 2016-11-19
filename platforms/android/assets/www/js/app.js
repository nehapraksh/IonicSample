// Ionic Starter App
var db = null;

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','starter.controllers', 'ngCordova'])

.run(function($ionicPlatform,$ionicLoading, $location, $ionicHistory, $cordovaSQLite) {
  	$ionicPlatform.ready(function() {
    		// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    		// for form inputs)
    		if (window.cordova && window.cordova.plugins.Keyboard) {
    		  	cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    		}
    		if (window.StatusBar) {
    		  	// org.apache.cordova.statusbar required
    		  	StatusBar.styleDefault();
    		}
  	});
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider,$provide) {
	$ionicConfigProvider.navBar.alignTitle('center');
  	$stateProvider

    .state('login', {
      url: "/login",
      templateUrl: "templates/login.html",
      controller:"LoginCtrl"
      })

      .state('browseProducts', {
    		url: "/browseProducts",
    		 		templateUrl: "templates/browseProducts.html",
            	controller: 'ProductCtrl',
              $scope: 'productPage'
    	})


  	.state('app', {
		url: "/app",
		abstract: true,
		templateUrl: "templates/menu.html",
		controller: 'AppCtrl'
  	})

	.state('app.register', {
		url: "/register",
	  	views: {
			'menuContent': {
		 		templateUrl: "templates/register.html",
        controller: 'LoginCtrl'
			}
	  	}
	})
  	// if none of the above states are matched, use this as the fallback
  	$urlRouterProvider.otherwise('/login');

});
