const express=require("express");
const mongoose=require("mongoose");
const articleRoutes=require("./routes/articleRoutes");
const userRoutes=require("./routes/userRoutes");
const methodOverride=require("method-override");
const passport=require("passport")
const app=express();



mongoose.connect("mongodb://localhost/eve").then(()=>{
    console.log("connecte to db");

})

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended:false}))
app.use(methodOverride("_method"))


 //create passport config
 require("./config/passport")(passport);
 app.use(passport.initialize());
 app.use(passport.session());


 app.get("*",(req,res,next)=>{
     res.locals.user=req.user || null;
     next();
 })


app.use("/articles",articleRoutes);
app.use("/users",userRoutes);




app.get("/",(req,res)=>{
    res.render("landing");
})




app.listen(5000,()=>{
    console.log("server started");

})