const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const articleSchema=new Schema({
    title:{
        type:String
        
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    description:{
        type:String
      
    }
})


const Article=mongoose.model("Article",articleSchema);


module.exports=Article;