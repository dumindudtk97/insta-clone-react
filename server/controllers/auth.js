import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// register user (save in db), when correct login, provide jwt

/* Register User */     
export const register = async (req,res) => {    //async since we are calling mongodb
    try{
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body;   // take user details from the request body // frontend will send a request with these parameters
        
        //encrypt password
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password,salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password:passwordHash,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile:Math.floor(Math.random() * 1000),
            impressions:Math.floor(Math.random() * 1000),
        });

        const savedUser = await newUser.save();
        console.log("user saved successfully : " + savedUser);
        res.status(201).json(savedUser);            // send user back with created 201

    } catch (err){
        res.status(500).json({error: err.message});
    }
}

/* login */
export const login = async (req,res) =>{
    try{
        const { email, password } = req.body; 
        
        const user = await User.findOne({ email: email});   //use mongoose to find the user with email
        if(!user) return res.status(400).json({msg: "User not exist."});

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) return res.status(400).json({msg: "Invalid Credentials."});
        
        const token = jwt.sign({id: user.id }, process.env.JWT_SECRET_KEY);  // sign a jwt for the user (id) with our secret key
        delete user.password;

        res.status(200).json({token, user });

    }catch (err){
        res.status(500).json({error: err.message});
    }
}
