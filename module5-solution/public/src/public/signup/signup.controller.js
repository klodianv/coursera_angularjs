(function () {
"use strict";

angular.module('public')
.controller('SignupController', SignupController);

SignupController.$inject = ['MenuService'];
function SignupController(MenuService) {
  var signup = this;
  signup.noMenuNumberExists = false;

  signup.submit = function () {
    signup.completed = true;

    var promise = MenuService.getMenuItem(signup.dishNumber);
    promise.then(function (response) {
      signup.noMenuNumberExists = false;
      MenuService.storeUserFavoriteMenuItem(signup);
    })
    .catch(function (error) {
      signup.noMenuNumberExists = true;
      MenuService.clearUserPreference();
    })
  };
}

})();
