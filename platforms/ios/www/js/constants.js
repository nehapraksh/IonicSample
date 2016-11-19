angular.module('starter')

.constant('API_ENDPOINT', {
  baseUrl: 'http://138.68.80.175/',
  apiUrl:'rest/V1/',
  imageUrl:'pub/media/catalog/product'
})
.constant('USER_DETAILS', {
  firstname: 'firstName',
  lastname:'lastName',
  email:'email',
  id:'id',
  registry:'registry'
})
.constant('PAGE_SIZE',{
  pageSize:'10'
});
