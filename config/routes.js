module.exports=function(app){
  var users=require('../server/controllers/users.js');

  // app.get('/users',function(req,res){
  //   users.show(req,res);
  // });
  app.post('/login',function(req,res){
    users.show(req,res);
  });

  app.post('/users',function(req,res){
    users.add(req,res);
  })

  app.get('/connections',function(req,res){
    //get the user from req
    //pass user connection array to profiles.js and find the corresponding profiles
  })

  app.get('/profiles',function(req,res){
    //get user
    //pass user profiles array etc...
  })


  //get users info
  app.post('/emails',function(req,res){
    users.getEmails(req,res);
  })

  app.post('/phones',function(req,res){
    users.getPhones(req,res);
  })

  app.post('/socials',function(req,res){
    users.getSocials(req,res);
  })


  //add user info
  app.post('/email',function(req,res){
    users.addEmail(req,res);
  })

  app.post('/phone',function(req,res){
    users.addPhone(req,res);
  })

  app.post('/social',function(req,res){
    users.addSocial(req,res);
  })

  //update
  app.post('/updateEmail',function(req,res){
    users.updateEmail(req,res);
  })

  //deleteEmail
  app.post('/deleteEmail',function(req,res){
    users.deleteEmail(req,res);
  })

  //profiles
  app.post('/profiles',function(req,res){
    profiles.getProfiles(req,res);
  })


}
