angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {
  
  $stateProvider



  .state('tabsController', {
    url: '/page1',
    templateUrl: 'templates/tabsController.html',
    abstract:true
  })

  .state('tabsController.login', {
    url: '/page5',
    views: {
      'tab1': {
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      }
    }
  })

  .state('tabsController.signup', {
    url: '/page6',
    views: {
      'tab3': {
        templateUrl: 'templates/signup.html',
        controller: 'signupCtrl'
      }
    }
  })

  .state('doglist', {
      url: '/page7',
      templateUrl: 'templates/doglist.html',
      controller: 'doglistCtrl'
    })


  .state('adddog', {
    url: '/page8',
    templateUrl: 'templates/adddog.html',
    controller: 'adddogCtrl'
  })

  .state('favouritedogs', {
    url: '/page9',
    templateUrl: 'templates/favouritedogs.html',
    controller: 'favouritedogsCtrl'
  }) 

  .state('mainpage', {
    url: '/page10',
    templateUrl: 'templates/mainpage.html',
    controller: 'mainpageCtrl'
  })

  .state('authors', {
    url: '/page13',
    templateUrl: 'templates/authors.html',
    controller: 'authorsCtrl'
  })



$urlRouterProvider.otherwise('/page1/page5')



});
