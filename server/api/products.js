const router = require('express').Router();

const Product = require('../db/Product');


router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.send(products);
  } catch (error) {
    next(error);
  }
});

router.post('/', async(req, res, next) => {
  try{
    const newProduct = await Product.create(req.body);
    res.send(newProduct);
  }catch(error){
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.send(product);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async(req, res, next) => {
  try{
    let product = await Product.findByPk(req.params.id);
    await product.update({quantity: product.quantity - req.body.amount})
  }catch(error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const deleteProduct = await Product.findByPk(req.params.id);
    deleteProduct.destroy();
    res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

module.exports = router;