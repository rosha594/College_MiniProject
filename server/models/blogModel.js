const mongoose = require('mongoose');


const blogSchema = mongoose.Schema(
    {
        title:{
            type:String,
            required: true,            
        },
        description:{
            type:String,
            required:true,
            
        },
        content:{
            type:String,
            required:true,
        },
        tag:{
            type:String,
            required:true,
        },
        blogger:{
            type:String,
            
        },
        pic:{
            type:String,
            requierd:true,
            default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
        },
    },
    {
        timestamp:true,
    }
);

const Blog = mongoose.model('Blog',blogSchema);
module.exports = Blog;