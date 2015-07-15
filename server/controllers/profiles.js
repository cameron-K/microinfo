module.exports=function(){
  var mongoose=require('mongoose');
  var Profile=mongoose.model('Profile');
  return {
    show:function(req,res){
      Profile.find({_id:req.body.user_id},function(err,results){
        if(err){
          console.log(err);
        }
        else{
          res.json(results);
        }
      });
    },
    add:function(req,res){
      var new_profile={
        user_id:req.body.user_id,

      }
    }
  }
}
