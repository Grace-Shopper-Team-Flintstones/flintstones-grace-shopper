const router = require('express').Router();
const { Op } = require('sequelize');

const Order = require('../db/Order');
const Product = require('../db/Product');

//create a cart
router.post('/cart', async (req, res, next) => {
  try {
    if (req.body.UUID=== 'empty' && req.body.userId===0) {
    let cart = await Order.create();

    const product = await Product.findByPk(req.body.id);
    const doesExist = await cart.hasProduct(product);

    if (!doesExist) {
      await cart.addProduct(product);
      await cart.save()
    }
    const response = {id, UUID} = cart
    res.send(response);
  } else if (req.body.UUID=== 'empty') {
    let cart = await Order.create({accountId:req.body.accountId});

    const product = await Product.findByPk(req.body.id);
    const doesExist = await cart.hasProduct(product);

    if (!doesExist) {
      await cart.addProduct(product);
      await cart.save()
    }
    const response = {id, UUID} = cart
    res.send(response);
  } else {
    let cart = await Order.findOne({
      where: {
        isCart: true,
        UUID: req.body.UUID
      },
      
    });

    const product = await Product.findByPk(req.body.id);
    const doesExist = await cart.hasProduct(product);

    if (!doesExist) {
      await cart.addProduct(product);
      await cart.save()
    }
    const response = {id, UUID} = cart
    res.send(response);
  }
  } catch (error) {
    next(error);
  }
});

//update quantities in cart
router.put('/cart', async (req, res, next) => {
    try {
      const product = await Product.findByPk(req.body.id);
      const cart = await Order.findOne({
        where:{
          UUID:req.body.UUID}
      });
      const cartTotal = product.price * req.body.multi
      if(req.body.op==='increment') {
        await lineItem.increment('quantity', {
          where: {
            orderId:req.body.cartId, styleId:req.body.itemId}
        })
        await lineItem.increment({'totalPrice': product.price}, {
          where: {
            orderId:req.body.cartId, 
            productId:req.body.lineItemId}})
        await cart.increment({'orderTotal': product.price}, {
          where : {
            id:req.body.cartId}
        })
      } else if (req.body.op==='dececrement'){
        await lineItem.decrement('quantity', {
          where: {
            orderId:req.body.cartId, 
            productId:req.body.lineItemId, 
            quantity: {[Op.gt]:0}
          }})
        await lineItem.decrement({'totalPrice': product.price}, {
          where: {
            orderId:req.body.cartId, 
            productId:req.body.lineItemId}
        })
        await cart.decrement({'orderTotal': product.price}, {
          where : {
            id:req.body.cartId}
        })
      } else if (req.body.op==='remove'){
        await cart.decrement({'orderTotal': total}, {
          where : {
            id:req.body.cartId}
        })
      }
      res.sendStatus(200)
    } catch (error) {
      next(error)
    }
  });

  //order checkout
router.put('/cart/:UUID', async(req, res, next) => {
    try{
        const order = await Order.findOne({
            where: {
                UUID: req.params.UUID,
            }
        });
        res.send(await order.update({isCart: false}));
    }catch(error){
        next(error);
    }
});

//get user cart
router.get('/cart/:accountId/:UUID', async(req, res, next) => {
    try{
        let cart = false;
        if(req.params.UUID !== 'empty'){
            cart = await Order.findOne({
                where: {
                    UUID: req.params.UUID,
                    isCart: true,
                },
                include: {
                    model: Product,
                    attributes: ['id', 'genre', 'title', 'price', 'imageUrl', 'description'],
                },
            });
        }else if(req.params.accountId !== 0){
            cart = await Order.findOne({
                where: {
                    accountId: req.params.accountId,
                    isCart: true,
                },
                include: {
                    model: Product,
                    attributes: ['id', 'genre', 'title', 'price', 'imageUrl', 'description'],
                },
            })
        }if (cart === false){
            res.status(200);
        }
        res.sendStatus(cart);
    }catch(error){
        next(error);
    }
});

//delete a lineItem
router.delete('/cart/:lineItemId/:UUID', async(req, res, next) => {
    try{
        const cart = await Order.findOne({
            where: {
                UUID: req.params.UUID,
                isCart: true,
            },
            include: {
                model: Product,
                where: {
                    id: req.params.lineItemId,
                },
            },
        });
        await cart.removeProduct(req.params.lineItemId);
        res.send(cart);
    }catch(error){
        next(error);
    }
});

//attach a cart to a new account
router.put('/cart/attachCart/:accountId', async(req, res, next) => {
    try{
        const cart = await Order.findOne({
            where: {
                UUID: req.body.UUID
            }
        })
        await cart.update({accountId: req.params.accountId})
        res.status(200);
    }catch(error){
        next(error);
    }
});


module.exports = router;
