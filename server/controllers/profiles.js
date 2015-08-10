module.exports=(function(){
  var mongoose=require('mongoose');
  var Profile=mongoose.model('Profile');
  var User=mongoose.model('User');
  return{
    showAll:function(req,res){
      Profile.find({user_id:req.body.user_id},function(err,results){
        if(err){
          console.log(err);
        }
        else{
          console.log(results);
          res.json(results);
        }
      });
    },
    add:function(req,res){
      var new_profile=new Profile({
        user_id:req.body.user_id,
        first_name:req.body.first_name,
        last_name:req.body.last_name,
        title:req.body.title,
        emails:req.body.emails,
        phones:req.body.phones,
        socials:req.body.socials
      }).save(function(err){
        if(err){
          console.log(err);
        }
        else{
          res.sendStatus(200);
        }
      })
    },
    showConnections:function(req,res){
      // var connections=User.find({_id:req.body.user_id},'connections',function(err,results){
      //   console.log(connections.connections);
      //   if(err){
      //     console.log(err);
      //   }
      //   else{
      //     // res.json(results);
      //     Profile.find({
      //       _id:{$in:connections}
      //     },function(err,results){
      //       if(err){
      //         console.log(err);
      //       }
      //       else{
      //         res.json(results);
      //       }
      //     })
      //   }
      // });

      Profile.find({
                  _id:{$in:req.body.connections}
              },function(err,results){
                if(err){
                  console.log(err);
                }
                else{
                  res.json(results);
                }
          })

    }
  }

})();
