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

       if(window.cordova) {
           window.plugins.sqlDB.copy("populated.db", function() {
               db = $cordovaSQLite.openDB("populated.db");
              // $location.path("/categories");
           }, function(error) {
               console.error("There was an error copying the database: " + error);
               db = $cordovaSQLite.openDB("populated.db");
               //$location.path("/categories");
           });
       } else {
           db = openDatabase("websql.db", '1.0', "My WebSQL Database", 2 * 1024 * 1024);
           db.transaction(function (tx) {
               tx.executeSql("DROP TABLE IF EXISTS tblCategories");
               tx.executeSql("DROP TABLE IF EXISTS tblTodoLists");
               tx.executeSql("DROP TABLE IF EXISTS tblNotifications");
               tx.executeSql("CREATE TABLE IF NOT EXISTS tblNotifications (id integer primary key AUTOINCREMENT, product_name text, product_image text, is_added text)");
               tx.executeSql("CREATE TABLE IF NOT EXISTS tblCategories (id integer primary key AUTOINCREMENT, category_name text)");
               tx.executeSql("CREATE TABLE IF NOT EXISTS tblTodoLists (id integer primary key AUTOINCREMENT, category_id integer, todo_list_name text, is_added integer)");
               //Insert values in category table
               tx.executeSql("INSERT INTO tblCategories (category_name) VALUES (?)", ["Strollers & Carriers"]);
               tx.executeSql("INSERT INTO tblCategories (category_name) VALUES (?)", ["Car Seats"]);
               tx.executeSql("INSERT INTO tblCategories (category_name) VALUES (?)", ["Bathing & Infant Care"]);
               tx.executeSql("INSERT INTO tblCategories (category_name) VALUES (?)", ["Feeding"]);
               tx.executeSql("INSERT INTO tblCategories (category_name) VALUES (?)", ["Nursey"]);
               tx.executeSql("INSERT INTO tblCategories (category_name) VALUES (?)", ["Safety"]);
               tx.executeSql("INSERT INTO tblCategories (category_name) VALUES (?)", ["Playtime"]);
               tx.executeSql("INSERT INTO tblCategories (category_name) VALUES (?)", ["Bedding"]);
               tx.executeSql("INSERT INTO tblCategories (category_name) VALUES (?)", ["Clothing"]);
               tx.executeSql("INSERT INTO tblCategories (category_name) VALUES (?)", ["Nappies"]);
               //Insert values to Category list
               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [1, "Carrier"]);
               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [1, "Lightweight Stroller"]);
               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [1, "Traditional Stroller"]);
               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [1, "Travel System Stroller"]);

               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [2, "Convertible Car Seat"]);
               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [2, "Infant Car Seat"]);

               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [3, "Air Purifier"]);
               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [3, "Baby Bathtub"]);
               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [3, "Body Lotions & Moisturiser"]);
               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [3, "Humidifier"]);
               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [3, "Laundry Detergent"]);
               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [3, "Shampoo & Bodywash"]);
               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [3, "Thermometer"]);
               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [3, "Towels"]);

               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [4, "Bibs"]);
               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [4, "Breast Milk Storage"]);
               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [4, "Breast Pads"]);
               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [4, "Breast Pump"]);
               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [4, "Burp Cloths"]);
               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [4, "Containers"]);
               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [4, "Dummies"]);
               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [4, "Infant Positioner"]);
               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [4, "Nursing Covers"]);
               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [4, "Nursing Pillow & Stool"]);

               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [5, "Changing Table"]);
               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [5, "Crib"]);
               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [5, "Crib Mattress"]);
               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [5, "Dressers or Chest"]);
               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [5, "Night Stands"]);
               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [5, "Rocker & Ottoman"]);

               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [6, "Cabinet & Drawer Locks"]);
               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [6, "First-Aid Kit"]);
               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [6, "Gates"]);
               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [6, "Humidifier"]);
               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [6, "Monitor"]);
               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [6, "Outlet Covers & Plugs"]);

               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [7, "Books"]);
               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [7, "Bouncer"]);
               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [7, "Infant Swing"]);
               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [7, "Infant Toys"]);
               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [7, "Play Mat or Baby Gym"]);
               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [7, "Play Yard"]);
               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [7, "Play Yard Sheets"]);
               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [7, "Stationary Entertainer"]);
               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [7, "Walker & Jumper"]);

               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [8, "Changing Table"]);
               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [8, "Crib Bedding Set"]);
               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [8, "Crib Blankets"]);
               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [8, "Fitter Crib Sheets"]);
               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [8, "Mattress Pads & Water Protector"]);
               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [8, "Receiving Blankets"]);
               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [8, "Sheet Savers"]);
               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [8, "Wearable Blankets"]);

               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [9, "Body Suits"]);
               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [9, "Caps, Mittens & Booties"]);
               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [9, "Gowns"]);
               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [9, "Sleep & Play"]);
               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [9, "Socks"]);

               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [10, "Baby Wipes"]);
               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [10, "Nappies - 4kg - 6kg"]);
               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [10, "Nappies - up to 4kg"]);
               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [10, "Nappy Bag"]);
               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [10, "Nappy Cream"]);
               tx.executeSql("INSERT INTO tblTodoLists (category_id, todo_list_name) VALUES (?,?)", [10, "Nappy Pails & Refills"]);

           });
       }
  	});
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
	$ionicConfigProvider.navBar.alignTitle('center');
  	$stateProvider
 	.state('login', {
		url: "/login",
		templateUrl: "templates/login.html",
                controller:'LoginCtrl'

	})


  	.state('app', {
		url: "/app",
		abstract: true,
		templateUrl: "templates/menu.html",
		controller: 'AppCtrl'
  	})

	.state('app.welcome', {
		url: "/welcome",
		views: {
	  		'menuContent': {
				templateUrl: "templates/welcome.html",
        controller:"ProfileCtrl"
	  		}
		}
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

	.state('app.createRegistry', {
		url: "/createRegistry",
	  	views: {
			'menuContent': {
		 		templateUrl: "templates/createRegistry.html",
        controller: 'RegistryCtrl'
			}
	  	}
	})

	.state('app.createRegistryFinal', {
		url: "/createRegistryFinal",
	  	views: {
			'menuContent': {
		 		templateUrl: "templates/createRegistryFinal.html",
        controller:'RegistryCtrl'
			}
	  	}
	})

	.state('app.myRegistry', {
		url: "/myRegistry",
	  	views: {
			'menuContent': {
		 		templateUrl: "templates/myRegistry.html",
        controller:"MyRegistryCtrl"
			}
	  	}
	})
  .state('app.editRegistry', {
		url: "/editRegistry",
	  	views: {
			'menuContent': {
		 		templateUrl: "templates/editRegistry.html",
        controller:"MyRegistryCtrl"
			}
	  	}
	})

	.state('app.socialShare', {
		url: "/socialShare",
	  	views: {
			'menuContent': {
		 		templateUrl: "templates/socialShare.html"
			}
	  	}
	})

	.state('app.checklist', {
		url: "/checklist",
	  	views: {
			'menuContent': {
		 		templateUrl: "templates/checklist.html",
        controller:"CheckListCtrl"
			}
	  	}
	})

  	.state('app.news', {
		url: "/news-feed",
		views: {
			'menuContent': {
				templateUrl: "templates/news-feed.html",
				controller: 'NewsCtrl'
	  		}
		}
 	})

  	.state('app.profile', {
		url: "/profile",
		views: {
	  		'menuContent': {
				templateUrl: "templates/profile.html",
        controller: 'ProfileCtrl'
	  		}
		}
  	})

	.state('app.intro', {
		url: "/intro",
		views: {
	  		'menuContent': {
				templateUrl: "templates/intro.html"
	  		}
		}
  	})

	.state('app.notifications', {
		url: "/notifications",
	  	views: {
			'menuContent': {
		 		templateUrl: "templates/notifications.html"
			}
	  	}
	})

	.state('app.browseProducts', {
		url: "/browseProducts",
	  	views: {
			'menuContent': {
		 		templateUrl: "templates/browseProducts.html",
        	controller: 'ProductCtrl',
          $scope: 'productPage'
			}
	  	}
	})

	.state('app.storeLocator', {
		url: "/storeLocator",
	  	views: {
			'menuContent': {
		 		templateUrl: "templates/storeLocator.html",
        controller:"StoreLocatorCtrl"
			}
	  	}
	})

  .state('app.storeLocatorProvince', {
		url: "/storeLocatorProvince",
	  	views: {
			'menuContent': {
		 		templateUrl: "templates/storeLocatorProvince.html"
			}
	  	}
	})

	.state('app.listUsers', {
		url: "/listUsers",
	  	views: {
			'menuContent': {
		 		templateUrl: "templates/listUsers.html"
			}
	  	}
	});

  	// if none of the above states are matched, use this as the fallback
  	$urlRouterProvider.otherwise('/login');

});
