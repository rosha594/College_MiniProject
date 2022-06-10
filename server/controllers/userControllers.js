const User = require('../models/readerModel');
const Blogs = require("../models/blogModel")
const Blog = require('../models/blogModel');
const asyncHandler = require('express-async-handler');
const gernrateToken = require('../util/gernrateToken');


const registerUser = asyncHandler(async  (req,res) => {
    const {name,email,password,role,pic,tags} = req.body;

    //check whether user is alredy exist or not
    const UserExits = await User.findOne({email});

    if(UserExits){
        res.status(400);
        throw new Error("User Already Exits !");
    }

    //If user already not exist then register him
    const user = await User.create({
        name:name,
        email:email,
        password:password,
        role:role,
        pic:pic,
        tags:tags,
    })

    if(user){
        res.status(201).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            age:user.age,
            role:user.role,
            pic:user.pic,
            tags:user.tags,
            token: gernrateToken(user._id),
        })
    }else{
        res.status(400);
        throw new Error("");
    }    
});


//Login
const authUser = asyncHandler(async(req,res)=>{
    const {email,password} = req.body;

    //checking existance of requested email
    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            age:user.age,
            role:user.role,
            pic:user.pic,
            token: gernrateToken(user._id),
        })
    }else{
        res.status(400);
        throw new Error("User Dosen't exits !");
    }    
});

const userData = asyncHandler(async(req,res)=>{
    const {email} = req.body;
    const profile = await User.findOne({email})
    if(profile){
        
        res.json({
            name:profile.name,
            email:profile.email,
            password:profile.password,
            role:profile.role,
        })
    }else{
        res.status(400);
        throw new Error("No data Available !")
    }
    
})

const userUpdate = asyncHandler(async(req,res)=>{
    const {name,email,password,role,originalEmail} = req.body;
    console.log(originalEmail);
    User.updateOne({email:originalEmail}, {$set:{ name: name,role:role}},
                            function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Updated User : ", docs);
        res.json({
            name:name,
            email:email,
            password:password,
            role:role,
            
        })
    }
});        
})

const createBlog = asyncHandler(async  (req,res) => {
    const {title, description, content, tags, id} = req.body;

    const newBlog = await Blog.create({
        title: title,
        description:description,
        content: content,
        tag:tags, 
        blogger:id,
    })

    if(newBlog){
        res.status(201).json({
            _id:newBlog._id,
            title:newBlog.title,
            description:newBlog.description,
            content:newBlog.content,
            tag:newBlog.tag,
            blogger: newBlog.blogger,            
            
        })
    }else{
        res.status(400);
        throw new Error("");
    }    
});

const getTrendingBlogs = asyncHandler(async  (req,res) => {
    
    Blogs.find({}, (err, blogs) => {
        if(err) throw err;
        res.send(blogs)
    })

    }    
);

const getBloggerBlogs = asyncHandler(async  (req,res) => {
    // const {userId} = req.body;
    // console.log(userId);
    // Blogs.find({_id:userId.toString()}, (err, blogs) => {
    //     if(err) throw err;
    //     console.log(blogs)
    //     res.send(blogs)
    // })

    }    
);

module.exports = {registerUser,authUser, userData, userUpdate, createBlog,getTrendingBlogs,getBloggerBlogs};
