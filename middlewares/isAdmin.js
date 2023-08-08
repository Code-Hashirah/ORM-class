module.exports=(req,res,next)=>{
    if(req.session.data.role!="Admin"){
     return   res.redirect('/')
    }
    next()
}