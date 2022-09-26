const router = require('express').Router();
const Product = require('../db/Product');
const Account = require('../db/Account')
const { isAdmin, requireToken } = require('./gateKeeper');

router.get('/admin/products', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.send(products);
  } catch (error) {
    next(error);
  }
});

router.get('/admin/products/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.send(product);
  } catch (error) {
    next(error);
  }
});

router.put('/admin/products/:id', async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByPk(req.params.id);
    res.send(await updatedProduct.update(req.body));
  } catch (error) {
    next(error);
  }
});

// router.post('/admin/products', requireToken, isAdmin, async (req, res, next) => {
//   try {
//     console.log('hit')
//     const newProduct = await Product.create(req.body);
//     console.log(newProduct)
//     res.send(newProduct);
//   } catch (error) {
//     // console.log(isAdmin)
//     next(error);
//   }
// });

router.post('/admin/products', async (req, res, next) => {
  try {
    const newProduct = await Product.create(req.body);
    console.log(newProduct)
    res.send(newProduct);
  } catch (error) {
    next(error);
  }
});

router.get('/admin/accounts', async (req, res, next) => {
  try {
    const allAccounts = await Account.findAll();
    res.send(allAccounts)
  } catch (error) {
    next(error)
  }
})

router.delete('/admin/accounts/:id', async (req, res, next) => {
  try {
    const accountToDel = await Account.findByPk(req.params.id)
    await accountToDel.destroy()
    res.send(accountToDel)
  } catch (error) {
    next(error)
  }
})

router.put('/admin/accounts/:id', async (req, res, next) => {
  try {
    const accountToBeEdited = await Account.findByPk(req.params.id)
    res.send(await accountToBeEdited.update(req.body))
  } catch (error) {

  }
})

module.exports = router;