const express = require('express');
const partnerRouter = express.Router();
const Partner = require('../models/partner');

partnerRouter.route('/')
.get((req, res, next) => {
    Partner.find()
    .then(partners => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(partners);
    }).catch(err => next(err));
})
.post((req, res, next) => {
    Partner.create(req.body)
    .then(partner => {
        console.log ('Partner Created ', partner);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(partner);
    }).catch(err => next(err));
})

.put((req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /partners');
})

.delete((req, res, next) => {
    Partner.deleteMany()
    .then(response => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(response);
    }).catch(err => next(err));
})

partnerRouter.route('/:partnerId')
.get((req, res) => {
    Partner.findbyId(req.params.partnerId)
    .then(partner => {
        res.json(partner);
    }).catch(err => next(err));
})
.post((req,res)=>{
    res.statusCode = 403;
    res.end('POST operation not supported on /partners');
})
.put((req,res) => {
   Partner.findByIdAndUpdate(req,params.partnerId,{
    $set: req.body
   },{new: true})
   .then(partner => {
    res.json(partner);
   }).catch(err => next(err));
})
.delete((req,res)=>{
    res.end('Deleting all partners');
})
.all ((req,res,next)=> {
res.statusCode = 200;
res.setHeader('Content-Type' , 'application/json')
});

module.exports = partnerRouter;