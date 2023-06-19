const express = require('express');
const promotionRouter = express.Router();
const authenticate = require('../authenticate');

promotionRouter.route('/')

.get((req, res) => {
    res.end('Will send the promotion to you');
})

.post(authenticate.verifyUser,(req, res) => {
    res.end(`Will add the promotion: ${req.body.name} with description: ${req.body.description}`);
})

.put(authenticate.verifyUser,(req, res) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /promotions');
})

.delete(authenticate.verifyUser,(req, res) => {
    res.end('Deleting all promotions');
});

promotionRouter.route('/:promotionId')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})

.get(authenticate.verifyUser,(req, res) => {
    res.send(`Will send all the campsites with id ${req.params.promotionId} to you`)
})

.post(authenticate.verifyUser,(req, res) => {
    res.statusCode = 403;
    res.end(`POST operation not supported on /promotions/${req.params.promotionId}`);
})

.put(authenticate.verifyUser, authenticate.verifyAdmin ,(req,res) => {
    res.write(`Updating the promotion: ${req.params.promotionId}\n`);
    res.end(`Will update the promotion: ${req.body.name} with description: ${req.body.description}`);
})

.delete(authenticate.verifyUser, authenticate.verifyAdmin, (req,res)=>{
    res.end(`Deleting promotion: ${req.params.promotionId}`);
})

module.exports = promotionRouter;