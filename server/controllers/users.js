module.exports=(function(){
  var mongoose=require('mongoose');
  var User=mongoose.model('User');
  var Profile=mongoose.model('Profile');

  return{
    show:function(req,res){
      console.log('req.fn '+req.body.first_name);
      User.findOne({first_name:req.body.first_name},function(err,results){
        if(err){
          console.log(err);
        }
        else{
          res.json(results);
        }
      })
    },
    searchAllUsers:function(req,res){
      var terms=req.body.search.split(' ');
      if(terms.length>1){
        User.find({first_name:new RegExp(terms[0]),last_name:new RegExp(terms[1])},function(err,results){
          if(err){
            console.log(err);
          }
          else{
            res.json(results);
          }
        });
      }
      else if(terms.length==1){
        User.find({$or:[{first_name:new RegExp(terms[0])},{last_name:new RegExp(terms[0])}]},function(err,results){
          if(err){
            console.log(err);
          }
          else{
            res.json(results);
          }
        })
      }
    },
    add:function(req,res){
      var new_user=new User({
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        password:req.body.password,
        emails:{
          name:'Primary',
          email:req.body.email
        },
        phones:{
          name:'Primary',
          phone:req.body.phone
        }
      }).save(function(err){
        if(err){
          console.log(err);
        }
        else{
          console.log('users.js- user added');
          res.sendStatus(200);
        }
      })
    },
    getEmails:function(req,res){
      User.findOne({_id:req.body.user_id},'emails -_id',function(err,results){
        if(err){
          console.log(err);
        }
        else{
          console.log(results);
          res.json(results);
        }
      });
    },
    getPhones:function(req,res){
      User.findOne({_id:req.body.user_id},'phones -_id',function(err,results){
        if(err){
          console.log(err);
        }
        else{
          res.json(results);
        }
      });
    },
    getSocials:function(req,res){
      User.findOne({_id:req.body.user_id},'socials -_id',function(err,results){
        if(err){
          console.log(err);
        }
        else{
          res.json(results);
        }
      });
    },
    addEmail:function(req,res){
      var new_email={
        name:req.body.name,
        email:req.body.email
      };
      var user_id=req.body.user_id;

      User.findByIdAndUpdate(
        user_id,
        {$push:{emails:new_email}},
        {safe:true,upsert:true},
        function(err,result){
          if (err){
            console.log(err);
          }
          else{
            res.sendStatus(200);
          }
        }
      )
    },
    addPhone:function(req,res){
      var new_phone={
        name:req.body.name,
        phone:req.body.phone
      };
      var user_id=req.body.user_id;

      User.findByIdAndUpdate(
        user_id,
        {$push:{phones:new_phone}},
        {safe:true,upsert:true},
        function(err,result){
          if (err){
            console.log(err);
          }
          else{
            res.sendStatus(200);
          }
        }
      )
    },
    addSocial:function(req,res){
      var new_social={
        name:req.body.name,
        link:req.body.social
      };
      var user_id=req.body.user_id;

      User.findByIdAndUpdate(
        user_id,
        {$push:{socials:new_social}},
        {safe:true,upsert:true},
        function(err,result){
          if (err){
            console.log(err);
          }
          else{
            res.sendStatus(200);
          }
        }
      )
    },
    updateEmail:function(req,res){
      var updated_email={
        name:req.body.name,
        email:req.body.email
      };

      var user_id=req.body.user_id;
      var email_id=req.body._id;

      User.update(
        {_id:user_id,'emails._id':email_id},
        {$set:{
                'emails.$.name':updated_email.name,
                'emails.$.email':updated_email.email
                }
        },function(err){
          if(err){
            console.log(err);
          }
          else{
            res.sendStatus(200);
          }
        }
      );
    },
    updatePhone:function(req,res){
      var updated_phone={
        name:req.body.name,
        phone:req.body.phone
      };

      var user_id=req.body.user_id;
      var phone_id=req.body._id;

      User.update(
        {_id:user_id,'phones._id':phone_id},
        {$set:{
                'phones.$.name':updated_phone.name,
                'phones.$.phone':updated_phone.phone
                }
        },function(err){
          if(err){
            console.log(err);
          }
          else{
            res.sendStatus(200);
          }
        }
      );
    },
    updateSocial:function(req,res){
      var updated_social={
        name:req.body.name,
        link:req.body.link
      };

      var user_id=req.body.user_id;
      var social_id=req.body._id;

      User.update(
        {_id:user_id,'socials._id':social_id},
        {$set:{
                'socials.$.name':updated_social.name,
                'socials.$.link':updated_social.link
                }
        },function(err){
          if(err){
            console.log(err);
          }
          else{
            res.sendStatus(200);
          }
        }
      );
    },
    deleteEmail:function(req,res){
      var user_id=req.body.user_id;
      var email_id=req.body._id;

      User.update(
        {_id:user_id,'emails._id':email_id},
        {$pull:{emails:{
                _id:email_id
              }}
        },function(err){
          if(err){
            console.log(err);
          }
          else{
            res.sendStatus(200);
          }
        }
      );
    },
    deletePhone:function(req,res){
      var user_id=req.body.user_id;
      var phone_id=req.body._id;

      User.update(
        {_id:user_id,'phones._id':phone_id},
        {$pull:{phones:{
                _id:phone_id
              }}
        },function(err){
          if(err){
            console.log(err);
          }
          else{
            res.sendStatus(200);
          }
        }
      );
    },
    deleteSocial:function(req,res){
      var user_id=req.body.user_id;
      var social_id=req.body._id;

      User.update(
        {_id:user_id,'socials._id':social_id},
        {$pull:{socials:{
                _id:social_id
              }}
        },function(err){
          if(err){
            console.log(err);
          }
          else{
            res.sendStatus(200);
          }
        }
      );
    },
    connectionRequested:function(req,res){
      var connection_id=req.body.connection_id;
      var profile_id=req.body.profile_id;
      //if profile_id == 0, create new profile using all contact info

      User.findByIdAndUpdate(
        connection_id,
        {$addToSet:{requests:profile_id}},
        {safe:true,upsert:true},
        function(err,result){
          if (err){
            console.log(err);
          }
          else{
            res.sendStatus(200);
          }
        }
      )
    },
    acceptConnection:function(req,res){

      //take profile from requests array and put into connections
      //take acceptee's chosen profile and insert into the requester's connections (or create if none choosen)
      //add respective user_ids to shared with arrays in profiles

    },
    getConnectionRequests:function(req,res){
      User.findOne({_id:req.body.user_id},'requests -_id',function(err,results){
        if(err){
          console.log(err);
        }
        else{
          console.log(results);
          Profile.find({
            _id:{$in:results.requests}
          },function(err2,profiles){
            if(err2){
              console.log(err2);
            }
            else{
              console.log(profiles);
              res.json(profiles);
            }
            
          })
        }
      });
    },
  }
})();
