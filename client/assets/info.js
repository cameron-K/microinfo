microInfo.factory('infoFactory',function($http){
  var factory={};
  factory.getEmails=function(user_id,callback){
    $http.post('/emails',{user_id:user_id}).success(function(data){
      callback(data);
    });
  };
  factory.getPhones=function(user_id,callback){
    $http.post('/phones',{user_id:user_id}).success(function(data){
      callback(data);
    });
  };
  factory.getSocials=function(user_id,callback){
    $http.post('/socials',{user_id:user_id}).success(function(data){
      callback(data);
    });
  };

  factory.addEmail=function(email){
    // console.log(current_user);
    $http.post('/email',email);
  }
  factory.addPhone=function(phone){
    // console.log(current_user);
    $http.post('/phone',phone);
  }
  factory.addSocial=function(social){
    // console.log(current_user);
    $http.post('/social',social);
  }

  factory.updateEmail=function(email){
    $http.post('/updateEmail',email);
  }
  factory.deleteEmail=function(email){
    $http.post('/deleteEmail',email);
  }
  return factory;
});

microInfo.controller('infoController',function($scope,infoFactory){
  $scope.emails=[];
  $scope.phones=[];
  $scope.socials=[];
  $scope.profiles=[];
  $scope.new_profile={
    emails:[],
    phones:[],
    socials:[]
  };

  $scope.enableCreateProfile=function(){
    $scope.createProfileEnabled=!$scope.createProfileEnabled;
  }
  $scope.updateNewProfile=function(type,info_object){
    var index=$scope.new_profile[type].indexOf(info_object);
    console.log('index '+index);
    console.log($scope.new_profile[type][index]);
    if(index>=0){
      $scope.new_profile[type].splice(index,1);
    }
    else{
      $scope.new_profile[type].push(info_object);
    }
    // console.log(type);
    // console.log(info_object);
    console.log($scope.new_profile[type]);
  }


  $scope.new_email={};
  $scope.current_user=current_user;

  getEmails();
  getPhones();
  getSocials();

  function getEmails(){
    $scope.emails=[];
    infoFactory.getEmails(current_user._id,function(data){
      $scope.emails=data.emails;
    })
  }

  function getPhones(){
    $scope.phones=[];
    infoFactory.getPhones(current_user._id,function(data){
      $scope.phones=data.phones;
    })
  }

  function getSocials(){
    $scope.socials=[];
    infoFactory.getSocials(current_user._id,function(data){
      $scope.socials=data.socials;
    })
  }

  $scope.updateEmail=function(email){
    console.log(email);
    email.user_id=current_user._id;
    infoFactory.updateEmail(email);
  }

  $scope.deleteEmail=function(email){
    $scope.emails.splice($scope.emails.indexOf(email),1);
    email.user_id=current_user._id;
    infoFactory.deleteEmail(email);
  }


  $scope.addEmail=function(){
    $scope.emails.push($scope.new_email);
    $scope.new_email.user_id=current_user._id;
    infoFactory.addEmail($scope.new_email);
    $scope.new_email={};
  }
  $scope.addPhone=function(){
    $scope.phones.push($scope.new_phone);
    $scope.new_phone.user_id=current_user._id;
    infoFactory.addPhone($scope.new_phone);
    $scope.new_phone={};
  }
  $scope.addSocial=function(){
    $scope.socials.push($scope.new_social);
    $scope.new_social.user_id=current_user._id;
    infoFactory.addSocial($scope.new_social);
    $scope.new_social={};
  }

  $scope.createProfile=function(){
    $scope.profiles.push($scope.new_profile);
    console.log($scope.profiles);
    $scope.enableCreateProfile();
    $scope.new_profile={
      emails:[],
      phones:[],
      socials:[]
    };
  }


})
