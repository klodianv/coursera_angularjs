(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var items = this;
  items.toBuyItems = ShoppingListCheckOffService.getItemsToBuy();

  items.removeItem = function (itemIndex) {
    var removedItem = ShoppingListCheckOffService.removeToBuyItem(itemIndex);
    if(items.toBuyItems.length == 0) {
      items.allItemsBoughtMessage = 'Everything is bought!';
    }
    ShoppingListCheckOffService.addBoughtItem(removedItem[0].name, removedItem[0].quantity);
  };
}

AlreadyBoughtController.$inject = ['$scope', 'ShoppingListCheckOffService'];
function AlreadyBoughtController($scope, ShoppingListCheckOffService) {
  var items = this;
  items.boughtItems = ShoppingListCheckOffService.getItemsAlreadyBought();
  $scope.noItemBoughtYetMessage = ShoppingListCheckOffService.getNoItemsBoughtMsg();
  $scope.readNoItemsBoughtMsg = function () {
    $scope.noItemBoughtYetMessage = ShoppingListCheckOffService.getNoItemsBoughtMsg();
    return $scope.noItemBoughtYetMessage;
  };
}

function ShoppingListCheckOffService() {
  var service = this;
  var toBuyItems = [ {name: "sandwiches", quantity: 10},
                     {name: "hamburgers", quantity: 5},
                     {name: "pizzas", quantity: 3},
                     {name: "doughnuts", quantity: 15},
                     {name: "pancakes", quantity: 20} ];
  var boughtItems = [];  // List of 'Bought' items
  var noItemBoughtYetMessage = '';

  if(boughtItems.length == 0) {
    noItemBoughtYetMessage = 'Nothing bought yet!';
  }

  service.getItemsToBuy = function () {
    return toBuyItems;
  };

  service.getItemsAlreadyBought = function () {
    return boughtItems;
  };

  service.getNoItemsBoughtMsg = function () {
    return noItemBoughtYetMessage;
  };

  service.addBoughtItem = function (itemName, quantity) {
    var item = {
      name: itemName,
      quantity: quantity
    };
    boughtItems.push(item);
    if(boughtItems.length > 0) {
      noItemBoughtYetMessage = '';
    }
  };

  service.removeToBuyItem = function (itemIndex) {
    var removedItem = toBuyItems.splice(itemIndex, 1);
    return removedItem;
  };
}

})();
