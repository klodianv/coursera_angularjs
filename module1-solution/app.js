(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {
  $scope.dishes = "";
  $scope.numberOfDishes = -1;
  $scope.customColor = "white";
  $scope.customBorder = "textboxBorderNone";

  $scope.lunchMessage = function () {
    if(($scope.numberOfDishes == 0) && ($scope.dishes == "")) {
      $scope.customColor = "red";
      $scope.customBorder = "textboxBorderRed";
      return "Please enter data first";
    }
    else if(($scope.numberOfDishes <= 3) && ($scope.numberOfDishes > 0)) {
      $scope.customColor = "green";
      $scope.customBorder = "textboxBorderGreen";
      return "Enjoy!";
    }
    else if ($scope.numberOfDishes > 3) {
      $scope.customColor = "green";
      $scope.customBorder = "textboxBorderGreen";
      return "Too much!";
    }
  };

  $scope.checkNrOfDishes = function () {
    var comma = ',';
    if($scope.dishes != "") {
      var arrayOfDishes = $scope.dishes.split(comma);
      $scope.numberOfDishes = arrayOfDishes.length;
    }
    else {
      $scope.numberOfDishes = 0;
    }
  };
}

})();
