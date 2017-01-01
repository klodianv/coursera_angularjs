(function () {
'use strict';

angular.module('data')
.component('categories', {
  templateUrl: 'src/restaurant/categories.restaurant.html',
  bindings: {
    items: '<'
  }
});

})();
