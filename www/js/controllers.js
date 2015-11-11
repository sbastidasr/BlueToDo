angular.module('app.controllers', [])

.controller('todosCtrl', function($scope, ToDoService, $rootScope) {

  //init
  var ToDo = Parse.Object.extend('ToDo');
  $scope.todos = [];
  var query = new Parse.Query(ToDo);
  query.equalTo('owner',Parse.User.current());
  // get todos
  query.find({
    success: function(results) {
      $scope.$apply(function () { //apply to update bindings
        for(var i = 0; i < results.length; i++) {
          $scope.todos.push({
            text: results[i].get('text'),
            date: results[i].get('date'),
            done: results[i].get('done'),
            cloudObject: results[i]
          });
        }
      });
    }
  });

  $scope.updateDoneState = function(todo) {
    todo.cloudObject.set('done', todo.done);
    todo.cloudObject.save();
  }

  $scope.clearCompleted = function() {
    var tempToDos = $scope.todos;
    $scope.todos = [];
    angular.forEach(tempToDos, function(todo) {
      if(todo.done) {
        todo.cloudObject.destroy();
      } else {
        $scope.todos.push(todo);
      }
    });
  };
})

.controller('newToDoCtrl', function($scope,$rootScope,DateService) {
  $scope.options = DateService.getFutureDates();
  $scope.hostSelected = $scope.options[0];

  $scope.save = function() {
    var ToDo = Parse.Object.extend('ToDo');
    var todoItem = new ToDo();
    var date=DateService.dateFromIndex(this.options.indexOf(this.hostSelected));
    alert(this.options.indexOf(this.hostSelected));

    todoItem.save(
      {
        text:this.title,
        description:this.description,
        done:false,
        date: date,
        owner:Parse.User.current()
      },
      {
        success: function(obj) {
            window.history.back();
        }
      })
    }
  })

  .controller('loginCtrl', function($scope, $rootScope, $state) {
    $scope.data = {};
    $scope.signupEmail = function(){

      //Create a new user on Parse
      var user = new Parse.User();
      user.set('username', $scope.data.email);
      user.set('password', $scope.data.password);
      user.set('email', $scope.data.email);

      user.signUp(null, {
        success: function(user) {
          // Hooray! Let them use the app now.
          alert('success!');
        },
        error: function(user, error) {
          // Show the error message somewhere and let the user try again.
          alert('Error: ' + error.code + ' ' + error.message);
        }
      });
    };

    $scope.loginEmail = function(){
      Parse.User.logIn($scope.data.email, $scope.data.password, {
        success: function(user) {
          // Do stuff after successful login.
          console.log(user);
          $rootScope.user = user;

          alert('success!');
        },
        error: function(user, error) {
          // The login failed. Check error to see why.
          alert('error!');
        }
      });
    };

    // at the bottom of your controller
    var init = function () {

    };
    // and fire it after definition
    init();
  });
