angular.module('app.services', [])


.factory('fireBaseData', function($firebase) {
	var ref = new Firebase("https://dogmeet-9bccf.firebaseio.com/"),
    refFavDogs = new Firebase("https://dogmeet-9bccf.firebaseio.com/favourites"),
    refUser = new Firebase("https://dogmeet-9bccf.firebaseio.com/users"),
    refMenu = new Firebase("https://dogmeet-9bccf.firebaseio.com/menu");
  return {
    ref: function() {
      return ref;
    },
    refFavDogs: function() {
      return refFavDogs;
    },
    refUser: function() {
      return refUser;
    },
    refMenu: function() {
      return refMenu;
    }
  }
})


.factory('sharedUtils',['$ionicLoading','$ionicPopup', function($ionicLoading,$ionicPopup){


    var functionObj={};

    functionObj.showLoading=function(){
      $ionicLoading.show({
        content: '<i class=" ion-loading-c"></i> ', 
        animation: 'fade-in', 
        showBackdrop: true, 
        maxWidth: 200, 
        showDelay: 0 
      });
    };
    functionObj.hideLoading=function(){
      $ionicLoading.hide();
    };


    functionObj.showAlert = function(title,message) {
      var alertPopup = $ionicPopup.alert({
        title: title,
        template: message
      });
    };

    return functionObj;

}])




  .factory('sharedFav', ['$ionicPopup','fireBaseData','$firebaseArray',function($ionicPopup, fireBaseData, $firebaseArray){

    var uid ;

    var favo={};


    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        uid=user.uid;
        favo.favo_items = $firebaseArray(fireBaseData.refFavDogs().child(uid));
      }
    });




    //dodanie do ulubionych
    favo.add = function(item) {
    
      fireBaseData.refFavDogs().child(uid).once("value", function(snapshot) {

        if( !snapshot.hasChild(item.$id) ){
        
          fireBaseData.refFavDogs().child(uid).child(item.$id).set({   
            dog_name: item.name,
            dog_breed: item.breed,
            dog_size: item.size,
            dog_gender: item.gender,
            dog_age: item.age,
            dog_pedigree: item.pedigree,
            dog_description: item.description,
            dog_looking_for: item.looking_for,
            dog_progeny: item.progeny,
            dog_owners_name: item.owners_name,
            dog_image: item.image,
            dog_phone: item.phone,
            dog_price: item.price,
            dog_qty: 1
          });
        }
      });
    };

    favo.drop=function(item_id){
      fireBaseData.refFavDogs().child(uid).child(item_id).remove();
    };

    return favo;
  }])



.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}]);

