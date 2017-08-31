angular.module('app.controllers', [])

.controller('loginCtrl', function($scope,$rootScope,$ionicHistory,sharedUtils,$state,$ionicSideMenuDelegate) {
    $rootScope.extras = false;  

    $scope.$on('$ionicView.enter', function(ev) {
      if(ev.targetScope !== $scope){
        $ionicHistory.clearHistory();
        $ionicHistory.clearCache();
      }
    });



    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {

        $ionicHistory.nextViewOptions({
          historyRoot: true
        });
        $ionicSideMenuDelegate.canDragContent(true); 
        $rootScope.extras = true;
        sharedUtils.hideLoading();
        $state.go('mainpage', {}, {location: "replace"});

      }
    });


    $scope.loginEmail = function(formName,cred) {

      try{
        if(formName.$valid) {  

            sharedUtils.showLoading();

            firebase.auth().signInWithEmailAndPassword(cred.email,cred.password).then(function(result) {


                $ionicHistory.nextViewOptions({
                  historyRoot: true
                });
                $rootScope.extras = true;
                sharedUtils.hideLoading();
                $state.go('mainpage', {}, {location: "replace"});

              },
              function(error) {
                sharedUtils.hideLoading();
                sharedUtils.showAlert("Please note","Authentication Error");
              }
          );

        }else{
          sharedUtils.showAlert("Please note","Entered data is not valid");
        }
      } catch(err){
        sharedUtils.hideLoading();
      }
      sharedUtils.hideLoading();
    };


})

.controller('signupCtrl', function($scope,$rootScope,sharedUtils,$ionicSideMenuDelegate,
                                   $state,fireBaseData,$ionicHistory) {
    $rootScope.extras = false; 

    $scope.signupEmail = function (formName, cred) {
      try{
        if (formName.$valid) { 

          sharedUtils.showLoading();

          firebase.auth().createUserWithEmailAndPassword(cred.email, cred.password).then(function (result) {

              result.updateProfile({
                displayName: cred.name,
                photoURL: "default_dp"
              }).then(function() {}, function(error) {});



  
              $ionicHistory.nextViewOptions({
                historyRoot: true
              });
              $ionicSideMenuDelegate.canDragContent(true);  
              $rootScope.extras = true;
              sharedUtils.hideLoading();
              $state.go('mainpage', {}, {location: "replace"});

          }, function (error) {
              sharedUtils.hideLoading();
              sharedUtils.showAlert("Please note","Sign up Error");
          });

        }else{
          sharedUtils.showAlert("Please note","Entered data is not valid");
        }
      } catch(err){
        sharedUtils.hideLoading();
      }
    sharedUtils.hideLoading();
    }

  })

.controller('doglistCtrl', function($scope,$rootScope,$ionicSideMenuDelegate,fireBaseData,$state,
                                  $ionicHistory,$firebaseArray,sharedFav,sharedUtils) {

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      $scope.user_info=user; 
    }else {

      $ionicSideMenuDelegate.toggleLeft(); 
      $ionicSideMenuDelegate.canDragContent(false);  

      $ionicHistory.nextViewOptions({
        historyRoot: true
      });
      $rootScope.extras = false;
      sharedUtils.hideLoading();
      $state.go('tabsController.login', {}, {location: "replace"});

    }
  });

  $ionicSideMenuDelegate.canDragContent(true);
  $rootScope.extras=true;

  $scope.$on('$ionicView.enter', function(ev) {
    if(ev.targetScope !== $scope){
      $ionicHistory.clearHistory();
      $ionicHistory.clearCache();
    }
  });



  $scope.loadMenu = function() {
    sharedUtils.showLoading();
    $scope.menu=$firebaseArray(fireBaseData.refMenu());
    sharedUtils.hideLoading();
  }

  $scope.showProductInfo=function (id) {

  };
  $scope.addToFavourites=function(item){
    sharedFav.add(item);
  };

})

.controller('adddogCtrl', function($scope,$rootScope, $state, fireBaseData) {


    $rootScope.extras=true;
    $scope.newDog = {
      
    }

    $scope.addDog = function() {
      var newnewDogRefStoreRef = fireBaseData.refMenu().push();
 
    newnewDogRefStoreRef.set({
          "name" : $scope.newDog.name,
          "breed" : $scope.newDog.breed,
          "size" : $scope.newDog.size,
          "gender" : $scope.newDog.gender,
          "age" : $scope.newDog.age,
          "pedigree" : $scope.newDog.pedigree,
          "image" : "dogIcon",
          "description" : $scope.newDog.description,
          "looking_for" : $scope.newDog.searching,
          "progeny" : $scope.newDog.progeny,
          "owners_name" : $scope.newDog.ownname,
          "phone" : $scope.newDog.telephone,
          "price" : $scope.newDog.price
        })     
      
       $state.go('doglist', {}, {location: "replace"});
    }
})

.controller('indexCtrl', function($scope,$rootScope,sharedUtils,$ionicHistory,$state,$ionicSideMenuDelegate,sharedFav) {

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        $scope.user_info=user; 

        $scope.get_total= function() {
          var total_qty=0;
          for (var i = 0; i < sharedFav.favo_items.length; i++) {
            total_qty += sharedFav.favo_items[i].dog_qty;
          }
          return total_qty;
        };

      }else {

        $ionicSideMenuDelegate.toggleLeft(); 
        $ionicSideMenuDelegate.canDragContent(false); 

        $ionicHistory.nextViewOptions({
          historyRoot: true
        });
        $rootScope.extras = false;
        sharedUtils.hideLoading();
        $state.go('tabsController.login', {}, {location: "replace"});

      }
    });

    $scope.logout=function(){

      sharedUtils.showLoading();


      firebase.auth().signOut().then(function() {


        $ionicSideMenuDelegate.toggleLeft(); 
        $ionicSideMenuDelegate.canDragContent(false);  

        $ionicHistory.nextViewOptions({
          historyRoot: true
        });


        $rootScope.extras = false;
        sharedUtils.hideLoading();
        $state.go('tabsController.login', {}, {location: "replace"});

      }, function(error) {
         sharedUtils.showAlert("Error","Logout Failed")
      });

    }

  })

.controller('favouritedogsCtrl', function($scope,$rootScope,$state,sharedFav) {

    $rootScope.extras=true;

    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {

        $scope.favo=sharedFav.favo_items;  

        $scope.get_qty = function() {
          $scope.total_qty=0;
          $scope.total_amount=0;

          for (var i = 0; i < sharedFav.favo_items.length; i++) {
            $scope.total_qty += sharedFav.favo_items[i].dog_qty;
            $scope.total_amount += (sharedFav.favo_items[i].dog_qty * sharedFav.favo_items[i].dog_price);
          }
          return $scope.total_qty;
        };
      }
    });

    $scope.removeFromFavourites=function(c_id){
      sharedFav.drop(c_id);
    };




})

.controller('mainpageCtrl', function($scope,$rootScope) {

    $rootScope.extras = true;

})

.controller('authorsCtrl', function($scope,$rootScope) {

    $rootScope.extras=true;

})

