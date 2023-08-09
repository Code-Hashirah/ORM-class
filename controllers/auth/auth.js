const Users=require('../../model/user');
const session = require('../../model/sessions')
const bcrypt=require('bcrypt');
const crypto =require('crypto');
const nodemailer=require('nodemailer');
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
            // Sending email to user 
            const email={
                to:[saved.email,'newuser@gmail.com'],
                from:{
                    name:'OIC HUB',
                    email:'info@oichub.com.ng'
                },
                subject:'Thank you for signing up',
                html:`
                <h2> Welcome </h2>
                <p>Thank you for signing up with us at OIC Hub </p> <hr>
                <i>We are pleased to have you in our coding school </i>
                `
            }

            var transport = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                  user: "1c15f97e3e1bb1",
                  pass: "5a4c15cba87f06"
                }
              });
              transport.sendMail(email).then((sent)=>{
                if(sent){
                return    res.redirect('/sign-in')
                }
              }).catch(error=>{
                console.log(error)
              })

           
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

exports.forgotPasswordPage=(req,res)=>{
    let foundError=req.flash('emailError')
    res.render('forgot-password.ejs', {title:"Forgot Password"});
}

exports.forgotPassword=(req,res)=>{
    const {Email}=req.body;
    crypto.randomBytes(32,(err,buffer)=>{
        if(err){
            console.log(err)
            req.flash('emailError',"An error occured with token")
        }
        let token=buffer.toString('hex');
        Users.findOne({
            where:{
                email:Email
            }
        }).then(user=>{
            if(!user){
                console.log("Email not valid")
                req.flash('emailError',"Invalid Email")
              return req.session.save(()=>{
                res.redirect('/forgot-password')
              })
            }
            user.resetToken=token;
            user.resetTokenExpiration=Date.now()+(300000)
            return user.save()
        }).then(sendmail=>{
            let  email={
                to:sendmail.email,
                from:{
                    name:'OIC-Hub',
                    email:'info@oichub.com.ng'
                },
                subject: 'Verification Email',
                html:`
                    <h2>Verification code </h2>
                    <p> Click <a href="http:localhost:5000/retrieve-password/${token}"> here </a> to retrieve your password</p>
                    <p style="color:red;"> Please ignore this message if you did not initiate it </p>
                `
            }
            //mailtrap code
            var transport = nodemailer.createTransport({
                host: "sandbox.smtp.mailtrap.io",
                port: 2525,
                auth: {
                  user: "1c15f97e3e1bb1",
                  pass: "5a4c15cba87f06"
                }
              });
              transport.sendMail(email).then((sent)=>{
                if(sent){
              res.redirect('/')
                }
              }).catch(error=>{
                req.flash('emailError',"Error sending mail")
                console.log(error)
              })

        })
    })
}

exports.retrievePasswordPage=(req,res)=>{
    let token=req.params.token;
    Users.findOne({
        where:{
            resetToken:token
        }
    }).then(verifiedToken=>{
        if(!verifiedToken){
            console.log("Invalid Token")
            return
        }
        if(verifiedToken.resetTokenExpiration < Date.now()){
            console.log("Expired Token")
            return
        }
        res.render('retrieve-password.ejs', {title:"Reset Password", User:verifiedToken})
    })
}