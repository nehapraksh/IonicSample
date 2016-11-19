angular.module('starter')

.constant('API_ENDPOINT', {
  serverUrl: 'http://magentoapi.ipragmatech.com/',
  apiUrl:'rest/V1/',
  baseUrl:'http://magentoapi.ipragmatech.com/rest/V1/',
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
