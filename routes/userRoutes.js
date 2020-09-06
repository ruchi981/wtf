const express=require("express");
const User=require("../models/user");
const bcrypt=require("bcrypt");
const passport = require("passport");
const router=express.Router();



router.get("/register",(req,res)=>{
    res.render("register");
})


router.post("/register",(req,res)=>{
    let newUser=new User(req.body);

    bcrypt.hash(newUser.password,10,function(err,hash){
        if(err){
            console.log(err)
        }
        else{
            newUser.password=hash;
            newUser.save().then(()=>{
                res.redirect("/users/login")
            })
        }

    })

})

router.get("/login",(req,res)=>{
    res.render("login");
})

router.post("/login",(req,res,next)=>{
    passport.authenticate("local",{successRedirect:"/",failureRedirect:"/users/login"})(req,res,next)
});


router.get('/logout',function(req,res){
    req.logout();
    res.redirect("/");
});

module.exports=router;

