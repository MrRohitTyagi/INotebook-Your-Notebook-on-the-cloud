const express = require('express');
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const User = require('../models/User')
const Notes = require('../models/Notes')
const Authrouter = express.Router()
const { body, validationResult } = require('express-validator'); //package for validation
const JWT_SECRET = "rohitisagood$boy"
let i =  1
console.log(i);

// create a user using POST "/api/auth" dosent require auth (signup)

Authrouter.post('/createuser'

    ,  //parameters for validation for all data feilds 
    body('name', 'enter a valid name').isLength({ min: 3 }),
    body('email', 'enter a valid email').isEmail().normalizeEmail(),
    body('password', 'password must be atleast 5 characters').isLength({ min: 5 }),



    async (req, res) => {
        console.log(req.body);
        const errors = validationResult(req); //if validation fails
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
            
        }
        
        try { // in case any error occu4red
            
            let user = await User.findOne({ email: req.body.email }); //to check whether a user with same email already exists or not
            if (user) {
                return res.status(200).json("sorry a user with this email already exists" )
            }
            i = i + 1

            const salt = await bcrypt.genSalt(10) //generate a salt  a addon protection layer to passdord

            let securedPass = await bcrypt.hash(req.body.password, salt)   // hash the password for security

            user = await User.create({  //create user in database  with User model
                name: req.body.name,
                email: req.body.email,
                password: securedPass,
                UID : i
            })
            let note = await Notes.create({
                
                email : req.body.email ,
                title :"Note 1",
                identifire:req.body.email+"Note 1"
                
            })
                
                
            
            console.log(i);


           
            
            // const authtoken = jwt.sign(data, JWT_SECRET)

            //    console.log(jwtdata);
            res.json("user created")
            // res.json({ authtoken })


        } catch (err) {
            console.log(err);
            res.status(500).send("some error occured")
        }
    })

// authenticate a user using POST "/api/auth/login" dosent require auth (signup)
//////////////////////////////////////////////////Route 2///////////////////////////
Authrouter.post('/login',
    body('email', 'enter a valid email').isEmail().normalizeEmail(),
    body('password', 'Password cannot be blacnk').exists(),

    async (req, res) => {

        const errors = validationResult(req); //if validation fails
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });

        }
        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email: email }) //extrace the user with email id
            if (!user) { //if user not found
                return res.status(200).json({success : false, error: "Incorrect user orr password" })
            }

            const passCompair = await bcrypt.compare(password, user.password) //compair entered pass with database password



            if (!passCompair) {
                return res.status(200).json({success : false, error: "Incorrect user orr password" })

            }

            
            // const authtoken = jwt.sign(data, JWT_SECRET)
            // res.json({ authtoken })
               res.json({success : true,user}) // if successfull login


        } catch (err) {
            console.log(err);
            res.status(500).send({success : false,error:"internal server error"})
        }




    })

Authrouter.post('/getusera',

     //parameters for validation for all data feilds 
  



    async (req, res) => {

        try {
            let userID = req.user.id;


            const user = await User.findOne(userID).select("-password")
            res.send(user)

        } catch (err) {
            console.log(err);
            res.status(500).send("internal server error")
        }
    })
Authrouter.post('/getuser',
     //parameters for validation for all data feilds 
  



    async (req, res) => {

        try {
            


            const user = await User.findOne({email:req.body.email}).select(['-password'])
            res.send(user)

        } catch (err) {
            console.log(err);
            res.status(500).send("internal server error")
        }
    })





module.exports = Authrouter