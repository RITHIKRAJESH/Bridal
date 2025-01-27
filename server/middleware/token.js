const jwt=require('jsonwebtoken')
const verifytoken=(req,res,next)=>{

    const token=req.headers.token;
    if(!token){
        return res.json({message:"Access Denied"}).status(400)
    }

    jwt.verify(token,'authen',(err,decode)=>{
        if(err){
            res.json({message:"Invalid Token"}).status(400)
        }
        else{
            return next()
        }
    })

}

module.exports=verifytoken