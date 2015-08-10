microInfo.factory('connectionsFactory',function($http){
  var factory={};

  factory.getConnections=function(callback){
    var connections=current_user.connections;
    $http.post('/showConnections',{connections:connections}).success(function(connections){
      callback(connections);
    })

  }
  return factory;
})


microInfo.controller('connectionsController',function($scope,connectionsFactory){
  $scope.connections=[];
  getConnections();
  function getConnections(){
    connectionsFactory.getConnections(function(connections){
      $scope.connections=connections;
    })
  }
})
