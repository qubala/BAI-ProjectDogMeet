
angular.module('app', ['ionic', 'app.controllers', 'app.routes', 'app.services', 'app.directives','firebase'])
.config(function($ionicConfigProvider) {

    $ionicConfigProvider.scrolling.jsScrolling(false);
    $ionicConfigProvider.tabs.position('bottom'); 
})
.run(function($ionicPlatform,$rootScope) {

    $rootScope.extras = false;

  $ionicPlatform.ready(function() {

    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
