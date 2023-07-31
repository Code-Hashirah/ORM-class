const Users=require('../../model/user');
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
            password:hashed
        }).then(saved=>{
            res.redirect('/sign-in')
            // res.json("saved");
        })
    })
}

exports.signInPage=(req,res)=>{
    res.render('signIn.ejs', {title:"Login "})
}

exports.signIn=(req,res)=>{
    const{Email,Password}=req.body;
    Users.findOne({where:{
        email:Email
    }}).then(user=>{
        // console.log(user)
    bcrypt.compare(Password, user.password).then(result=>{
        console.log(result)
        if(!result){
        //    res.redirect('/sign-in')
        }
          res.redirect('/')
    })
    })
}