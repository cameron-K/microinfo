var microInfo=angular.module('microInfo',['ngRoute']);
microInfo.config(function($routeProvider){
  $routeProvider
  .when('/',{templateUrl:'/partials/home.html'})
  .when('/home',{templateUrl: '/partials/home.html'})
  .when('/new',{templateUrl: '/partials/newUser.html'})
  .when('/info',{templateUrl: '/partials/addinfo.html'})
  .when('/login',{templateUrl: '/partials/logreg.html'})
  .when('/profiles',{templateUrl:'/partials/profiles.html'})
  .otherwise({
    redirectTo:'/'
  })
})

var current_user={};

microInfo.factory('homeFactory',function($http){
  var factory={};
  factory.getConnects=function(user_id,callback){
    $http({
      url:'/connections',
      method:'GET',
      params:{user_id:user_id}
    }).success(function(connects){
      callback(connects);
    })
  }

  factory.getInfo=function(callback){
    $http.get('/users').success(function(user){
      callback(user);
    })
  }
  return factory;
});

microInfo.controller('homeController',function($scope,homeFactory){
  // $scope.user={};
  // homeFactory.getInfo(function(user){
  //   $scope.user=user;
  // })
  $scope.user=current_user;
})




microInfo.factory('userFactory',function($http,$location){
  var factory={};
  factory.newUser=function(user){
    console.log(user);
    $http.post('/users',user);

  },

  factory.logInUser=function(user){
    $http.post('/login',user).success(function(data){
      current_user=data;
      console.log(data);
      $location.path('/home');
    });
  }

  return factory;
})

microInfo.controller('userController',function($scope,userFactory){
  $scope.all_users=[];
  $scope.newUser=function(){
    console.log('usercontroller add');
    userFactory.newUser($scope.new_user);
    $scope.new_user={};
  }

  $scope.logInUser=function(){
    userFactory.logInUser($scope.user);
    $scope.user={};
  }
})
