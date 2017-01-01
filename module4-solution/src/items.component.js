(function () {
'use strict';

angular.module('data')
.component('itemsState', {
  templateUrl: 'src/restaurant/items.restaurant.html',
  bindings: {
    items: '<'
  }
});

})();
