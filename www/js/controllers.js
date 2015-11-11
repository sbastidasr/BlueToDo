angular.module('app.controllers', [])

.controller('todosCtrl', function($scope,$window,$location,ToDoService, $rootScope) {
  if(!Parse.User.current()){
    $window.location.href = '#/login';
  }

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
  $scope.logOut=function(){
    console.log('logout');
    Parse.User.logOut();
    $window.location.href = '#/logIn';
  }
  $scope.updateDoneState = function(todo) {
    todo.cloudObject.set('done', todo.done);
    todo.cloudObject.save();
  }
  $scope.show =function (){
var ret=false;
    angular.forEach($scope.todos, function(todo) {
      if(todo.done) {
        ret= true;
    }
  });
    return ret;
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

.controller('newToDoCtrl', function($scope,$window,$rootScope,DateService) {
  if(!Parse.User.current()){
    $window.location.href = '#/login';

  }

  $scope.options = DateService.getFutureDates();
  $scope.hostSelected = $scope.options[0];

  $scope.save = function() {
    var ToDo = Parse.Object.extend('ToDo');
    var todoItem = new ToDo();
    var date=DateService.dateFromIndex(this.options.indexOf(this.hostSelected));
    console.log(this.options.indexOf(this.hostSelected));

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
            $window.location.href = '#/todos';
            $window.location.reload();
        }
      })
    }

  })

  .controller('loginCtrl', function($scope, $window, $location, $rootScope, $state) {
    $scope.data = {};

    if(Parse.User.current()){
      $window.location.href = '#/todos';
      $window.location.reload();
    }

    $scope.signupEmail = function(){
      //Create a new user on Parse
      var user = new Parse.User();
      user.set('username', $scope.data.email);
      user.set('password', $scope.data.password);
      user.set('email', $scope.data.email);

      user.signUp(null, {
        success: function(user) {
            console.log('logged');
            $window.location.href = '#/todos';
            $window.location.reload();
        },
        error: function(user, error) {
          // Show the error message somewhere and let the user try again.
          console.log('Error: ' + error.code + ' ' + error.message);
        }
      });
    };


    $scope.loginEmail = function(){
      Parse.User.logIn($scope.data.email, $scope.data.password, {
        success: function(user) {
          // Do stuff after successful login.
          console.log(user);
          console.log('logged');
          $window.location.href = '#/todos';
          $window.location.reload();
        },
        error: function(user, error) {
          // The login failed. Check error to see why.
          console.log('error!');
        }
      });
    };


  });
