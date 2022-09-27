const router = require('express').Router();
const Order = require('..db/Order');
const Account = require('..db/Account');
const Product = require('..db/Product');

router.get('/:id', async(req, res, next) => {
  try{
    const account = await Account.findOne({
      where : {
        id: req.params.id,
      },
      include: [Product],
    });
    res.send(account);
  }catch(error){
    next(error);
  }
});

router.get('/', async(req, res, next) => {
  try{
    const orders = await Order.findAll();
    res.send(orders)
  }catch(error){
    next(error);
  }
});

router.delete('/orders/:productId/:accountId', async(req, res, next) => {
  try{
    const cart = await Order.findOne({
      where: {
        accountId: req.params.accountId,
        productId: req.params.productId,
        isCart: true,
      },
    });
    cart.destroy();
  }catch(error){
    next(error);
  }
});

router.put('/orders/:accountId/:productId', async(req, res, next) => {
  try{
    const cart = await Order.findOne({
      where: {
        accountId: req.params.accountId,
        productId: req.params.productId,
        isCart: true,
      },
    });
    res.send(await cart.update(req.body));
  }catch(error){
    next(error);
  }
});

router.put('/orders/:accountId', async(req, res, next) => {
  try{
    const orders = await Order.findAll({
      where: {
        accountId: req.params.accountId,
      },
    });
    await Promise.all(
      orders.map((order) =>{
        return order.update({isCart: false});
      })
    );
    res.sendStatus(201);
  }catch(error){
    next(error);
  }
});

router.post('/orders/:productId/:accountId', async(req, res, next) => {
  try{
    try{
      const isCart = await Order.findOne({
        where: {
          accountId: req.params.accountId,
          productId: req.params.productId,
          isCart: true,
        },
      });
      res.send(await isCart.update({ quantity: isCart.quantity + req.body.quantity })
      );
    }catch(error){
      res.status(201).send(await Order.create(req.body));
    }
  }catch(error){
    next(error);
  }
});

router.post('/orders/guest', async(req, res, next) => {
  try{
    const guestOrders = req.body;
    res.status(201).send(
      guestOrders.map((order) => {
        return Order.create(order)
      })
    )
  }catch(error){
    next(error)
  }
});


module.exports = router;
