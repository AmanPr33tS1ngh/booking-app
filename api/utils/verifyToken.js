import jwt from 'jsonwebtoken'

export const verifyToken=(req,res,next)=>{
    const token=req.cookies.access_token;
    if(!token){
        res.send(401,"You are not authenticated")
    }
    jwt.verify(token,process.env.JWT,(err,user)=>{
        if(err){
            res.send(403,"Token is not valid")
        }
        req.user=user
        next()
    })
}

export const verifyUser=(req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if (req.user.id==req.params.id || req.user.isAdmin) {
            next()
        }else{
                res.send(403,"Token is not valid")
        }
    })
}
export const verifyAdmin=(req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if (req.user.isAdmin) {
            next()
        }else{
                res.send(403,"Token is not valid")
        }
    })
}