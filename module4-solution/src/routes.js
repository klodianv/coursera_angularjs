(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/');  // Redirect to home page if no other URL matches

  $stateProvider  // Set up UI states

  .state('home', {    // Home page
    url: '/',
    templateUrl: 'src/restaurant/home.restaurant.html'
  })

  .state('categories', {  // Menu Categories page
    url: '/categories-list',
    templateUrl: 'src/restaurant/categories.restaurant.html',
    controller: 'MenuCategoriesController as categoriesList',
    resolve: {
      categories: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories();
      }]
    }
  })

  .state('itemsState', {  // Menu Category Items page
    url: '/item-list/{categoryShortName}',
    templateUrl: 'src/restaurant/items.restaurant.html',
    controller: 'MenuItemsController as itemsList',
    params: {
       categoryShortName: null
    }
  });
}

})();
