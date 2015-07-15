var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var profileSchema=new mongoose.Schema({

  user_id:{type:Schema.Types.ObjectId, ref:'User'},
  users_shared_with:[{type:Schema.Types.ObjectId, ref:'User'}],
  title:String,
  emails:[{
    name:String,
    email:String
  }],
  phones:[{
    name:String,
    phone:String
  }],
  socials:[{
    name:String,
    link:String
  }]

})

mongoose.model('Profile',profileSchema);
