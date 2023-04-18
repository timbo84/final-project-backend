import { RequestHandler } from "express";
import { User } from "../models/user";
import { comparePasswords, hashPassword, signUserToken, verifyUser } from "../services/auth";


export const getAllUser: RequestHandler = async (req, res, next) => {
    let users = await User.findAll();
    res.status(200).json(users);
}

export const createUser: RequestHandler = async (req, res, next) => {
    let newUser: User = req.body;
    if (newUser.username && newUser.password) {
        let hashedPassword = await hashPassword(newUser.password);
        newUser.password = hashedPassword;
        let created = await User.create(newUser);
        res.status(201).json({
            username: created.username,
            userId: created.userId
        });
    }
    else {
        res.status(400).send('Username and password required');
    }
}

export const loginUser: RequestHandler = async (req, res, next) => {
    // Look up user by their username
    let existingUser: User | null = await User.findOne({ 
        where: { username: req.body.username }
    });

    // If user exists, check that password matches
    if (existingUser) {
        let passwordsMatch = await comparePasswords(req.body.password, existingUser.password);
        
        // If passwords match, create a JWT
        if (passwordsMatch) {
            let token = await signUserToken(existingUser);
            res.status(200).json({ token });
        }
        else {
            res.status(401).json('Invalid password');
        }
    }
    else {
        res.status(401).json('Invalid username');
    }
}

export const getUser: RequestHandler = async (req, res, next) => {
    console.log("----------line52-----------")
    let user: User | null = await verifyUser(req);

    if (user) {
        let {userId, username, firstName, lastName, email, city, state, age } = user;
        res.status(200).json({
            userId,
            username,
            firstName,
            lastName,
            email,
            city,
            state,
            age
        });
    }
    else {
        res.status(401).send();
    }
}

export const updateUser: RequestHandler = async (req, res, next) => {
    
    let userId = req.params.userId;
    let newUser: User = req.body;
    
    let userFound = await User.findByPk(userId);
    
    if (userFound && userFound.userId == newUser.userId
        && newUser.username && newUser.firstName && newUser.lastName 
        && newUser.email && newUser.city && newUser.state
        && newUser.age) {
            await User.update(newUser, {
                where: { userId: userId}
            });
            res.status(200).json();
    }
    else {
        res.status(400).json();
    }
}