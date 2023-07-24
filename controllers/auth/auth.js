const Users=require('../../model/user');
const bcrypt=require('bcrypt');
exports.signUpPage=(req,res)=>{
    res.render('signUp.ejs', {title:"Sign Up "})
}

exports.signUp=(req,res)=>{
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
        bcrypt.compare(Password,user.password)
    }).then(result=>{
     if(!result){
       return res.redirect('/sign-in')
     }
     res.redirect('/')
    })
}