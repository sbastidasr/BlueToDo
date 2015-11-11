var app=angular.module('app.routes', [])

app.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    })
    .state('todos', {
      url: '/todos',
      templateUrl: 'templates/todos.html',
      controller: 'todosCtrl'
    })

    .state('newToDo', {
      url: '/newToDo',
      templateUrl: 'templates/newToDo.html',
      controller: 'newToDoCtrl'
    })

    .state('signup', {
      url: '/signup',
      templateUrl: 'templates/signup.html',
      controller: 'loginCtrl'
    })


    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
