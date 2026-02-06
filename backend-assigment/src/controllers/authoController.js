const User=require("../models/User");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const {registerSchema}=require("../utils/validate");

exports.register=async(req, res)=>{
    const {error}=registerSchema.validate(req.body);
    if(error) return res.status(400).json({message:error.message});
    const hashedPassword=await bcrypt.hash(req.body.password, 10);
    const user=await User.create({email:req.body.email,password:hashedPassword});
    res.json({message:"User registered Successfully"});
};

exports.login=async(req, res)=>{
    const user=await User.findOne({email:req.body.email});
    if (!user) return res.status(400).json({message:"Invalid credentials"});

    const isMatch=await bcrypt.compare(req.body.password,user.password);
    if(!isMatch) return res.status(400).json({message:"Invalid credentials"});

    const token=jwt.sign({id:user_id, role:user.role}, process.env.JWT_SECRET,{expiresIn:"1h"}

    );
res.json({token});

};