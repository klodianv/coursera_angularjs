(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItemsDirective);

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var menu = this;
  menu.searchTerm = "";
  menu.found = null;

  menu.noItemsFoundMessage = "";
  menu.readNoItemsFoundMsg = function () {
    if(((menu.found !== null) && (menu.found.length > 0)) || (menu.found === null)) {
      menu.noItemsFoundMessage = "";
    } else {
      menu.noItemsFoundMessage = "Nothing found";
    }
    return menu.noItemsFoundMessage;
  };

  menu.getItems = function (searchTerm) {
    if((searchTerm === null) || (searchTerm === "")) {
      menu.found = new Array();
      return menu.found;
    }
    var promise = MenuSearchService.getMatchedMenuItems(searchTerm);

    promise.then(function (response) {
      menu.found = response;
    })
    .catch(function (error) {
      console.log(error);
    })
  };

  menu.removeItem = function (itemIndex) {
    if((menu.found !== null) && (menu.found.length > 0)) {
      menu.found.splice(itemIndex, 1);
    }
  };
}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    return $http(
      {
        method: "GET",
        url: (ApiBasePath + "/menu_items.json")
      }

    ).then(function (result) { // process result and only keep items that match
      var foundItems = new Array();
      var dataLength = result.data.menu_items.length;
      for (var itemIdx = 0; itemIdx < dataLength; itemIdx++) {
        if(result.data.menu_items[itemIdx].description.toUpperCase().indexOf(searchTerm.toUpperCase()) !== -1) {
          // console.log("Found item: ", result.data.menu_items[itemIdx].name);
          foundItems.push(result.data.menu_items[itemIdx]);
        }
      }
      return foundItems;  // return processed items
    });
  };
}

function FoundItemsDirective() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      onRemove: '&'
    },
    controller: NarrowItDownController,
    controllerAs: 'menu',
    bindToController: true,
    transclude: true
  };
  return ddo;
}

})();
