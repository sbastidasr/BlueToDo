angular.module('app.controllers', [])

.controller('todosCtrl', function($scope, $rootScope) {
  var currentUser = Parse.User.current();
  //debugger;
  if (currentUser) {
    //alert(currentUser.get('username'));
  } else {
    // show the signup or login page
  }
  $scope.items = [
     { id: 1 , checked:true},
     { id: 2 },
     { id: 3 },
     { id: 4 },
     { id: 5 },
     { id: 6 },
     { id: 7 },
     { id: 8 },
     { id: 9 },
     { id: 10 }
   ];

})

.controller('newToDoCtrl', function($scope,$rootScope,DateService) {
  $scope.options = DateService.getFutureDates();
  //debugger;
  $scope.hostSelected = $scope.options[0];

  $scope.save=function(mySelect) {
    var ToDo = Parse.Object.extend("ToDo");
    var toDo = new ToDo();
    var asd=this.title;
    var des=this.description;
    var date=DateService.dateFromIndex(this.options.indexOf(this.hostSelected));

    toDo.set('ditle', this.title);
    toDo.set('description', this.description);
    toDo.set('done', false);
    toDo.set('date', DateService.dateFromIndex(this.options.indexOf(this.hostSelected)));
    //Set user

    toDo.save(null, {
      success: function(toDo) {
        window.history.back();
      },
      error: function(toDo, error) {
        alert('Failed to create new object, with error code: ' + error.message);
      }
    });
  }

  //$scope.showSelectValue = function(mySelect) {
  //    $scope.hostSelected =mySelect
  //  }
})


.controller('loginCtrl', function($scope, $rootScope, $state) {
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
