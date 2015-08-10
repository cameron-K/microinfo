var microInfo=angular.module('microInfo',['ngRoute']);
microInfo.config(function($routeProvider){
  $routeProvider
  .when('/',{templateUrl:'/partials/home.html'})
  .when('/home',{templateUrl: '/partials/home.html'})
  .when('/new',{templateUrl: '/partials/newUser.html'})
  .when('/info',{templateUrl: '/partials/addinfo.html'})
  .when('/login',{templateUrl: '/partials/logreg.html'})
  .when('/profiles',{templateUrl:'/partials/profiles.html'})
  .when('/connections',{templateUrl:'/partials/connections.html'})
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
      // console.log(data);
      $location.path('/home');
    });
  }

  factory.searchName=function(search,callback){
    $http.post('/searchAllUsers',{search:search}).success(function(users){
      callback(users);
    });
  }

  factory.requestConnection=function(connection){
    $http.post('/connectionRequested',connection);
  }

  factory.getRequests=function(user_id,callback){
    $http.post('/getConnectionRequests',{user_id:user_id}).success(function(requests){
      callback(requests);
    });
  }

  return factory;
})

microInfo.controller('userController',function($scope,userFactory,infoFactory){
  $scope.search_results=[];
  $scope.requests=[];
  $scope.search="";
  $scope.profiles=new Array();
  $scope.new_connection={};
  $scope.createConnectionEnabled=false;

  if(current_user._id){
    userFactory.getRequests(current_user._id,function(requests){
      $scope.requests=requests;
      console.log(requests);

      infoFactory.getProfiles(current_user._id,function(data){
        $scope.profiles=data;
        
        
      })

    })
  }
  


  $scope.newUser=function(){
    userFactory.newUser($scope.new_user);
    $scope.new_user={};
  }

  $scope.logInUser=function(){
    userFactory.logInUser($scope.user);
    $scope.user={};
  }

  $scope.searchName=function(){
    console.log($scope.search.length);
    if($scope.search.length!=0){
      userFactory.searchName($scope.search,function(data){
        $scope.search_results=data;
        console.log($scope.search_results);
      })
    }
    else{
      $scope.search_results=[];
    }
  }
  function enableCreateConnection(){
    $scope.createConnectionEnabled=!$scope.createConnectionEnabled;
  }
  $scope.beginConnectionRequest=function(connection_id){

    $scope.new_connection.connection_id=connection_id;
    // $scope.new_connection.current_user_id=current_user._id;

    
      enableCreateConnection();
    
  }

  $scope.finishConnectionRequest=function(connection){
    console.log(connection);
    userFactory.requestConnection(connection);
    enableCreateConnection();
  }





})
