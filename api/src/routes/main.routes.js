const express = require('express');
const router = express.Router();
var qs = require('qs');
const Petshop = require('../models/petshops');
const Product = require('../models/products');

const createSplitTransaction = require('../services/pagarme')

router.get('/petshops', async (req, res) => {
    try{
        const petshops = await Petshop.find();
        res.json({error: false, petshops});
    }catch(err){
        res.json({ error: true, message: err.message });
    }
});

router.get('/petshop/:id', async (req, res) => {
    try{
        const petshop = await Petshop.findById(req.params.id);
        let products = await Product.find({petshop_id: petshop._id})
        .populate('petshop_id', 'recipient_id');

        res.json({error: false, petshop:{ ...petshop._doc, products}});
    }catch(err){
        res.json({ error: true, message: err.message });
    }
});


router.post('/purchase', async (req, res) => {
    try {
      const transaction = await createSplitTransaction(req.body);
      res.json(transaction);
    } catch (err) {
      res.json({ error: true, message: err.message });
    }
  });

module.exports = router;