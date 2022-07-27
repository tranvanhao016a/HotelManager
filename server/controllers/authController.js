// const User=require("../models/account.model")
const Account=require("../models/account.model")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

let refreshTokens=[];
const authController={
    registerUser:async(req,res)=>{
        try{
            const salt =await bcrypt.genSalt(10);
            const hashed =await bcrypt.hash(req.body.password, salt);

            //create new user 
            const newAccount = await new Account({ 
                username : req.body.username,
                email: req.body.email,
                password:hashed
            })
            const account= await newAccount.save();
            res.json(account);
        }catch(err){
            res.status(500).json(err);
        }
    },
    generateAccessToken:(account)=>{
        return  jwt.sign(
            {
                id:account.id,
                username:account.username,
                admin:account.admin
            },
            process.env.JWT_ACCESS_KEY,
            {expiresIn:"1m"});
    },
    generateRefreshToken:(account)=>{
        return  jwt.sign(
            {
                id:account.id,
                username:account.username,
                admin:account.admin
            },
            process.env.JWT_REFRESH_KEY,
            { expiresIn:"1d"}
        );
    },
    loginUser:async(req,res)=>{
        try{
            const account=await Account.findOne({username:req.body.username});
            if(!account){
                return res.status(404).json("Wrong username!");
            }
            const validPassword = await bcrypt.compare(
                req.body.password,
                account.password
            );
            if(!validPassword){
                return res.status(404).json("Wrong password!");
            }
            if(account && validPassword){
                const accessToken= authController.generateAccessToken(account);
                const refreshToken= authController.generateRefreshToken(account);
                refreshTokens.push(refreshToken);
                // //REX STORE ->ACCESSTOKEN
                // //HTTPONLY COOKIE ->REFRESHTOKEN
                res.cookie("refreshToken",refreshToken,{
                    httpOnly:true,
                    secure:false,
                    path:"/",
                    sameSite:"strict",
                })
                const{password,...others}=account._doc;
                res.status(200).json({...others,accessToken});
                // res.json(account);
            }
        }catch(err){
            res.status(500).json(err);
        }
    },


    //REDIS
    requestRefreshToken: async(req,res)=>{
        const refreshToken=req.cookies.refreshToken;
        if(!refreshToken) return res.status(401).json("You're not authenticated");
        if(!refreshTokens.includes(refreshToken)){
            return res.status(403).json("Refresh token is not valid");
        }
        jwt.verify(refreshToken,process.env.JWT_REFRESH_KEY,(err,user)=>{
            if(err){
                console.log(err);
            }
            refreshTokens=refreshTokens.filter((token)=>token !==refreshToken)
            //Create new accesstoken, refreshtoken
            const newAccessToken=authController.generateAccessToken(user);
            const newRefreshToken=authController.generateRefreshToken(user);
            refreshTokens.push(newRefreshToken);
            res.cookie("refreshToken",newRefreshToken,{
                httpOnly:true,
                secure:false,
                path:"/",
                sameSite:"strict",
            })
            res.status(200).json({accessToken:newAccessToken});
        })
        // res.status(200).json("dssdss");
    },
    userLogout: async(req,res)=>{
        res.clearCookie("refreshToken");
        refreshTokens= refreshTokens.filter((token) => token !== req.cookies.refreshToken);
        res.status(200).json("Logged out!");
    }
}
module.exports=authController;