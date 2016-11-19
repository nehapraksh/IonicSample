angular.module('starter')


.service('AuthService', function($q, $http,API_ENDPOINT,USER_DETAILS,$cordovaToast) {
  var LOCAL_TOKEN_KEY = 'yourTokenKey';
  var username = '';
  var isAuthenticated = false;
  var authToken;
  var registryId = '';

//to get user saved token from app memory
  function loadUserCredentials() {
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
    if (token) {
      useCredentials(token);
    }
  }

//To save user token in app memory
  function storeUserCredentials(token) {
    window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
    useCredentials(token);
  }

//To get user token after response
  function useCredentials(token) {
    //username = token.split('.')[0];
    isAuthenticated = true;
    authToken = token;

    // Set the token as header for your requests!

   // $http.defaults.headers.common['Authorization'] = 'Bearer '+token;
  }

//To destroys user token
  function destroyUserCredentials() {
    authToken = undefined;
    username = '';
    isAuthenticated = false;
   // $http.defaults.headers.common['X-Auth-Token'] = undefined;
    window.localStorage.removeItem(LOCAL_TOKEN_KEY);
  }

//To get User authentication token
var register = function(firstname,lastname,email, pw) {
      // console.log("Name : "+ email);
      // console.log("Password : "+ pw);
      return $q(function(resolve, reject) {
        	console.log("Inside Registration Service");
        	var data = {  customer:{
            firstname:firstname,
            lastname:lastname,
            email : email
          },
            password : pw
        };
          var link =API_ENDPOINT.baseUrl+'customers';
          $http.post(link,data).then(function successCallback(response) {
              	// 	console.log("Registration Response");
              	// 	console.log(JSON.stringify(response));
                // //login(email,pw);
            resolve(login(email,pw));
        	},function errorCallback(error) {
                		console.log("Registration Error");
                		console.log(JSON.stringify(error));
                    reject(error);
        	});
      });
    };


//To get User authentication token
  var login = function(name, pw) {
    // console.log("Login Name : "+ name);
    // console.log("Login Password : "+ pw);
    return $q(function(resolve, reject) {
      	console.log("Inside Login Service");
      	var data = {
      		   username : name,
      		   password : pw
      		};
        var link =API_ENDPOINT.baseUrl+'integration/customer/token';
        $http.post(link,data).then(function successCallback(response) {
            		// console.log("Token Response");
            		// console.log(JSON.stringify(response));
                storeUserCredentials(response.data);
                //getMyRegistry();
                //loadCategory() ;
                resolve(loadUserDetails());
      	},function errorCallback(error) {
              		console.log("Token Error");
              		console.log(JSON.stringify(error));
                  reject(error);
      	});
    });
  };

//To get User Details after getting token
var loadUserDetails=function() {
  return $q(function(resolve, reject) {
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
    console.log("Token Value "+token);
        if (token) {
            var link= API_ENDPOINT.baseUrl+'customers/me';
            var header='Bearer '+token;
           //$http.defaults.headers.common['Authorization'] = 'Bearer '+token;
           	$http({
          		method: 'GET',
          		url:link,
          		headers: {
                      		'Content-Type': 'application/json',
                           'Authorization': 'Bearer '+token
          		}
          		}).then(function successCallback(response) {
          		// console.log("Customer success Response");
          	  // console.log(JSON.stringify(response));
              //console.log("USER Details "+JSON.stringify(response.data.firstname));
              window.localStorage.setItem(USER_DETAILS.firstname,response.data.firstname);
              window.localStorage.setItem(USER_DETAILS.lastname,response.data.lastname);
              window.localStorage.setItem(USER_DETAILS.email,response.data.email);
              window.localStorage.setItem(USER_DETAILS.id,response.data.id);
          	  resolve(response);
          	},function errorCallback(error) {
          		console.log("Customer Error");
          		console.log(JSON.stringify(error));
              reject(error.data);
          	});
        }
  });
};

//To edit User Details
var editUserDetails=function(firstname,lastname,email) {
  return $q(function(resolve, reject) {
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
    console.log("Token Value "+token);
        if (token) {
            var link= API_ENDPOINT.baseUrl+'customers/me';
            var header='Bearer '+token;
            var data = {  customer:{
              firstname:firstname,
              lastname:lastname,
              email : email
            }
          };
           	$http({
          		method: 'PUT',
          		url:link,
          		headers: {
                      		'Content-Type': 'application/json',
                           'Authorization': 'Bearer '+token
          		},
              data: data
          		}).then(function successCallback(response) {
          		// console.log("Customer edit success Response");
          	  // console.log(JSON.stringify(response));
              window.localStorage.setItem(USER_DETAILS.firstname,response.data.firstname);
              window.localStorage.setItem(USER_DETAILS.lastname,response.data.lastname);
              window.localStorage.setItem(USER_DETAILS.email,response.data.email);
              window.localStorage.setItem(USER_DETAILS.id,response.data.id);
          	  resolve(response);
          	},function errorCallback(error) {
          		console.log("Customer edit Error");
          		console.log(JSON.stringify(error));
              reject(error.data);
          	});
        }
  });
};


//To get Provinces list
var getProvinceList=function() {
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
  return $q(function(resolve, reject) {
            var link= API_ENDPOINT.baseUrl+'provinces';
           	$http({
          		method: 'GET',
          		url:link,
          		headers: {
                      		'Content-Type': 'application/json',
                          'Authorization': 'Bearer '+token
          		}
          		}).then(function successCallback(response) {
          		//console.log("Province success Response");
          	  //console.log(JSON.stringify(response));
          	  resolve(response);
          	},function errorCallback(error) {
          		console.log("Province Error");
          		console.log(JSON.stringify(error));
              reject(error.data);
          	});
  });
};

//To get Stores list
var getStores=function(province) {
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
  return $q(function(resolve, reject) {
            var link= API_ENDPOINT.baseUrl+'registry/stores';
           	$http({
          		method: 'GET',
          		url:link,
          		headers: {
                      		'Content-Type': 'application/json',
                          'Authorization': 'Bearer '+token
          		},
              params:{"province":province}
          		}).then(function successCallback(response) {
          		//console.log("Stores success Response");
          	  console.log(JSON.stringify(response));
          	  resolve(response);
          	},function errorCallback(error) {
          		console.log("Stores Error");
          		console.log(JSON.stringify(error));
              reject(error.data);
          	});
  });
};



//To create User Registry
var createRegistry=function(name,provinceName,storeName,registrydate,coRregistant,location,message) {
  return $q(function(resolve, reject) {
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
        if (token) {
            var link= API_ENDPOINT.baseUrl+'registry/create';
            var header='Bearer '+token;
            var data = {  registeryData:{
                          registryname:name,
                          province: provinceName ,
                          store:storeName,
                          eventdate: registrydate,
                          coregistrant: coRregistant,
                          eventlocation: location,
                          guestmessage: message
                        }
          };
           	$http({
          		method: 'POST',
          		url:link,
          		headers: {
                      		'Content-Type': 'application/json',
                           'Authorization': 'Bearer '+token
          		},
              data:data
          		}).then(function successCallback(response) {
          		console.log("Registry success Response");
          	  console.log(JSON.stringify(response));
              window.localStorage.setItem(USER_DETAILS.registry,response.data.registry_id);
          	  resolve(response);
          	},function errorCallback(error) {
          		console.log("Registry Error");
          		console.log(JSON.stringify(error));
              reject(error.data);
          	});
        }
  });
};

//To get Registry details
var getMyRegistry =function (){
var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
  return $q(function(resolve, reject) {
      //console.log("Inside Category Service");
       $http({
          		method: 'GET',
          		url:API_ENDPOINT.baseUrl+'registry/get',
          		headers: {
                      		'Content-Type': 'application/json',
                          'Authorization': 'Bearer '+token

                  	},
    		}).then(function successCallback(response) {
              console.log("RegistryId is ***"+JSON.stringify(response.data[0].registry_id));
              window.localStorage.removeItem(USER_DETAILS.registry);
              window.localStorage.setItem(USER_DETAILS.registry,response.data[0].registry_id);
          		// console.log("Registry Response");
          		// console.log(JSON.stringify(response));
              resolve(response);
    		},function errorCallback(error) {
          		console.log("Registry Error");
              window.localStorage.setItem(USER_DETAILS.registry,null);
              console.log("Registry Id in eror "+window.localStorage.getItem(USER_DETAILS.registry) );
          		console.log(JSON.stringify(error));
              reject(error);
    	  });
});
};

//To add items to registry
var addToRegistry =function (itemId){
  var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
   return $q(function(resolve, reject) {
     var data= {
         products:[
         {
            itemid:itemId,
            qty:"1"
         }
      ]
    };
       $http({
          		method: 'POST',
          		url:API_ENDPOINT.baseUrl+'registry/item/add/',
          		headers: {
                      		'Content-Type': 'application/json',
                          'Authorization': 'Bearer '+token

                  	},
            data:data
    		}).then(function successCallback(response) {
          		//  console.log("addToRegistry Response");
          		//  console.log(JSON.stringify(response));
              resolve(response);
    		},function errorCallback(error) {
          		console.log("addToRegistry Error");
          		console.log(JSON.stringify(error));
              reject(JSON.stringify(error.data))
    	  });
   });
};

//to get Registry items
var getRegistryItems=function (itemId){
  var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
   return $q(function(resolve, reject) {
     var data=window.localStorage.getItem(USER_DETAILS.registry);
       $http({
          		method: 'GET',
          		url:API_ENDPOINT.baseUrl+'registry/item/mine',
          		headers: {
                      		'Content-Type': 'application/json',
                          'Authorization': 'Bearer '+token

                  	},
                params:{"registryId":data}
    		}).then(function successCallback(response) {
          		// console.log("RegistryItems Response");
          		// console.log(JSON.stringify(response));
              resolve(response);
    		},function errorCallback(error) {
          		console.log("RegistryItems Error");
          		console.log(JSON.stringify(error));
              reject(JSON.stringify(error.data))
    	  });
   });
};

//to get Store locater
var getStoresLocator=function (lat,long){
  console.log("Stores locator called");
   return $q(function(resolve, reject) {
     var data={latitude: lat ,longitude: long};
       $http({
          		method: 'POST',
          		url:'http://138.68.80.175/storelocator/index/loadstore/',
          		headers: {
                      		'Content-Type': 'application/x-www-form-urlencoded'

                  	},
                params:{"latitude":lat, "longitude":long,"radius":"10000"}
    		}).then(function successCallback(response) {
             console.log("success result"+JSON.stringify(response.data));
              resolve(response);
    		},function errorCallback(error) {
          console.log(" Error  "+JSON.stringify(error.data));
              reject(error)
    	  });
   });
};

//To delete registry item
var deleteRegistryItem = function (item_id){
  console.log("item Id is "+ item_id);
  var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
  if(token&&item_id!==undefined){
   return $q(function(resolve, reject) {
       $http({
          		method: 'DELETE',
          		url:API_ENDPOINT.baseUrl+'registry/item/delete',
          		headers: {
                      		'Content-Type': 'application/json',
                          'Authorization': 'Bearer '+token

                  	},
              params:{"registryItemId":item_id}
    		}).then(function successCallback(response) {
          		 console.log("deleteRegistry item Response");
          		 console.log(JSON.stringify(response));
              resolve(response);
    		},function errorCallback(error) {
          		console.log("deleteRegistry Error");
          		console.log(JSON.stringify(error));
              reject(JSON.stringify(error.data))
    	  });
   });
 }
};

//To edit registry item
var editRegistryItem = function (item_id,qty){
  console.log("item Id edit is "+ item_id+" "+ qty);
  var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
  var registryId= window.localStorage.getItem(USER_DETAILS.registry);
  if(token&&item_id!==undefined){
    var data= {
           registryItemId:item_id,
           qty:qty,
           priority:1,
           description:null
   };
   return $q(function(resolve, reject) {
       $http({
          		method: 'PUT',
          		url:API_ENDPOINT.baseUrl+'registry/item/edit',
          		headers: {
                      		'Content-Type': 'application/json',
                          'Authorization': 'Bearer '+token

                  	},
            data:data
    		}).then(function successCallback(response) {
          		 console.log("editRegistry item Response");
          		 console.log(JSON.stringify(response));
              resolve(response);
    		},function errorCallback(error) {
          		console.log("editRegistry Error");
          		console.log(JSON.stringify(error));
              reject(JSON.stringify(error.data))
    	  });
   });
 }
};

//To edit registry
var editRegistry = function(name,provinceName,storeName,registrydate,coRregistant,location,message) {
  return $q(function(resolve, reject) {
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
        if (token) {
            var link= API_ENDPOINT.baseUrl+'registry/edit';
            var header='Bearer '+token;
            var data = {  registeryData:{
                          registryname:name,
                          province: provinceName ,
                          store:storeName,
                          eventdate: registrydate,
                          coregistrant: coRregistant,
                          eventlocation: location,
                          guestmessage: message
                        }
          };
           	$http({
          		method: 'PUT',
          		url:link,
          		headers: {
                      		'Content-Type': 'application/json',
                           'Authorization': 'Bearer '+token
          		},
              data:data
          		}).then(function successCallback(response) {
          		console.log("Registry edit Response");
          	  console.log(JSON.stringify(response));
              //window.localStorage.setItem(USER_DETAILS.registry,response.data.registry_id);
          	  resolve(response);
          	},function errorCallback(error) {
          		console.log("Registry edit Error");
          		console.log(JSON.stringify(error));
              reject(error.data);
          	});
        }
  });
};

var getProductDetails=function(scanCodeValue){
  return $q(function(resolve, reject) {
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
        if (token) {
            var link= API_ENDPOINT.baseUrl+'productbybarcode';
            var header='Bearer '+token;
           	$http({
          		method: 'GET',
          		url:link,
          		headers: {
                      		'Content-Type': 'application/json',
                           'Authorization': 'Bearer '+token
          		},
              params:{}
          		}).then(function successCallback(response) {
          		console.log("Scan detail Response");
          	  console.log(JSON.stringify(response));
          	  resolve(response);
          	},function errorCallback(error) {
          		console.log("Scan detail Error");
          		console.log(JSON.stringify(error));
              reject(error.data);
          	});
        }
  });
};

//To logout from app
  var logout = function() {
    destroyUserCredentials();
  };

  loadUserCredentials();

//To get product category
var loadCategory =function (){
  return $q(function(resolve, reject) {
      //console.log("Inside Category Service");
       $http({
          		method: 'GET',
          		url:API_ENDPOINT.baseUrl+'categories',
          		headers: {
                      		'Content-Type': 'application/json'
                  	}
    		}).then(function successCallback(response) {
          		//console.log("Category Response");
              //category=response.data.children_data;
          		//console.log(JSON.stringify(response));
              resolve(response);
    		},function errorCallback(error) {
          	//	console.log("Category Error");
          		//console.log(JSON.stringify(error));
              reject(JSON.stringify(error.data))
    	  });
    });
};


//To get product list
var getProductList = function(category_id,pageSize,currentPage){
     return $q(function(resolve, reject) {
       var parameter;
       var data = {
            'searchCriteria[filterGroups][0][filters][0][field]' : 'category_id',
            'searchCriteria[filterGroups][0][filters][0][value]' : category_id,
            'searchCriteria[filterGroups][0][filters][0][conditionType]': "eq"
         };

         console.log("category Id is:"+category_id);
      if(category_id){
              $http({
                  		method: 'GET',
                  		url: API_ENDPOINT.baseUrl+'products',
                  		headers: {
                              		'Content-Type': 'application/json'
                          	},
                      params: {"searchCriteria[pageSize]":pageSize,"searchCriteria[currentPage]":currentPage,'searchCriteria[filterGroups][0][filters][0][field]' : 'category_id',
                      'searchCriteria[filterGroups][0][filters][0][value]' : category_id,
                      'searchCriteria[filterGroups][0][filters][0][conditionType]': "eq"}
                    }).then(function successCallback(response) {
                    	//	console.log("Product Response with category");
                    		//console.log(JSON.stringify(response));
                        resolve(response);

                  		},function errorCallback(error) {
                    		console.log("Product Error");
                    		console.log(JSON.stringify(error));
                        reject(JSON.stringify(error.data));
           });
         }else{
           $http({
                   method: 'GET',
                   url: API_ENDPOINT.baseUrl+'products',
                   headers: {
                               'Content-Type': 'application/json'
                         },
                   params: {"searchCriteria[pageSize]":pageSize,"searchCriteria[currentPage]":currentPage}
                 }).then(function successCallback(response) {
                    //  console.log("Product Response without cat");
                    //  console.log(JSON.stringify(response));
                     resolve(response);

                   },function errorCallback(error) {
                    //  console.log("Product Error");
                    //  console.log(JSON.stringify(error));
                     reject(JSON.stringify(error.data));
        });
    }
});
};

//To


  return {
    login: login,
    logout: logout,
    getProductList: getProductList,
    loadCategory:loadCategory,
    register:register,
    editUserDetails:editUserDetails,
    getProvinceList:getProvinceList,
    getStores:getStores,
    createRegistry:createRegistry,
    getMyRegistry:getMyRegistry,
    addToRegistry:addToRegistry,
    getRegistryItems:getRegistryItems,
    deleteRegistryItem:deleteRegistryItem,
    editRegistryItem:editRegistryItem,
    getStoresLocator:getStoresLocator,
    editRegistry:editRegistry,
    getProductDetails:getProductDetails,
    username: function() {return username;},
    category:function(){return category;},
    regForm  :  function()  {return  regForm;}
  };
});
