microInfo.factory('profileFactory',function($http){
  var factory={};
  factory.getProfiles=function(user_id,callback){
    $http.post('/profiles',{user_id:user_id}).success(function(data){
      callback(data);
    });
  }

  return factory;
})

microInfo.controller('profileController',function($scope,profileFactory){
  function getProfiles(){
    $scope.profiles=[];
    profileFactory.getProfiles(current_user._id,function(data){
      $scope.profiles=data;
    })
  }

  getProfiles();
})
