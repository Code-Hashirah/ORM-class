const Users=require('../../model/user');
const session = require('../../model/sessions')
const bcrypt=require('bcrypt');
const {validationResult}=require('express-validator')
// middlewares
exports.signUpPage=(req,res)=>{
    let errorMsg=req.flash('validationError');
    res.render('signUp.ejs', {title:"Sign Up ", DisplayError:errorMsg})
}

exports.signUp=(req,res)=>{
    let error=validationResult(req);
    if(!error.isEmpty()){
        req.flash('validationError', error.array())
        console.log(error);
        return res.redirect('/sign-up');
    }
    const {Email,Phone,Password}=req.body;
    bcrypt.hash(Password,12).then(hashed=>{
        Users.create({
            email:Email,
            phone:Phone,
            password:hashed,
            role:"User"
        }).then(saved=>{
            res.redirect('/sign-in')
            // res.json("saved");
        })
    })
}

exports.signInPage=(req,res)=>{
    let errorMsg=req.flash('validationError');
    let loginErr=req.flash('loginErr')
    res.render('signIn.ejs', {title:"Login",notFound:loginErr, errorMessage:errorMsg})
}

exports.signIn=(req,res)=>{
    const{Email,Password}=req.body;
    let error=validationResult(req);
    
    if(!error.isEmpty()){
        req.flash('validationError', error.array());
        return res.redirect('/sign-in')
    }
    Users.findOne({where:{
        email:Email
    }}).then(user=>{
        // console.log(user)
        // if(!user){
        //     req.flash('loginErr','Invalid email or password');
        //     console.log("error")
        //     return req.session.save(()=>{
        //      return   res.redirect('/sign-in')
        //     })
        // }
        // res.json("Valid Email");
        bcrypt.compare(Password,user.password).then(authenticated=>{
            console.log(authenticated)
            // if(!authenticated){
           
              
            //  return  req.session.save(()=>{
            //     req.flash('loginErr','Invalid email or password');
            //     return res.redirect('/sign-in');
            //    })
            // }
            req.session.isLoggedIn=true;
            req.session.data=user;
            req.session.save(()=>{
                // res.json("User Validated");
             return   res.redirect('/')
            })
        })

    })
}
exports.signOut=(req,res)=>{
    req.session.destroy(()=>{
        return res.redirect('/sign-out')
    })
}