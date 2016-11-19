angular.module('starter')


.service('AuthService', function($q, $http,API_ENDPOINT,USER_DETAILS,$cordovaToast) {
  var LOCAL_TOKEN_KEY = 'yourTokenKey';

//to get user saved token from app memory
  var loadUserCredentials= function() {
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
    if (token) {
      return true;
    }else{
      return false;
    }
  };

//To save user token in app memory
  function storeUserCredentials(token) {
    window.localStorage.setItem(LOCAL_TOKEN_KEY, token);
  }


//To get User authentication token
var register = function(firstname,lastname,email, pw) {
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
            resolve(login(email,pw));
        	},function errorCallback(error) {
                    reject(error);
        	});
      });
    };


//To get User authentication token
  var login = function(name, pw) {
    return $q(function(resolve, reject) {
      	var data = {
      		   username : name,
      		   password : pw
      		};
        var link =API_ENDPOINT.baseUrl+'integration/customer/token';
        $http.post(link,data).then(function successCallback(response) {
                storeUserCredentials(response.data);
                resolve(loadUserDetails());
      	},function errorCallback(error) {
                  reject(error);
      	});
    });
  };

//To get User Details after getting token
var loadUserDetails=function() {
  return $q(function(resolve, reject) {
    var token = window.localStorage.getItem(LOCAL_TOKEN_KEY);
        if (token) {
            var link= API_ENDPOINT.baseUrl+'customers/me';
            var header='Bearer '+token;
           	$http({
          		method: 'GET',
          		url:link,
          		headers: {
                      		'Content-Type': 'application/json',
                           'Authorization': 'Bearer '+token
          		}
          		}).then(function successCallback(response) {
              window.localStorage.setItem(USER_DETAILS.firstname,response.data.firstname);
              window.localStorage.setItem(USER_DETAILS.lastname,response.data.lastname);
              window.localStorage.setItem(USER_DETAILS.email,response.data.email);
          	  resolve(response);
          	},function errorCallback(error) {
          		console.log("Customer Error");
          		console.log(JSON.stringify(error));
              reject(error.data);
          	});
        }
  });
};

//To get product category
var loadCategory =function (){
  return $q(function(resolve, reject) {
       $http({
          		method: 'GET',
          		url:API_ENDPOINT.baseUrl+'categories',
          		headers: {
                      		'Content-Type': 'application/json'
                  	}
    		}).then(function successCallback(response) {
              resolve(response);
    		},function errorCallback(error) {
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
                        resolve(response);

                  		},function errorCallback(error) {
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
                    resolve(response);

                   },function errorCallback(error) {
                     reject(JSON.stringify(error.data));
        });
    }
});
};

  return {
    login: login,
    getProductList: getProductList,
    loadCategory:loadCategory,
    register:register,
    loadUserCredentials:loadUserCredentials,
    username: function() {return username;},
    category:function(){return category;},
  };
});
