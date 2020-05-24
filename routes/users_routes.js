const express = require("express");
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

const validateSignUpInput = require("../validation/signup_validation");
const validateLoginInput = require('../validation/login_validation');
const User = require("../models/User_model");


/** SignUp Routes */
router.post("/signup", (req, res) => {
    // Destructure the validation errors
    const { errors, isValid} = validateSignUpInput(req.body);

    // Desctructure the user inputs from req.body
    const { user_name, email, password } = req.body;

    // Validate inputs and return errors if any
    if(!isValid){
        return res.status(400).json(errors);
    }

    // check if the user_name (or) email already exist. if does not exist, create a new user.
    User.findOne({$or:[{email},{user_name}]}).then(user => {
        if(user) {
            if(user.email === email){
                return res.status(400).json({email:"Email already exists"});
            } else {
                return res.status(400).json({ user_name: "Username already exists"});
            }
        } else {
            const newUser = new User({ user_name, email, password});
            // hashing password before storing it in database
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;

                    newUser.password = hash;
                    newUser.save().then(user => res.json(user)).catch(err => console.log({ error: 'Error creating a new user'}))
                })
            })
        }
    })
})


/** Login Routes */
router.post("/login", (req, res) => {
    // Destructure the validation errors
    const { errors, isValid} = validateLoginInput(req.body);

    // Validate inputs and return errors if any
    if (!isValid) {
        return res.status(400).json(errors);
    }

    // Desctructure the user inputs from req.body
    const { email, password } = req.body;


    User.findOne({ email }).then(user => {
        if(!user){
            return res.status(404).json({ email: "Email not found"});
        }

        bcrypt.compare(password, user.password).then(isMatch => {
            if(isMatch){
                const payload = {
                    id: user.id,
                    user_name : user.user_name
                };
                jwt.sign(payload, SECRET, { expiresIn: 3600}, (err, token) => {
                    if(err) {
                        console.log(err);
                    }
                    return res.json({
                        success: true,
                        token: "Bearer " + token
                    });
                });
            } else {
                return res.status(400).json({ password: "Password Incorrect"});
            }
        })
    })
})


module.exports = router;














