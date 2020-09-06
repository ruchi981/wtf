const LocalStrategy=require("passport-local").Strategy;
const User=require("../models/user");




const bcrypt=require("bcrypt");
module.exports=function(passport){
    //Local strategy
    passport.use(new LocalStrategy(function(username,password,done){
        //match username
        let query={username:username};
        User.findOne(query,function(err,user){
            if(err) throw err;
            if(!user){
                return done(null,false)

            }
            //if username matches then match password
            bcrypt.compare(password,user.password,function(err,isMatch){
                if(err) throw err;
                if(isMatch){
                    return done(null,user)

                }else{
                    return done(null,false)

                }
            })

            
            
        });
    }));


    passport.serializeUser(function(user, done) {
        done(null, user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
          done(err, user);
        });
      });

}



