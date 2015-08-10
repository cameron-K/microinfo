var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var userSchema=new mongoose.Schema({
  first_name:String,
  last_name:String,
  password:String,
  main_title:String,
  phones:[{
    name:String,
    phone:String
  }],
  emails:[{
    name:String,
    email:String
  }],
  socials:[{
    name:String,
    link:String
  }],
  profiles:[{type:Schema.Types.ObjectId, ref:'Profile'}],
  connections:[{type:Schema.Types.ObjectId, ref:'Profile'}],
  requests:[{type:Schema.Types.ObjectId, ref:'Profile'}]
})

mongoose.model('User',userSchema);
