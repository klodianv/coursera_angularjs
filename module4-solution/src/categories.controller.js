(function () {
'use strict';

angular.module('data')
.controller('MenuCategoriesController', MenuCategoriesController);

MenuCategoriesController.$inject = ['MenuDataService', 'categories'];
function MenuCategoriesController(MenuDataService, categories) {
  var categoriesList = this;
  categoriesList.categories = categories;
}

})();
