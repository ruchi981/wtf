const express=require("express");
const router=express.Router();
const Article=require("../models/articles");
const User=require("../models/user")

router.get("/",(req,res)=>{
    Article.find({}).then((result)=>{
    res.render("articles",{articles:result});
}).catch((err)=>{
    console.log(err);
})
});



//FORM TO CREATE A NEW ARTICLE
router.get("/new",ensureAuthenticated,(req,res)=>{
    res.render("new");
})


//POST THE ARTICLE
router.post("/",(req,res)=>{
    let article =new Article();
    article.title=req.body.title;
    article.author=req.user._id;
    article.description=req.body.description;


    article.save().then((result)=>{
        res.redirect("/articles")
    }).catch((err)=>{
        console.log(err)
    })
    
})

//READ A ARTICLE FULL
router.get("/read/:id",ensureAuthenticated,(req,res)=>{
    Article.findById(req.params.id).then((result)=>{
       
            res.render("read",{article:result});

        })
       
    })



//FORM TO EDIT ARTICLE
router.get("/edit/:id",ensureAuthenticated,(req,res)=>{
    Article.findById(req.params.id).then((result)=>{
      
        res.render("edit",{article:result});
    }).catch((err)=>{
        console.log(err);
    })
})


//UPDATE THE EDIITED ARTICLE
router.put("/:id",(req,res)=>{
    Article.findByIdAndUpdate(req.params.id,req.body).then((result)=>{
        res.redirect("/articles")

    }).catch((err)=>{
        console.log(err)
    })
})

//DELETE THE ARTICLE
router.get("/delete/:id",ensureAuthenticated,(req,res)=>{
    Article.findById(req.params.id).then((result)=>{
        
           
        res.redirect("/articles");
        });
    })


// Access Control
function ensureAuthenticated(req, res, next){
    if(req.isAuthenticated()){
      return next();
    } else {
      
      res.redirect('/users/login');
    }
  }
  


module.exports=router;