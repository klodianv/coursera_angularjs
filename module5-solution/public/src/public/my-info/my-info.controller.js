(function () {
"use strict";

angular.module('public')
.controller('MyinfoController', MyinfoController);

MyinfoController.$inject = ['MenuService', 'ApiPath'];
function MyinfoController(MenuService, ApiPath) {
  var myinfo = this;
  myinfo.signedup = false;

  myinfo.firstname = MenuService.firstname;
  myinfo.lastname = MenuService.lastname;
  myinfo.email = MenuService.email;
  myinfo.phone = MenuService.phone;
  myinfo.dishNumber = MenuService.dishNumber;
  myinfo.dishDescr = '';
  myinfo.dishName = '';
  myinfo.basePath = ApiPath;

  if((myinfo.firstname === undefined) || (myinfo.firstname === '')
    || (myinfo.lastname === undefined) || (myinfo.lastname === '')
    || (myinfo.email === undefined) || (myinfo.email === '')) {
    myinfo.signedup = false;

  } else {
    myinfo.signedup = true;

    var promise = MenuService.getMenuItem(  myinfo.dishNumber);
    promise.then(function (response) {
      // console.log("Retrieved item: ", response);
      myinfo.dishName = response.name;
      myinfo.dishDescr = response.description;
    })
    .catch(function (error) {
      console.log("Caught error: ", error);
    })
  }
}

})();
