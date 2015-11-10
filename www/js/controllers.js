angular.module('app.controllers', [])

.controller('todosCtrl', function($scope,$rootScope,UserServices) {
  var currentUser = Parse.User.current();
  //debugger;
  if (currentUser) {
    //alert(currentUser.get('username'));
  } else {
    // show the signup or login page
  }
})

.controller('newToDoCtrl', function($scope,$rootScope,UserServices) {
  $scope.options = ['a','b','c'];
  $scope.hostSelected = $scope.options[0];

  $scope.save=function(mySelect) {
    console.log($scope.hostSelected)
  }

  $scope.showSelectValue = function(mySelect) {
    $scope.hostSelected =mySelect
  }
})


.controller('loginCtrl', function($scope, $rootScope, UserServices, $state) {
  $scope.data = {};
  $scope.signupEmail = function(){

    //Create a new user on Parse
    var user = new Parse.User();
    user.set("username", $scope.data.email);
    user.set("password", $scope.data.password);
    user.set("email", $scope.data.email);

    user.signUp(null, {
      success: function(user) {
        // Hooray! Let them use the app now.
        alert("success!");
      },
      error: function(user, error) {
        // Show the error message somewhere and let the user try again.
        alert("Error: " + error.code + " " + error.message);
      }
    });
  };

  $scope.loginEmail = function(){
    Parse.User.logIn($scope.data.email, $scope.data.password, {
      success: function(user) {
        // Do stuff after successful login.
        console.log(user);
        $rootScope.user = user;

        alert("success!");
      },
      error: function(user, error) {
        // The login failed. Check error to see why.
        alert("error!");
      }
    });
  };

  // at the bottom of your controller
  var init = function () {

  };
  // and fire it after definition
  init();
});
