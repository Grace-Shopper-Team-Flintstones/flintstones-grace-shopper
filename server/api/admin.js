const router = require('express').Router();
const Product = require('../db/Product');
const Account = require('../db/Account');
const { isAdmin, requireToken } = require('./gateKeeper');

router.get('/products', async (req, res, next) => {
    try {
      const products = await Product.findAll();
      res.send(products);
    } catch (error) {
      next(error);
    }
  });

  router.get('/accounts', async(req, res, next) => {
    try{
      const accounts = await Account.findAll();
      res.send(accounts);
    }catch(error){
      next(error);
    }
  });
  
  router.get('/products/:id', async (req, res, next) => {
    try {
      const product = await Product.findByPk(req.params.id);
      res.send(product);
    } catch (error) {
      next(error);
    }
  });

  router.get('/products/:id', async (req, res, next) => {
    try {
      const product = await Product.findByPk(req.params.id);
      res.send(product);
    } catch (error) {
      next(error);
    }
  });
  
  router.put('/accounts/:id', async (req, res, next) => {
    try {
      const updatedAccount = await Account.findByPk(req.params.id);
      res.send(await updatedAccount.update(req.body));
    } catch (error) {
      next(error);
    }
  });
  
  router.post('/products', async (req, res, next) => {
    try {
      const newProduct = await Product.create(req.body);
      res.send(newProduct);
    } catch (error) {
      next(error);
    }
  });

module.exports = router;