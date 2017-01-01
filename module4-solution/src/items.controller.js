(function () {
'use strict';

angular.module('data')
.controller('MenuItemsController', MenuItemsController);

MenuItemsController.$inject = ['MenuDataService', '$stateParams'];
function MenuItemsController(MenuDataService, $stateParams) {
  var itemsList = this;
  itemsList.categoryName = $stateParams.categoryShortName;
  var retrievedItems = MenuDataService.getItemsForCategory(itemsList.categoryName);
  retrievedItems.then(function (response) {
      itemsList.items = response;
  })
  .catch(function (error) {
    console.log(error);
  })
}

})();
