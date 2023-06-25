const express = require("express");
const Favorite = require("../models/favorite");
const authenticate = require("../authenticate");
const cors = require('./cors');
const favoriteRouter = express.Router();

favoriteRouter.route('/')
.options(cors.corsWithOptions, (req, res)=> res.sendStatus(200))
.get(cors.cors, authenticate.verifyUser, (req,res, next)=> {
    Favorite.find ({user: req.user._id})
    .populate('user')
    .populate('campsites')
    .then(favorite => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(favorite);
    })
    .catch(err => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req,res, next)=> {
    Favorite.findOne({ user: req.res._id})
    .then(favorite=> {
        if (favorite){
            req.body.forEach(fav => {
                if(!favorite.campsites.includes(fac._id)){
                    favorite.campsites.push(fav._id);
                }
            });
            favorite.save()
            .then(favorite => {
                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json');
                res.json(favorite)
            })
            .catch(err=> next(err));
        } else {
            Favorite.create({user: req.user._id})
            .then(favorite => {
                req.body.forEach(fav =>{
                    if(!favorite.campsites.includes(fav._id)){
                        favorite.campsites.push(fav._id);
                    }
                })
                favorite.save()
                .then(favorite => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json')
                    res.json(favorite)
                })
                .catch(err=> next(err));
            })
        }
    }).catch(err=> next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req,res, next)=>{
    res.statusCode = 403;
    res.end('PUT operation not supported on /favorites');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req,res, next)=>{
    Favorite.findOneAndDelete({user: req.user_id})
    .then(favorite => {
        res.statusCode = 200;
        if (favorite){
            res.setHeader('Contnent-Tyoe', 'application/json');
            res.json(favorite);
        } else {
            res.setHeader('Contnent-Type', 'text/plain');
            res.end('You do not have any favorites to delete!');

        }
    })
    .catch(err => next (err));
});

module.exports = favoriteRouter