const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required: true,            
        },
        email:{
            type:String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true,
        },
        role:{
            type:String,
            required:true,
        },
        tags:{
            type:Array
            
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

//password encryption
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
})
userSchema.pre("update", async function(next){
    if(!this.isModified("password")){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
})

//password decryption and comparing
userSchema.methods.matchPassword = async function(enterPassword){
    return await bcrypt.compare(enterPassword,this.password);
}
const User = mongoose.model('User',userSchema);
module.exports = User;