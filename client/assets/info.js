microInfo.factory('infoFactory',function($http){
  var factory={};

  //********************GET************************
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

//********************ADD************************

  factory.addEmail=function(email){
    $http.post('/email',email);
  }
  factory.addPhone=function(phone){
    $http.post('/phone',phone);
  }
  factory.addSocial=function(social){
    $http.post('/social',social);
  }

//********************UPDATE************************
  factory.updateEmail=function(email){
    $http.post('/updateEmail',email);
  }
  factory.updatePhone=function(phone){
    $http.post('/updatePhone',phone);
  }
  factory.updateSocial=function(social){
    $http.post('/updateSocial',social);
  }


  //********************DELETE************************
  factory.deleteEmail=function(email){
    $http.post('/deleteEmail',email);
  }
  factory.deletePhone=function(phone){
    $http.post('/deletePhone',phone);
  }
  factory.deleteSocial=function(social){
    $http.post('/deleteSocial',social);
  }

  //********************PROFILE************************

  factory.getProfiles=function(user_id,callback){
    $http.post('/profiles',{user_id:user_id}).success(function(data){
      callback(data);
      // console.log(data);
    })
  }

  factory.createProfile=function(profile){
    $http.post('/createProfile',profile);
  }
  return factory;
});

microInfo.controller('infoController',function($scope,infoFactory){
  $scope.emails=[];
  $scope.phones=[];
  $scope.socials=[];
  $scope.profiles=new Array();

  $scope.new_profile={
    emails:[],
    phones:[],
    socials:[]
  };

  $scope.new_email={};
  $scope.current_user=current_user;

  getEmails();
  getPhones();
  getSocials();
  getProfiles();

  $scope.enableCreateProfile=function(){
    $scope.createProfileEnabled=!$scope.createProfileEnabled;
    clearCheckBoxes();
  }

  function clearCheckBoxes(){
    angular.forEach($scope.emails,function(email){
      email.selected=false;
    })
    angular.forEach($scope.phones,function(phone){
      phone.selected=false;
    })
    angular.forEach($scope.socials,function(social){
      social.selected=false;
    })
  }


  $scope.createProfile=function(){
    for(email in $scope.emails){
      if($scope.emails[email].selected){
        $scope.new_profile.emails.push($scope.emails[email]);
      }
    }

    for(phone in $scope.phones){
      if($scope.phones[phone].selected){
        $scope.new_profile.phones.push($scope.phones[phone]);
      }
    }

    for(social in $scope.socials){
      if($scope.socials[social].selected){
        $scope.new_profile.socials.push($scope.socials[social]);
      }
    }
    $scope.new_profile.first_name=current_user.first_name;
    $scope.new_profile.last_name=current_user.last_name;
    $scope.profiles.push($scope.new_profile);
    $scope.new_profile.user_id=current_user._id;
    infoFactory.createProfile($scope.new_profile);

    $scope.enableCreateProfile();
    $scope.new_profile={
      emails:[],
      phones:[],
      socials:[]
    };
  }

  function getEmails(){
    $scope.emails=[];
    infoFactory.getEmails(current_user._id,function(data){
      $scope.emails=data.emails;
      for(email in $scope.emails){
        $scope.emails[email].selected=false;
      }
    })
  }

  function getPhones(){
    $scope.phones=[];
    infoFactory.getPhones(current_user._id,function(data){
      $scope.phones=data.phones;
      for(phone in $scope.phones){
        $scope.phones[phone].selected=false;
      }
    })
  }

  function getSocials(){
    $scope.socials=[];
    infoFactory.getSocials(current_user._id,function(data){
      $scope.socials=data.socials;
      console.log($scope.socials);
      for(social in $scope.socials){
        $scope.socials[social].selected=false;
      }
    })
  }

  function getProfiles(){
    $scope.profiles=new Array();
    infoFactory.getProfiles(current_user._id,function(data){
      $scope.profiles=data;
      console.log($scope.profiles);
    })
  }


// ******************UPDATE*************
  $scope.updateEmail=function(email){
    console.log(email);
    email.user_id=current_user._id;
    infoFactory.updateEmail(email);
  }

  $scope.updatePhone=function(phone){
    console.log(phone);
    phone.user_id=current_user._id;
    infoFactory.updatePhone(phone);
  }

  $scope.updateSocial=function(social){
    console.log(social);
    social.user_id=current_user._id;
    infoFactory.updateSocial(social);
  }


// ******************DELETE*************
  $scope.deleteEmail=function(email){
    $scope.emails.splice($scope.emails.indexOf(email),1);
    email.user_id=current_user._id;
    infoFactory.deleteEmail(email);
  }

  $scope.deletePhone=function(phone){
    $scope.phones.splice($scope.phones.indexOf(phone),1);
    phone.user_id=current_user._id;
    infoFactory.deletePhone(phone);
  }

  $scope.deleteSocial=function(social){
    $scope.socials.splice($scope.socials.indexOf(social),1);
    social.user_id=current_user._id;
    infoFactory.deleteSocial(social);
  }

// ******************ADD*************
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
})
