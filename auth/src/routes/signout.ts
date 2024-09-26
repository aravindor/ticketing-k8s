import express from "express";
const router = express.Router()

router.post("/api/users/sign-out",(req,res,next)=>{
    req.session = null
    return res.json();
})

export {router as signOutRoute}