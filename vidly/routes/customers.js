const mongoose = require('mongoose'); 
const express = require('express');
const router = express.Router();
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50

  }
  isGold: {
    type: Boolean,
    default: false
  }
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
})

const Customer =   mongoose.model('Customer',customerSchema);

router.get('/', async (req, res) => {
  const customers = await Customer.find().sort('name');
  res.send(customers);
});

router.post('/', async (req, res) => {
  const { error } = validateGenre(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let customers = new Customer({ 
    name: req.body.name,
    phone: req.body.phone,
    isGold: req.body.isGold
   });
  customers = await customers.save();
  res.send(customers);
});

function validateGenre(customers) {
  const schema = {
    name: Joi.string().min(5).max(50).require(),
    phone: Joi.string().min(5).max(50).require(),
    isGold: Joi.Boolean() 
  };

  return Joi.validate(customers, schema);
}

module.exports = router;