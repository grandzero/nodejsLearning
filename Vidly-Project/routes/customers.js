const mongoose = require('mongoose');
const express= require('express');
const router = express.Router();
const Joi = require('joi');
const Customer = require('../models/customers').Customer;


router.get('/' , async (req,res) => {
    if(req.query.id){
        const customer = await Customer.findById(req.query.id);
        res.send(customer);
    }else{
        const customer = await Customer.find();
        res.send(customer);
    }
    res.end();

})

router.post('/' , async (req,res) => {
    
    
    //Check input exists
    const joiSchema = Joi.object({
        id: Joi.forbidden(),
        name: Joi.string().min(2).max(15).required(),
        isGold: Joi.boolean().required(),
        phone: Joi.number().required().min(2).max(99999999)
    });

    //validate input 
    const {error} = joiSchema.validate(req.body);
    if(error)
       return res.status(400).send(error.details[0].message);
    //Save customer
    const customer =  new Customer(req.body);
    await customer.save();
    res.send(customer);
})

router.put('/:id' , async (req,res) => {

    
    if(!req.body){
        return res.status(400).send("Bad Request");
    }
    const customer = await Customer.findById(req.params.id);
    if(!customer)
        return res.status(400).send("Could not find customer");
    //Check input exists
    const joiSchema = Joi.object({
        id: Joi.forbidden(),
        name: Joi.string().min(2).max(15),
        isGold: Joi.boolean(),
        phone: Joi.number().min(2).max(99999999)
    });

    //validate input 
     const {error} = joiSchema.validate(req.body);
    if(error)
        return res.status(400).send(error.details[0].message);
    
    customer.set(req.body);
    await customer.save();
    res.send(customer);
})

router.delete('/:id' , async (req,res) => {
    if(!req.body){
        return res.status(400).send("Bad Request");
    }
    const customer = await Customer.findById(req.params.id);
    if(!customer)
        return res.status(400).send("Could not find customer");

    customer.remove();
    res.send(customer);
})

module.exports = router;